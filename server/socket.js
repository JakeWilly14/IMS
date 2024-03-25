const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log("A user connected", socket.id);

  socket.on("sendMessage", ({ senderId, receiverId, messageContent }) => {
    console.log("Received message from", senderId, "to", receiverId, ":", messageContent);
    // Here, we can save the message to the database and emit it to the receiver
    io.to(receiverId).emit("message", { senderId, messageContent });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

module.exports = { app, io, server };
