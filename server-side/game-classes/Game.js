let {Snake} = require("./Snake");
let {OrderedArray} = require("./OrderedArray");

class Game {
    // actual game code
    // once the percent of empty tiles is less than percent empty, game size increases
    // starting map size is a number, because map is square
    constructor(defaultSnakeLength, percentEmpty, minMapSize, numApples) {
        // living snakes
        // NOTE: deadSnakes are not updated
        this.liveSnakes = [];
        this.deadSnakes = [];
        // key: socket.id, value: snake object
        this.snakeMap = new Map();

        // settings for the game
        this.defaultSnakeLength = defaultSnakeLength;
        this.percentEmpty = percentEmpty / 100;
        this.numApples = numApples;
        this.minMapSize = minMapSize;

        // set up map
        // values would be "apple", null, and "snake"
        this.map = [];
        for (let i = 0 ; i < minMapSize[0]; i ++) {
            this.map.push([]);
            for (let j = 0; j < minMapSize[1]; j ++)
                this.map[i].push(null);
        }

        this.emptyTiles = new OrderedArray();
        for (let i = 0; i < minMapSize[0]; i ++)
            for (let j = 0; j < minMapSize[1]; j ++)
                this.addEmptyTile([i, j]);
        for (let i = 0; i < numApples; i ++)
            this.genApple(this.getEmptyTile());
    }


    // adds a snake
    addSnake(name, socketID) {
        let spawnPos = this.getEmptyTile();
        let snake = new Snake(name, this.defaultSnakeLength, spawnPos, [0, 0], socketID);
        this.liveSnakes.push(snake);
        this.snakeMap.set(socketID, snake);

        // update maps
        this.map[spawnPos[0]][spawnPos[1]] = "snake";
    }

    // updates the direction for a snake
    setSnakeDir(newDir, socketID) {
        this.snakeMap.get(socketID).updateDirection(newDir);
    }

    // gets the array of tiles which will be displayed on the client screen
    // screenSize is the dimensions of the number of tiles, [x, y]
    // screenSize must be odd
    getScreen(socketID, screenSize) {
        if (screenSize[0] % 2 === 0 || screenSize[1] % 2 === 0)
            throw "screenSize must be odd";

        let snake = this.snakeMap.get(socketID);
        // snake head
        let center = snake.getPosition();

        // top left corner of the screen
        let topLeft = [center[0] - Math.floor(screenSize[0] / 2), center[1] - Math.floor(screenSize[1] / 2)];
        if (topLeft[0] < 0)
            topLeft[0] = 0;
        if (topLeft[1] < 0)
            topLeft[1] = 0;

        // map that is returned
        let returnMap = [];
        for (let i = 0; i < screenSize[0]; i ++) {
            // x coordinate
            let x = topLeft[0] + i;
            if (x < this.map.length)
                returnMap.push(this.getScreenCol(topLeft, x, screenSize[1]));
            else
                returnMap.unshift(this.getScreenCol(topLeft, topLeft[0] - i + (this.map.length - 1 - topLeft[0]), screenSize[1]));
        }

        return returnMap;
    }

    // returns one row of the screen
    getScreenCol(topLeft, columnNumber, columnSize) {
        let returnColumn = [];
        let column = this.map[columnNumber];

        for (let j = 0; j < columnSize; j ++) {
            // y coordinate
            let y = topLeft[1] + j;

            if (y < column.length)
                returnColumn.push(column[y]);
            else
                returnColumn.unshift(column[topLeft[1] - j + (column.length - 1 - topLeft[1])]);
        }

        return returnColumn;
    }


    // returns random key from emptyTiles
    // ALSO REMOVES THE TILE because it's assumed that it will be set to something
    // ALSO DO NOT FORGET TO SET THE NEW VALUE FOR MAP
    getEmptyTile() {
        let tile = this.emptyTiles.get(Math.floor(Math.random() * this.emptyTiles.length));
        this.removeEmptyTile(tile);
        return tile;
    }
    // add a tile
    addEmptyTile(tile) {
        this.emptyTiles.add(tile);
    }
    // remove a tile
    removeEmptyTile(tile) {
        this.emptyTiles.delete(tile);
    }

