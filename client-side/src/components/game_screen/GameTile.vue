<template>
  <div id="background" :style="[backgroundSize, backgroundColor]">
    <p id="text" :style="textStyle">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "GameTile",
  props: {
    size: Number,
    color: String,
    text: String
  },
  computed: {
    backgroundSize() {
      return {
        "width": this.size + "px",
        "height": this.size + "px",
      };
    },
    backgroundColor() {
      return {
        "background-color": this.color,
      };
    },
    textStyle() {
      return {
        "font-size": this.size * 0.9 + "px"
      }
    }
  }
}
</script>

<style scoped>
  #background {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #text {
    text-align: center;
    margin: 0;
  }
</style>