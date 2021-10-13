// snake body is used for snakes that have respawned, and the last part of their body died
class SnakeBody {
    // body is an array of objects: {pos, color, text}
    constructor(body) {
        this.body = body;
    }

    // returns the color and text at a specific tile
    getValue(position) {
        for (let i = 0; i < this.body.length; i ++)
            if (this.areEqual(position, this.body[i].position))
                return {
                    color: this.body[i].color,
                    text: this.body[i].text
                };
        throw position + " not in " + this.body;
    }

    // returns whether tile2 and 2 are equal
    // if either are null or undefined, returns false
    areEqual (tile1, tile2) {
        if (tile1 === null || tile2 === null || typeof tile1 === "undefined" || typeof tile2 === "undefined")
            return false;
        return (tile1[0] === tile2[0] && tile1[1] === tile2[1]);
    }

}

exports.SnakeBody = SnakeBody;