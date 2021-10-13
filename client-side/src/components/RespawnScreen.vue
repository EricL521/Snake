<template>
  <div id="respawn-screen">
    <div id="overlay"></div>
    <div id="container" :style="[containerScaleStyle, containerDimensionsStyle]">
      <h1 id="title">You Died</h1>
      <button id="respawn-button" @click="respawn">Respawn</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RespawnScreen",
  props: {
    screenSize: Array
  },
  data() {
    return {
      containerDimensions: [960, 810]
    }
  },
  methods: {
    respawn() {
      // emit to server to respawn
      socket.emit("respawn", (newMap) => {
        this.$emit("mapInfo", newMap);

        this.$emit("changeScreen");
      });
    }
  },
  computed: {
    containerScaleStyle() {
      let maxXScale = this.screenSize[0] / this.containerDimensions[0] * 0.8;
      let maxYScale = this.screenSize[1] / this.containerDimensions[1] * 0.8;
      let scale = (maxXScale < maxYScale)? maxXScale: maxYScale;

      return {
        transform: "scale(" + scale + ")"
      };
    },
    containerDimensionsStyle() {
      return {
        "width": this.containerDimensions[0] + "px",
        "height": this.containerDimensions[1] + "px"
      }
    }
  }
}
</script>

<style scoped>
  #respawn-screen {
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
  }

  #overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: #3C3C3B;
    opacity: 50%;
  }

  #container {
    z-index: 1;
    position: absolute;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    background-color: #E2DADB;
    border-radius: 30px;
    box-shadow: 0px 0px 10px 10px #3C3C3B;

    transform-origin: center center;
  }

  #title {
    font-size: 100px;
  }

  #respawn-button {
    width: 25%;
    height: 50px;
    font-size: 30px;
    text-align: center;

    border-radius: 10px;

    outline: none;
    transition-duration: 0.5s;
  }
  #respawn-button:hover,#respawn-button:focus {
    box-shadow: 0 0 3px 3px #519872;
  }
</style>