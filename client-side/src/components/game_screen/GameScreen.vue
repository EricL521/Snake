<template>
  <div id="game-screen-parent">
    <div id="box-shadow" :style="[gameScreenWidth, gameScreenHeight, edgesStyle]"></div>
    <div id="game-screen" :style="[gameScreenWidth, gameScreenHeight]">
      <div class="game-screen-column" :style="gameScreenHeight" v-for="(column, index) in this.gameMap" :key="index">
        <GameTile v-for="(tile, index) in column" :key="index" :size=tileSize :color="tile.color" :text="tile.text"></GameTile>
      </div>
    </div>
  </div>
</template>

<script>
import GameTile from "./GameTile";
import {Game} from "./Game.js";

export default {
  name: "GameScreen",
  props: {
    map: Object,
    screenSize: Array
  },
  components: {
    GameTile
  },
  data() {
    return {
      game: new Game(this),
      gameMap: this.map.map, // otherwise vue won't update
      edges: this.map.edges
    }
  },
  computed: {
    tileSize() {
      let maxSizeX = this.screenSize[0] / this.gameMap[0].length;
      let maxSizeY = this.screenSize[1] / this.gameMap.length;

      return (maxSizeX < maxSizeY)? maxSizeX: maxSizeY;
    },
    gameScreenWidth() {
      return {
        "width" : this.tileSize * this.gameMap.length + "px"
      }
    },
    gameScreenHeight() {
      return {
        "height": this.tileSize * this.gameMap[0].length + "px"
      };
    },
    edgesStyle() {
      let size = this.tileSize * 0.1; // 10% of a tile
      let boxShadow = "";
      if (this.edges[0])
        boxShadow += "inset 0px " + (size * 1.5) + "px " + size + "px " + (-size) + "px #F58A07, ";
      if (this.edges[1])
        boxShadow += "inset " + (size * 1.5) + "px 0px " + size + "px " + (-size) + "px #F58A07, ";
      if (this.edges[2])
        boxShadow += "inset 0px " + (-size * 1.5) + "px " + size + "px " + (-size) + "px #F58A07, ";
      if (this.edges[3])
        boxShadow += "inset " + (-size * 1.5) + "px 0px " + size + "px " + (-size) + "px #F58A07, ";
      boxShadow = boxShadow.substring(0, boxShadow.length - 2);

      return {
        "box-shadow": boxShadow
      };
    }

  }
}
</script>

<style scoped>
  #box-shadow {
    position: absolute;
    z-index: 1;
  }

  #game-screen-parent {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #game-screen {
    position: absolute;

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  .game-screen-column {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>