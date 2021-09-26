<template>
  <div id="game-screen">
    <GameTile size="50" color="#508F07" text="F"></GameTile>
  </div>
</template>

<script>
import GameTile from "./GameTile";

export default {
  name: "GameScreen",
  components: {
    GameTile
  },
  data() {
    return {
      map: []
    }
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
  }
</style>