const express = require('express');
const port = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", socket => {
    console.log(1235);
});

server.listen(port, () => {
    console.log('listening on localhost:3000');
});