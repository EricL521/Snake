class Snake {
    // startingPos is a 2d array, as is startingDir ([1, 0], [-1, 0] ...)
    constructor(playerName, initialLength, startingPos, startingDir) {
        this.name = playerName;
        // array of snake body
        this.snake = [];
        for (let i = 0; i < initialLength; i ++) {
            this.snake.push(startingPos);
        }

        if (Math.abs(startingDir[0] + startingDir[0]) === 1)
            this.direction = startingDir;
        else
            this.direction = [1, 0]; // default starts going right
    }

    moveSnake() {
        // remove first
        this.snake.shift();

        let head = this.snake[this.snake.length - 1];
        this.snake.push([head[0] + this.direction[0], head[1], this.direction[1]]);
    }

    updateDirection(newDir) {
        if (Math.abs(newDir[0] + newDir[0]) === 1)
            this.direction = newDir;
    }

    // returns array for snake
    getSnake() {
        return this.snake.slice(0);
    }
}