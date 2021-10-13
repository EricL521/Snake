const express = require('express');
const port = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const settings = require("./settings.json");

const {Game} = require('./game-classes/Game');
const game = new Game(settings.startingSnakeSize, settings.percentMapEmpty, settings.screenSize, settings.numApples);
let updater = setInterval(() => {
    let newDeadSnakes = game.update();
    // update everyone's screens
    let iterator = game.snakeMap.keys();
    for (let i = 0; i < game.snakeMap.size; i ++)
        updateScreen(iterator.next().value);
    // notify dead players
    for (let i = 0; i < newDeadSnakes.length; i ++)
        killPlayer(newDeadSnakes[i].socketID);
}, settings.tickSpeed);

// updates a person's screens
const updateScreen = (socketID) => {
    io.to(socketID).emit("newMap", game.getScreen(socketID, settings.screenSize));
};

// sends out the message that someone died
const killPlayer = (socketID) => {
    io.to(socketID).emit("snakeDeath");
};

io.on("connection", socket => {
    socket.on("join", (name, callback) => {
        game.addSnake(name, ["#588B8B"], socket.id);

        // send info for game
        callback(game.getScreen(socket.id, settings.screenSize));
    });

    socket.on("respawn", (callback) => {
        game.respawnSnake(socket.id);

        // callback with new map
        callback(game.getScreen(socket.id, settings.screenSize));
    });

    socket.on("newDir", (dir) => {
        let direction = (dir === "right")? [1, 0] :
            (dir === "left")? [-1, 0] :
                (dir === "up")? [0, -1] :
                    (dir === "down")? [0, 1] : "fail";

        if (direction !== "fail")
            game.setSnakeDir(direction, socket.id);
    });
});

server.listen(port, () => {
    console.log('listening on localhost:' + port);
});