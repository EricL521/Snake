<template>
  <div id="app-container" :style="appContainerStyle">
    <StartScreen></StartScreen>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import StartScreen from "./components/StartScreen";

export default {
  name: 'App',
  components: {
    // HelloWorld
    StartScreen
  },
  data() {
    return {
      scale: 1,
      defaultWidth: 1920,
      defaultHeight: 1080,
      width: 1920,
      height: 1080
    }
  },
  computed: {
    // returns css object
    appContainerStyle() {
      return {
        width: this.defaultWidth + "px",
        height: this.defaultHeight + "px",
        transform: "scale(" + this.scale + ")",
        left: (this.width - this.scale * this.defaultWidth) / 2 + "px",
        top: (this.height - this.scale * this.defaultHeight) / 2 + "px",
      };
    }
  },
  methods: {
    // updates variables, set up in created()
    onresize() {
      this.width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

      let widthScalar = this.width / this.defaultWidth;
      let heightScalar = this.height / this.defaultHeight;

      // Scale is rounded, so a scrollbar appears if it's rounded up, so we subtract a number
      this.scale = ((widthScalar < heightScalar)? widthScalar: heightScalar) - 0.0001;
    }
  },
  created() {
    // on create, we set up resize and run it
    window.onresize = this.onresize;
    this.onresize();
  }
}
</script>

<style>
  #app-container {
    transform-origin: top left;

    position: absolute;

    background-color: aliceblue;
  }
</style>
