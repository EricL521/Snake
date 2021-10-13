export {
    Game as Game
};

// manages communications with server for the game screen
class Game {
    // map is the response from the server
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.isDead = false;

        // set up key press detection
        window.onkeydown = (e) => {
            this.changeDir(e.key);
        };

        socket.on("newMap", (newMap) => {
            this.updateMap(newMap);
        });

        socket.on("snakeDeath", () => {
            this.onSnakeDeath();
        });
    }

    changeDir(keyPress) {
        if (!this.isDead) {
            let newDir = (keyPress === "w" || keyPress === "ArrowUp") ? "up" :
                (keyPress === "a" || keyPress === "ArrowLeft") ? "left" :
                    (keyPress === "s" || keyPress === "ArrowDown") ? "down" :
                        (keyPress === "d" || keyPress === "ArrowRight") ? "right" : "fail";
            if (newDir !== "fail")
                socket.emit("newDir", newDir);
        }
    }

    updateMap(newMap) {
        this.gameScreen.gameMap = newMap.map;
        this.gameScreen.edges = newMap.edges;
    }

    onSnakeDeath() {
        this.isDead = true;
        this.gameScreen.onDeath();
    }

    respawn() {
        this.isDead = false;
    }

}