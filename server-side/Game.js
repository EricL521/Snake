let Snake = require("Snake.js");

class Game {
    // actual game code
    // once the percent of snake tiles is greater than percent snake, game size increases
    // starting map size is an array with length 1 ex. [10, 10]
    constructor(defaultSnakeLength, percentSnake, startingMapSize, numApples) {
        this.snakes = [];
        this.defaultSnakeLength = defaultSnakeLength;
        this.percentSnake = percentSnake;
        this.numApples = numApples;

        this.map = [];
        for (let i = 0 ; i < startingMapSize[0]; i ++) {
            this.map.push([]);
            for (let j = 0; j < startingMapSize[1]; j ++)
                this.map[i].push(null);
        }
        this.appleTiles = [];
        this.snakeTiles = [];
        this.emptyTiles = [];
    }

    addSnake(name) {
        let spawnPos = this.emptyTiles.splice(Math.random() * this.emptyTiles.length);
        this.snakes.push(new Snake(name, this.defaultSnakeLength, spawnPos, [0, 0]));
    }
}