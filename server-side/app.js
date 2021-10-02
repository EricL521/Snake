const express = require('express');
const port = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const screenSize = [5, 5];

const {Game} = require('./game-classes/Game');
const game = new Game(3, 0.10, screenSize, 5);

io.on("connection", socket => {
    console.log("connected");

    socket.on("join", (name, callback) => {
        game.addSnake(name, socket.id);

        // send info for game
        callback(game.getScreen(socket.id, screenSize));
        console.log("sent");
    });
});

server.listen(port, () => {
    console.log('listening on localhost:3000');
});