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
const tickSpeed = 1000; // once every tickspeed ms
let updater = setInterval(() => {
    game.update();
    // update everyone's screens
    let iterator = game.snakeMap.keys();
    for (let i = 0; i < game.snakeMap.size; i ++)
        updateScreen(iterator.next().value);
}, tickSpeed);

// updates a person's screens
const updateScreen = (socketID) => {
    io.to(socketID).emit("newMap", game.getScreen(socketID, screenSize));
};

io.on("connection", socket => {
    socket.on("join", (name, callback) => {
        game.addSnake(name, ["#588B8B"], socket.id);

        // send info for game
        callback(game.getScreen(socket.id, screenSize));
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