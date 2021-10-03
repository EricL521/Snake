class Snake {
    // startingPos is a 2d array, as is startingDir ([1, 0], [-1, 0] ...)
    // color is an array of colors which will repeat
    constructor(playerName, color, initialLength, startingPos, startingDir, socketID) {
        // socket id
        this.socketID = socketID;

        this.name = playerName;
        this.color = color;
        // array of snake body
        this.snake = [];
        // last removed element from this.snake (used to regrow)
        this.lastRemoved = null;
        for (let i = 0; i < initialLength; i ++) {
            this.snake.push(startingPos);
        }
        // DEAD AND IMMUNE ARE ACCESSED IN GAME CLASS
        // whether or not the snake is dead
        this.dead = false;
        // immune is set to true when the snake should be immune
        this.immune = true;

        if (Math.abs(startingDir[0] + startingDir[0]) <= 1)
            this.direction = startingDir;
        else
            this.direction = [0, 0]; // default starts still
    }

    // moves snake in the current direction
    update() {
        // remove first
        this.lastRemoved = this.snake.shift();

        let head = this.snake[this.snake.length - 1];
        this.snake.push([head[0] + this.direction[0], head[1] + this.direction[1]]);

        // return new head position
        return this.getPosition();
    }

    // grows the snake's tail back
    growSnake() {
        this.snake.unshift(this.lastRemoved);
    }

    // kills the snake
    // this is run after the snake has grown, so it moves the snake back one
    killSnake() {
        // add back tail and remove head
        this.growSnake();
        this.snake.pop();

        this.dead = true;
    }

    updateDirection(newDir) {
        if (Math.abs(newDir[0] + newDir[1]) === 1) {
            this.direction = newDir;
            // when you make your first move, immune is set to false
            if (this.immune) this.immune = false;
        }
    }

    // return head position
    getPosition() {
        return this.snake[this.snake.length - 1];
    }

    // returns tail position
    getTail() {
        return this.snake[0];
    }

    // returns the color and text at a specific tile
    getValue(position) {
        for (let i = this.snake.length - 1; i >= 0; i --)
            if (this.areEqual(position, this.snake[i]))
                return {
                    color: this.color[(this.snake.length - i - 1) % (this.color.length)],
                    text: this.name[(this.snake.length - i - 1) % (this.name.length)]
                };
        throw position + " not in " + this.snake;
    }

    // returns whether tile2 and 2 are equal
    // if either are null or undefined, returns false
    areEqual (tile1, tile2) {
        if (tile1 === null || tile2 === null || typeof tile1 === "undefined" || typeof tile2 === "undefined")
            return false;
        return (tile1[0] === tile2[0] && tile1[1] === tile2[1]);
    }

    // adjust the snake
    // adjustment: [x, y]
    adjustSnake(adjustment) {
        this.snake = this.snake.map(old => {
            return [old[0] + adjustment[0], old[1] + adjustment[1]];
        });
    }
}

exports.Snake = Snake;