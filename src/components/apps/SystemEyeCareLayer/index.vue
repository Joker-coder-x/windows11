<template>
  <div class="system-eye-care-layer" v-if="eyeCareMode"></div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

import { systemNamespaceSymbol } from "utils";

export default {
  name: "SystemEyeCareLayer",
  setup() {
    const store = useStore(),
          systemNamespaceState = store.state[systemNamespaceSymbol],
          eyeCareMode = computed(() => systemNamespaceState.eyeCareMode);

    return {
      eyeCareMode
    };
  },
}
</script>

<style lang="scss" scoped>
.system-eye-care-layer {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  background-color: rgba(77, 51, 4, 0.274);
}
</style>