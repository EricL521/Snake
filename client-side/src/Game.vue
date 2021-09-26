<template>
  <transition name="fade">
    <StartScreen v-if="startScreenVisible" @changeScreen="gameState = 1;"></StartScreen>
  </transition>
  <transition name="fade">
    <GameScreen v-if="gameScreenVisible"></GameScreen>
  </transition>
</template>

<script>
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/game_screen/GameScreen";

// Manages game states ex. start screen, respawn screen, game screen
export default {
  name: "Game",
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
      ]
    }
  },
  methods: {
    setGameState(num) {
      this.gameState = num;
    }
  },
  computed: {
    startScreenVisible() {
      return this.gameStates[this.gameState] === 'start-screen';
    },
    gameScreenVisible() {
      return this.gameStates[this.gameState] === 'game-screen';
    }
  }
}
</script>

<style scoped>

</style>