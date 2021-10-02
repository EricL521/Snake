<template>
  <div id="app-container" :style="appContainerStyle">
    <Game :defaultDimensions="[defaultWidth, defaultHeight]"></Game>
  </div>
</template>

<script>
import Game from "./Game";

// Centers and resizes app accordingly
export default {
  name: 'App',
  components: {
    Game
  },
  data() {
    return {
      scale: 1,
      defaultWidth: 1920,
      defaultHeight: 1080,
      windowWidth: 1920,
      windowHeight: 1080
    }
  },
  computed: {
    // returns css object
    appContainerStyle() {
      return {
        width: this.defaultWidth + "px",
        height: this.defaultHeight + "px",
        transform: "scale(" + this.scale + ")",
        left: (this.windowWidth - this.scale * this.defaultWidth) / 2 + "px",
        top: (this.windowHeight - this.scale * this.defaultHeight) / 2 + "px",
      };
    }
  },
  methods: {
    // updates variables, set up in created()
    onresize() {
      this.windowWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.windowHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

      let widthScalar = this.windowWidth / this.defaultWidth;
      let heightScalar = this.windowHeight / this.defaultHeight;

      // Scale is rounded, so a scrollbar appears if it's rounded up
      this.scale = ((widthScalar < heightScalar)? widthScalar: heightScalar);
    }
  },
  created() {
    // on create, we set up resize and run it
    window.addEventListener("resize", this.onresize);
    this.onresize();
  }
}
</script>

<style>
  #app-container {
    transform-origin: top left;

    position: absolute;

    background-color: #EDE8E9;

    overflow: visible;

    width: 100%;
    height: 100%;
    box-shadow: 0 0 25px 25px #EDE8E9;
  }
</style>
