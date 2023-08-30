import User from "../models/User.js";
import Project from "../models/Project.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import express from "express";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.error({
                error: "Name is required",
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be atleat 6 characters long",
            });
        }
        // check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken already!",
            });
        }
        // create User
        const hashed = await hashPassword(password);
        const user = await User.create({ name, email, password: hashed });
        return res.json(user);
    } catch (err) {
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // If user doesn't exists
        if (!user) {
            res.json({
                error: "No user found!",
            });
        }

        //If wrong password
        const match = await comparePassword(password, user.password);
        if (!match) {
            res.json({
                error: "Incorrect Password",
            });
        } else {
            jwt.sign(
                { email: user.email, name: user.name, id: user._id },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(user);
                }
            );
        }
    } catch (err) {
        console.log(err);
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

const getProjects = async (req, res) => {
    try {
        const id = req.params.id;
        const projects = await Project.find(
            { userId: id },
            { task: 0, __v: 0, updatedAt: 0 }
        );
        res.send(projects);
    } catch (err) {
        console.log(err);
    }
};

const updateProjectDetailsById = async (req, res) => {
    const value = {
        title: req.body.title,
        description: req.body.description,
    };

    Project.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        { ...value },
        { upsert: true },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
};

const createProject = async (req, res) => {
    const value = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
    };

    // insert data
    try {
        const data = await new Project(value).save();
        res.send({
            data: {
                userId: data.userId,
                title: data.title,
                description: data.description,
                updatedAt: data.updatedAt,
                _id: data._id,
            },
        });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(422).send({
                data: { error: true, message: "title must be unique" },
            });
        } else {
            return res
                .status(500)
                .send({ data: { error: true, message: "server error" } });
        }
    }
};

const deleteProject = async (req, res) => {
    try {
        const data = await Project.deleteOne({
            _id: new mongoose.Types.ObjectId(req.params.id),
        });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
};

const getTasks = async (req, res) => {
    if (!req.params.id) {
        res.status(422).send({
            data: { error: true, message: "Id is required" },
        });
    }
    try {
        const data = await Project.findById(req.params.id);
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
};

const updateToDo = async (req, res) => {
    let todo = [];

    for (const key in req.body) {
        // todo.push({ items: req.body[key].items, name: req.body[key]?.name })
        for (const index in req.body[key].items) {
            req.body[key].items[index].stage = req.body[key].name;
            todo.push({
                name: req.body[key].items[index]._id,
                stage: req.body[key].items[index].stage,
                order: index,
            });
        }
    }

    todo.map(async (item) => {
        await Project.updateOne(
            {
                _id: new mongoose.Types.ObjectId(req.params.id),
                task: {
                    $elemMatch: { _id: new mongoose.Types.ObjectId(item.name) },
                },
            },
            { $set: { "task.$.order": item.order, "task.$.stage": item.stage } }
        );
    });
    res.send(todo);
};

const deleteTask = async (req, res) => {
    if (!req.params.id || !req.params.taskId)
        return res.status(500).send(`server error`);

    try {
        const data = await Project.updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            {
                $pull: {
                    task: {
                        _id: new mongoose.Types.ObjectId(req.params.taskId),
                    },
                },
            }
        );
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
};

const getTaskDetails = async (req, res) => {
    if (!req.params.id || !req.params.taskId)
        return res.status(500).send(`server error`);

    try {
        const project = await Project.findById(req.params.id);
        const task = project.task.filter((obj) => {
            return obj._id.equals(req.params.taskId);
        });
        return res.send(task[0]);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const createTask = async (req, res) => {
    if (!req.params.id) return res.status(500).send(`server error`);

    const value = {
        title: req.body.title,
        description: req.body.description,
    };

    try {
        const data = await Project.findByIdAndUpdate(req.params.id, {
            $push: {
                task: {
                    ...value,
                    stage: "Requested",
                },
            },
        });
        return res.send(data);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const updateTask = async (req, res) => {
    if (!req.params.id || !req.params.taskId)
        return res.status(500).send(`server error`);

    const value = { title: req.body.title, description: req.body.description };
    try {
        const filter = {
            _id: new mongoose.Types.ObjectId(req.params.id),
            task: {
                $elemMatch: {
                    _id: new mongoose.Types.ObjectId(req.params.taskId),
                },
            },
        };
        const update = {
            $set: {
                "task.$.title": value.title,
                "task.$.description": value.description,
            },
        };
        const data = await Project.updateOne(filter, update);
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
};

export {
    registerUser,
    loginUser,
    getProfile,
    getProjects,
    updateProjectDetailsById,
    createProject,
    deleteProject,
    getTasks,
    updateToDo,
    deleteTask,
    getTaskDetails,
    createTask,
    updateTask,
};
