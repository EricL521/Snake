const express = require('express');
const port = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const screenSize = [5, 5];

const {Game} = require('./game-classes/Game');
const game = new Game(3, 90, screenSize, 5);
const tickSpeed = 1000; // once every tickspeed ms
let updater = setInterval(() => {
    game.update();
}, tickSpeed);

io.on("connection", socket => {
    socket.on("join", (name, callback) => {
        game.addSnake(name, socket.id);

        // send info for game
        callback(game.getScreen(socket.id, screenSize));
    });
});

server.listen(port, () => {
    console.log('listening on localhost:' + port);
});