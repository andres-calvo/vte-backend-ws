const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("sensorData", (msg) => {
    console.log("Mensaje recibido", msg);
    io.emit("sensorData", msg);
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`listening on *:${process.env.PORT || 8000}`);
});