    // returns whether tile2 and 2 are equal
    // if either are null or undefined, returns false
    areEqual (tile1, tile2) {
        if (tile1 === null || tile2 === null || typeof tile1 === "undefined" || typeof tile2 === "undefined")
            return false;
        return (tile1[0] === tile2[0] && tile1[1] === tile2[1]);
    }


    // generates an apple at the index (references part of emptytiles)
    genApple(pos) {
        this.map[pos[0]][pos[1]] = "apple";
    }

    // main update function, runs every tick
    update() {
        if (this.emptyTiles.length / (this.map.length * this.map[0].length) < this.percentEmpty)
            this.updateMapSize();

        let snakeHeads = [];
        // update all snakes
        for (let i = 0; i < this.liveSnakes.length; i ++) {
            snakeHeads.push(this.liveSnakes[i].update()); // update returns head position
        }

        for (let i = snakeHeads.length - 1; i >= 0; i --) {
            // if the snake has moved outside of the map
            if (snakeHeads[i][0] < 0 ||
                snakeHeads[i][0] >= this.map.length ||
                snakeHeads[i][1] < 0 ||
                snakeHeads[i][1] >= this.map.length
            ) {
                this.liveSnakes[i].killSnake();
                this.deadSnakes.push(this.liveSnakes.splice(i, 1)[0]);
            }
            else {
                // continue updating snakes
                let mapValue = this.map[snakeHeads[i][0]][snakeHeads[i][1]];
                let snake = this.liveSnakes[i];
                if (mapValue !== null) {
                    if (mapValue === "apple")
                        snake.growSnake();
                    else if (!snake.immune && mapValue === "snake") {
                        snake.killSnake();
                        this.deadSnakes.push(this.liveSnakes.splice(i, 1)[0]);
                    }
                }

                // update game map, emptytiles, appletiles, and snaketiles
                // dead snakes end up not moving
                if (!snake.dead) {
                    this.map[snakeHeads[i][0]][snakeHeads[i][1]] = "snake";

                    if (!this.areEqual(snake.lastRemoved, snake.getTail())) {
                        this.map[snake.lastRemoved[0]][snake.lastRemoved[1]] = null;
                        this.addEmptyTile(snake.lastRemoved);
                    }

                    // value of map before change
                    if (mapValue === "apple")
                        this.genApple(this.getEmptyTile());
                    if (mapValue === null)
                        this.removeEmptyTile(snakeHeads[i]);
                }
            }

        }

    }

    // updates map size
    updateMapSize() {
        let numEmpty = this.emptyTiles.length;
        let currentSize = this.map.length;

        // preferred to overshoot than under
        let eachSide = Math.ceil((Math.sqrt((numEmpty - Math.pow(currentSize, 2)) / (this.percentEmpty - 1)) - currentSize) / (2));
        let newSize = this.map.length + (eachSide * 2); // update newSize to match eachSide

        // adjust all snakes
        let iterator = this.snakeMap.values();
        for (let i = 0; i < this.snakeMap.size; i ++) {
            let value = iterator.next().value;
            value.adjustSnake([eachSide, eachSide]);
        }

        // adjust the values in emptyTiles
        // for adding additional columns
        this.emptyTiles.map(old => {
            return [old[0] + eachSide, old[1]];
        });
        // add additional columns
        for (let i = 0; i < eachSide; i ++) {
            this.map.unshift([]);
            for (let j = 0; j < currentSize; j ++) {
                this.map[0].push(null);
                this.addEmptyTile([eachSide - i - 1, j]);
            }
        }
        for (let i = 0; i < eachSide; i ++) {
            this.map.push([]);
            for (let j = 0; j < currentSize; j ++) {
                this.map[this.map.length - 1].push(null);
                this.addEmptyTile([this.map.length - 1, j]);
            }
        }

        // adjust the values in emptyTiles
        // for adding additional rows
        this.emptyTiles.map(old => {
            return [old[0], old[1] + eachSide];
        });
        // add additional rows
        for (let i = 0; i < newSize; i ++) {
            for (let j = 0; j < eachSide; j ++) {
                this.map[i].unshift(null);
                this.addEmptyTile([i, eachSide - j - 1]);
            }
            for (let j = 0; j < eachSide; j ++) {
                this.map[i].push(null);
                this.addEmptyTile([i, this.map[i].length - 1]);
            }
        }
    }

}

exports.Game = Game;