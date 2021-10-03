export {
    Game as Game
};

// manages communications with server for the game screen
class Game {
    // map is the response from the server
    constructor(gameScreen) {
        this.gameScreen = gameScreen;

        // set up key press detection
        window.onkeydown = (e) => {
            this.changeDir(e.key);
        };

        socket.on("newMap", (newMap) => {
            this.updateMap(newMap);
        });
    }

    changeDir(keyPress) {
        let newDir = (keyPress === "w" || keyPress === "ArrowUp")? "up" :
            (keyPress === "a" || keyPress === "ArrowLeft")? "left" :
                (keyPress === "s" || keyPress === "ArrowDown")? "down" :
                    (keyPress === "d" || keyPress === "ArrowRight")? "right" : "fail";
        if (newDir !== "fail")
            socket.emit("newDir", newDir);
    }

    updateMap(newMap) {
        this.gameScreen.gameMap = newMap;
    }
}