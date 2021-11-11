<template>
  <div class="setup">
    <span class="iconfont icon-shut-down" @click="handleSetUp"></span>
    <span class="text">点击启动计算机</span>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';

import { setFullScreen } from "utils";
import { useStore } from 'vuex';

import {
  SETUP
} from "store/mutation-types";

export default {
  name: "SetUp",
  setup() {
    const router = useRouter(),
          store = useStore();

    const handleSetUp = () => {
      router.replace("/startingup");
      store.commit(SETUP);

      setTimeout(() => setFullScreen());
    };

    return {
      handleSetUp
    };
  },
}
</script>

<style lang="scss" scoped>
.setup {
  @include flex-center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #1B1A23;
  color: #C4C4D7;

  .iconfont {
    margin-bottom: 30px;
    font-size: 6em;
    color: #49484F;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      color: #ccc;
      text-shadow: 0 0 200px #eee;
      background-color: transparent;
      transition: all .25s;

      & + .text {
        letter-spacing: 20px;
        transform: rotateY(360deg) scale(1.1);
        transition: all .5s;
      }
    }

    &:active {
      color: rgb(252, 235, 190);
      text-shadow: 0 0 25px rgb(255, 187, 0);
      transform: rotateY(180deg);
      transition: all .4s;

      & + .text {
        letter-spacing: 20px;
        color: rgb(252, 235, 190);
        transform: scale(.8);
        transition: all .5s;
      }
    }
  }

  .text {
    letter-spacing: 3px;
    font-size: 18px;
    transition: all .5s;
  }
}
</style>