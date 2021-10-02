<template>
  <transition name="fade">
    <StartScreen v-if="startScreenVisible" @changeScreen="gameState = 1;" @mapInfo="updateMap"></StartScreen>
  </transition>
  <transition name="fade">
    <GameScreen v-if="gameScreenVisible" :map="map" :defaultDimensions="defaultDimensions"></GameScreen>
  </transition>
</template>

<script>
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/game_screen/GameScreen";

// Manages game states ex. start screen, respawn screen, game screen
export default {
  name: "Game",
  props: {
    defaultDimensions: Array
  },
  components: {
    GameScreen,
    StartScreen
  },
  data() {
    return {
      gameState: 0,
      gameStates: [
          "start-screen",
          "game-screen",
          "respawn-screen"
      ],
      map: []
    }
  },
  methods: {
    updateMap(data) {
      this.map = data;
    }
  },
  computed: {
    startScreenVisible() {
      return this.gameStates[this.gameState] === 'start-screen';
    },
    gameScreenVisible() {
      return this.gameStates[this.gameState] === 'game-screen';
    },
    gameScreenMap() {
      return this.map;
    }
  }
}
</script>

<style scoped>

</style>