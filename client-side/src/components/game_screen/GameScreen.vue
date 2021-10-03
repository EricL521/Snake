<template>
  <div id="game-screen-parent">
    <div id="game-screen" :style="gameScreenWidth">
      <div class="game-screen-column" :style="gameScreenHeight" v-for="(column, index) in this.gameMap" :key="index">
        <GameTile v-for="(tile, index) in column" :key="index" :size=tileSize :type="tile"></GameTile>
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
    map: Array,
    defaultDimensions: Array
  },
  components: {
    GameTile
  },
  data() {
    return {
      game: new Game(this),
      gameMap: this.map // otherwise vue won't update
    }
  },
  computed: {
    tileSize() {
      let maxSizeX = this.defaultDimensions[0] / this.gameMap[0].length;
      let maxSizeY = this.defaultDimensions[1] / this.gameMap.length;

      return (maxSizeX < maxSizeY)? maxSizeX: maxSizeY;
    },
    gameScreenWidth() {
      return {
        "width" : this.tileSize * this.gameMap.length + "px"
      }
    },
    gameScreenHeight() {
      return {
        "height": this.tileSize * this.gameMap[0].length
      };
    }
  }
}
</script>

<style scoped>
  #game-screen-parent {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #game-screen {
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