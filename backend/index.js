import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/auht.js";
import userRoutes from "./routes/users.js";
import todoRoutes from "./routes/todos.js";

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
    cors({
        origin: process.env.originCors,
        credentials: true,
    })
);
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

mongoose
    .connect(process.env.urlHost)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listen on port ${PORT}`);
        });
    })
    .catch((error) => console.error(error));
