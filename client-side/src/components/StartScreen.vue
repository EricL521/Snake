<template>
  <div id="start-screen-parent">
    <div id="start-screen">
      <div id="title">
        <h1 id="name">Sarp</h1>
        <ul>
          <li v-for="description in descriptions" :key="description.id">{{description.text}}</li>
        </ul>
      </div>
      <input autocomplete="off" v-model="nickname" :maxlength="maxNameLength" id="name-input" placeholder="Type a nickname" @keydown="onKeyPress">
      <button ref="playButton" id="play-button" @click="play">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  data() {
    return {
      nickname: "",
      descriptions: [
        {
          id: 0,
          text: "Sarp basically multiplayer snake with abilities"
        },
        {
          id: 1,
          text: "Sarp is very similar to snake in Romanian"
        },
        {
          id: 2,
          text: "\"This is one SARP game!\" - James Verrico, Professional Gamer of Eric's Disciples"
        },
        {
          id: 3,
          text: "Sometimes you just gotta sit back, relax, and enjoy a nice Sarp - Brady Mobus, Professional Heat Miser"
        }
      ],
      maxNameLength: 20
    }
  },
  methods: {
    play() {
      // contact server with name
      socket.emit("join", this.nickname, (map) => {
        this.$emit("mapInfo", map);

        this.$emit("changeScreen");
      });
    },
    onKeyPress(event) {
      if (event.key === "Enter")
        this.$refs.playButton.focus();
    }
  }
}
</script>

<style scoped>
  #start-screen {
    width: 960px;
    height: 810px;
    border-radius: 30px;
    background-color: #E2DADB;
    box-shadow: 8px 8px 5px 5px #3C3C3B;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
  }

  #start-screen-parent {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0px;
    left: 0px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 50%;
    height: 50%;
  }

  #name {
    font-size: 50px;
  }

  #name-input {
    width: 50%;
    height: 40px;
    font-size: 30px;
    text-align: center;

    border-radius: 10px;

    outline: none;
    transition-duration: 0.5s;
  }
  #name-input:focus {
    box-shadow: 0 0 3px 3px #228CDB;
  }
  #name-input:-webkit-autofill::first-line {
    font-size: 30px;
  }

  #play-button {
    width: 25%;
    height: 50px;
    font-size: 30px;
    text-align: center;

    border-radius: 10px;

    outline: none;
    transition-duration: 0.5s;
  }
  #play-button:hover,#play-button:focus {
    box-shadow: 0 0 3px 3px #519872;
  }
</style>