<template>
  <transition name="slide-horizontal">
    <div
      v-if="isShowSystemRecomInfoBoard"
      class="system-recom-info-board"
      @mousedown.stop
    >
      <time-panel></time-panel>
    </div>
  </transition>

</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import TimePanel from "./TimePanel";

export default {
  components: {
    TimePanel
  },
  setup() {
    const store = useStore();
    const isShowSystemRecomInfoBoard = computed(() => store.state.isShowSystemRecomInfoBoard);

    return {
      isShowSystemRecomInfoBoard
    };
  }
}
</script>


<style lang="scss" scoped>

.slide-horizontal-enter-active {
  @include animation-slide-right;
}

.slide-horizontal-leave-active {
  @include animation-slide-left;
}

.system-recom-info-board {
  @include disabled-selected;
  position: absolute;
  left: 1%;
  bottom: 2%;
  height: 96%;
  width: 45%;
  background-color: #eaeaeaf1;
  border-radius: 10px;
}
</style>