import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
    getProjects,
    updateProjectDetailsById,
    createProject,
    getTasks,
    updateToDo,
    deleteTask,
    getTaskDetails,
    createTask,
    updateTask,
    deleteProject
} from "./../controllers/authController.js";

const api = express.Router();

api.post("/register", registerUser);
api.post("/login", loginUser);
api.get("/profile", getProfile);

//Projects Routes
api.get("/user/:id", getProjects);
api.post("/project", createProject);
api.put("/project/:id", updateProjectDetailsById);
api.delete("/project/:id", deleteProject);

api.get('/project/:id', getTasks);
api.put('/project/:id/todo', updateToDo);
api.delete('/project/:id/task/:taskId', deleteTask);

//AddTaskModal
api.get('/project/:id/task/:taskId', getTaskDetails);
api.post('/project/:id/task', createTask);
api.put('/project/:id/task/:taskId', updateTask);

export default api;
