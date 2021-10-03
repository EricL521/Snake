<template>
  <div id="app-container">
    <transition name="fade">
      <StartScreen v-if="startScreenVisible" @changeScreen="gameState = 1;" @mapInfo="updateMap" :screenSize="screenSize"></StartScreen>
    </transition>
    <transition name="fade">
      <GameScreen v-if="gameScreenVisible" :map="map" :screenSize="screenSize"></GameScreen>
    </transition>
  </div>
</template>

<script>
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/game_screen/GameScreen";

// Manages game states ex. start screen, respawn screen, game screen
export default {
  name: "App",
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
      map: [],
      screenSize: []
    }
  },
  methods: {
    updateMap(data) {
      this.map = data;
    },
    updateScreenSize() {
      this.screenSize[0] = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.screenSize[1] = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
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
  },
  beforeMount() {
    this.updateScreenSize();
    window.onresize = () => {this.updateScreenSize();};
  }
}
</script>

<style scoped>
  #app-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;

    background-color: #EDE8E9;

    overflow: auto;
  }
</style>