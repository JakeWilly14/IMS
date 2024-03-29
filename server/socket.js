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

  // Handle sending messages
  // socket.on("sendMessage", ({ senderId, receiverId, messageContent }) => {
  //   console.log("Received message from", senderId, "to", receiverId, ":", messageContent);
  //   // Here, we can save the message to the database and emit it to the receiver
  //   // io.to(receiverId).emit("message", { senderId, messageContent });
  // });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });

  // Handle joining user to appropriate room based on userId
  const { userId } = socket.handshake.query;
  if (userId) {
    socket.join(userId);
    console.log(`User ${userId} joined room.`);
  } else {
    console.log("User ID not provided. Unable to join room.");
  }
});

module.exports = { app, io, server };
