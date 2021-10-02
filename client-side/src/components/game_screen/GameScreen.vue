<template>
  <div id="game-screen">
    <div class="game-screen-row" v-for="(row, index) in this.game.map" :key="index">
      <GameTile v-for="(tile, index) in row" :key="index" :size=tileSize :type="tile"></GameTile>
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
      game: new Game(this.map)
    }
  },
  computed: {
    tileSize() {
      let maxSizeX = this.defaultDimensions[0] / this.map[0].length;
      let maxSizeY = this.defaultDimensions[1] / this.map.length;

      return (maxSizeX < maxSizeY)? maxSizeX: maxSizeY;
    }
  },
  mounted() {
    console.log(this.game.map);
  }
}
</script>

<style scoped>
  #game-screen {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .game-screen-row {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>