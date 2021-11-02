<template>
  <transition name="slide-horizontal">
    <div
      v-if="isShowSystemRecomInfoBoard"
      class="system-recom-info-board"
      @mousedown.stop
    >
      <time-panel></time-panel>
      <small-components-panel></small-components-panel>
      <hot-recommends></hot-recommends>
      <recommend-item
        v-for="(item, index) of recommendDatas"
        :recommend-data="item"
        :key="index"
      ></recommend-item>
    </div>
  </transition>

</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import TimePanel from "./TimePanel";
import SmallComponentsPanel from "./SmallComponentsPanel";
import HotRecommends from "./HotRecommends";
import RecommendItem from "./RecommendItem";

import recommendDatas from "assets/datas/recommends";

export default {
  name: 'SystemRecomInfoBoard',
  components: {
    TimePanel,
    SmallComponentsPanel,
    HotRecommends,
    RecommendItem
  },
  setup() {
    const store = useStore();
    const isShowSystemRecomInfoBoard = computed(() => store.state.isShowSystemRecomInfoBoard);

    return {
      isShowSystemRecomInfoBoard,
      recommendDatas
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
  @include no-scroll;
  overflow-y: auto;
  position: absolute;
  left: 1%;
  bottom: 2%;
  height: 96%;
  width: 48%;
  padding: 0 4%;
  background-color: #eaeaeafa;
  border-radius: 10px;
}
</style>