// class used to store empty tiles
class OrderedArray {
    // orderedArray is optional, it represents an ordered array, not an OrderedArray
    constructor(orderedArray) {
        // tiles (ordered array)
        // ordered by x, then y where [x, y]
        this.tiles = [];

        if (typeof orderedArray === "object")
            this.tiles = orderedArray.slice(0); // duplicate it
    }

    get length() {
        return this.tiles.length;
    }

    // is tile1 greater than tile2?
    isGreaterThan (tile1, tile2) {
        // if tile 1 is null or undefined, it's less
        if (tile1 === null || typeof tile1 === "undefined")
            return false;
        // if tile 2 is null or undefined, it's more
        if (tile2 === null || typeof tile2 === "undefined")
            return true;

        if (tile1[0] > tile2[0])
            return true;
        else if (tile1[0] === tile2[0]) {
            if (tile1[1] > tile2[1])
                return true;
            else
                return false;
        }
        else
            return false;
    }

    // returns whether tile2 and 2 are equal
    // if either are null or undefined, returns false
    areEqual (tile1, tile2) {
        if (tile1 === null || tile2 === null || typeof tile1 === "undefined" || typeof tile2 === "undefined")
            return false;
        return (tile1[0] === tile2[0] && tile1[1] === tile2[1]);
    }

    // searches for a tile
    // returns an index
    binarySearch (tile) {
        let lowerBound = 0;
        let upperBound = this.length - 1;

        while (upperBound > lowerBound + 1) {
            let center = Math.floor((lowerBound + upperBound) / 2);
            let centerTile = this.tiles[center];
            if (this.areEqual(tile, centerTile))
                return center;
            else if (this.isGreaterThan(tile, centerTile))
                lowerBound = center;
            else
                upperBound = center;
        }

        // upperbound and lowerbound are one apart
        // if upperbound is equal to tile, then return it
        if (this.areEqual(this.get(upperBound), tile))
            return upperBound;
        // if lower bound is equal to tile, then return it
        if (this.areEqual(this.get(lowerBound), tile))
            return lowerBound;
        // if it is equal to neither, return upper bound if tile is greater than it
        if (this.isGreaterThan(tile, this.get(upperBound)))
            return upperBound;
        // otherwise, return lowerbound;
        return lowerBound;
    }

    // add a tile
    add(tile) {
        let index = this.binarySearch(tile);
        // if it is greater, put it after
        if (this.isGreaterThan(tile, this.tiles[index]))
            this.tiles.splice(index + 1, 0, tile);
        // else, put it before
        else
            this.tiles.splice(index, 0, tile);
    }

    // returns a tile
    get(index) {
        return this.tiles[index];
    }

    // deletes a tile
    delete(tile) {
        let index = this.binarySearch(tile);

        if (this.areEqual(tile, this.get(index)))
            this.tiles.splice(index, 1);
        else {
            console.log("tile not found", tile, this.tiles.splice(index - 1, 3));
            throw "tile not in array";
        }
    }

    // same as map function in array, but sets the array to the new array
    // map Function must not change the order of the array
    map(mapFunction) {
        this.tiles = this.tiles.map((old) => {return mapFunction(old);});
    }
}

exports.OrderedArray = OrderedArray;