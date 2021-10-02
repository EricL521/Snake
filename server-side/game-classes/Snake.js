class Snake {
    // startingPos is a 2d array, as is startingDir ([1, 0], [-1, 0] ...)
    constructor(playerName, initialLength, startingPos, startingDir, socketID) {
        // socket id
        this.socketID = socketID;

        this.name = playerName;
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
        // also accessed from game class
        this.hasGrown = false;

        if (Math.abs(startingDir[0] + startingDir[0]) === 1)
            this.direction = startingDir;
        else
            this.direction = [1, 0]; // default starts going right
    }

    // moves snake in the current direction
    update() {
        // remove first
        this.lastRemoved = this.snake.shift();

        let head = this.snake[this.snake.length - 1];
        this.snake.push([head[0] + this.direction[0], head[1] + this.direction[1]]);

        // return new head position
        return this.snake[this.snake.length - 1];

        // has grown becomes false on update
        this.hasGrown = false;
    }

    // grows the snake's tail back
    growSnake() {
        this.snake.unshift(this.lastRemoved);
        this.hasGrown = true;
    }

    // kills the snake
    // this is run after the snake has grown, so it moves the snake back one
    killSnake() {
        // flip direction and reverse snake
        this.snake.reverse();
        this.direction = [this.direction[0] * -1, this.direction[1] * -1];

        // move snake backwards one
        this.moveSnake();

        this.dead = true;
    }

    updateDirection(newDir) {
        if (Math.abs(newDir[0] + newDir[0]) === 1)
            this.direction = newDir;
        // when you make your first move, immune is set to false
        if (this.immune) this.immune = false;
    }

    // return head position
    getPosition() {
        return this.snake[this.snake.length - 1];
    }
}

exports.Snake = Snake;