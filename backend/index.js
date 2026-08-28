import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Customer/Admin room join
  socket.on("join", ({ userId, role }) => {
    socket.join(`user:${userId}`);

    if (role === "admin") {
      socket.join("admin");
    }

    console.log(`${role} joined: user:${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "API + Socket.IO server running",
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  db();
});
