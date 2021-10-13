<template>
  <div id="app-container">
    <transition name="fade">
      <StartScreen v-if="gameState === 0" @changeScreen="gameState = 1;" @mapInfo="updateMap" :screenSize="screenSize"></StartScreen>
    </transition>
    <transition name="fade">
      <GameScreen ref="gameScreen" v-if="gameState === 1 || gameState === 2" :map="map" :screenSize="screenSize" @playerDied="gameState = 2"></GameScreen>
    </transition>
    <transition name="fade">
      <RespawnScreen v-if="gameState === 2" @changeScreen="respawnPlayer" @mapInfo="updateMap" :screenSize="screenSize"></RespawnScreen>
    </transition>
  </div>
</template>

<script>
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/game_screen/GameScreen";
import RespawnScreen from "./components/RespawnScreen";

// Manages game states ex. start screen, respawn screen, game screen
export default {
  name: "App",
  components: {
    GameScreen,
    StartScreen,
    RespawnScreen
  },
  data() {
    return {
      gameState: 0,
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
    },
    respawnPlayer() {
      this.gameState = 1;
      this.$refs.gameScreen.onRespawn();
    }
  },
  computed: {
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