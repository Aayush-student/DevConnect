import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db/index.js";

import roomRouter from "./Routes/room.routes.js";
import userRouter from "./Routes/user.routes.js";
import aiRouter from "./Routes/ai.routes.js"


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
});

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/ai", aiRouter);

io.on("connection", (socket) => {
    socket.on("join-room", ({ roomId, username }) => {
        socket.join(roomId);
        socket.data.user = username;
        socket.data.room = roomId;
        socket.to(roomId).emit("user-joined", { username, id: socket.id });
    });

    
    socket.on("send-proposal", ({ roomId, username, code }) => {
        socket.to(roomId).emit("proposal-received", { username, code, id: socket.id });
    });

   
    socket.on("merge-code", ({ roomId, code }) => {
        io.in(roomId).emit("code-update", code);
    });

    socket.on("send-message", ({ roomId, message }) => {
        socket.to(roomId).emit("receive-message", message);
    });

    socket.on("start-ai-analysis", ({ roomId }) => {
        socket.to(roomId).emit("ai-loading-started");
    });

    socket.on("submit-ai-analysis", ({ roomId, aiMsg }) => {
        socket.to(roomId).emit("ai-analysis-received", aiMsg);
    });

    socket.on("stop-ai-loading", ({ roomId }) => {
        socket.to(roomId).emit("ai-analysis-received", null);
    });

    socket.on("clear-editor", ({ roomId }) => {
    io.in(roomId).emit("code-update", "");
    });

    socket.on("disconnect", () => {
        const { room, user } = socket.data;
        if (room) socket.to(room).emit("user-left", { id: socket.id, username: user });
    });
});

connectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server Running on Port ${port}`);
        });
    })
    .catch((err) => {
        console.error("DATABASE_CONNECTION_FAILED", err);
        process.exit(1);
    });

export default app;