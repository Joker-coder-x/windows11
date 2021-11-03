<template>
  <div
    class="system-mask-layer"
    :style="{
      opacity: opacity
    }"
  ></div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "SystemMaskLayer",
  setup() {
    const store = useStore(),
          opacity = computed(() => 1 - (store.state.lightValue / 100));

    return {
      opacity,
    };
  },
}
</script>

<style lang="scss" scoped>
.system-mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  pointer-events: none;
  opacity: 1;
}
</style>