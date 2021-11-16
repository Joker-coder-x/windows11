<template>
  <div class="shutdown">
    <img class="img" src="~assets/gif/shutting-down.gif" />
  </div>
</template>

<script>
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import { exitFullscreen } from "utils";

export default {
  name: "Shutdown",
  setup () {
    const router = useRouter();

    let t = setTimeout(() => {
      router.replace('/');
      setTimeout(() => exitFullscreen());
    }, 3000);

    onUnmounted(() => {
      clearTimeout(t);
      t = null;
    });
  },
}
</script>

<style lang="scss" scoped>
.shutdown {
  @include flex-center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #025A9C;
  z-index: 10000;
}
</style>