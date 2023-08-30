//var token might not work!

import express from "express";
import api from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
    .connect(process.env.MONGODB_PATH)
    .then(() => console.log("connected to database"))
    .catch((err)=>console.log('Database not connected', err));


const app = express();

const PORT = process.env.SERVER_PORT || 9000;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const corsOptions = {
    origin: ORIGIN,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(api);

app.listen(PORT, () => {
    console.log(`Your app is running in http://localhost:${PORT}`);
});
