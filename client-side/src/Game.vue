<template>
  <StartScreen v-if="gameStates[gameState] === 'start-screen'"></StartScreen>
</template>

<script>
import StartScreen from "./components/StartScreen";

// Manages game states ex. start screen, respawn screen, game screen
export default {
  name: "Game",
  components: {
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
  }
}
</script>

<style scoped>

</style>