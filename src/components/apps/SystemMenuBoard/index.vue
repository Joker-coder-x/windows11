<template>
  <transition name="slide">
    <div
      v-if="isShowSystemMenuBoard"
      class="system-menu-board"
      @mousedown.stop
    >
      <div class="false-input-wrap">
        <false-input></false-input>
      </div>
      <!-- app列表 -->
      <app-list-panel :apps="apps"></app-list-panel>
      <!-- 推荐项目 -->
      <recommend-project-panel :projects="recommendProjectMenus"></recommend-project-panel>
      <!-- 尾部面板 -->
      <footer-panel></footer-panel>
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { systemMenuBoardMenus, recommendProjectMenus } from "@/config";
import { viewNamespaceSymbol } from "utils";

import FalseInput from "./FalseInput.vue";
import AppListPanel from "./AppListPanel/index.vue";
import RecommendProjectPanel from "./RecommendProjectPanel/index.vue";
import FooterPanel from "./FooterPanel/index.vue";

export default {
  name: 'SystemMenuBoard',
  components: {
    FalseInput,
    AppListPanel,
    RecommendProjectPanel,
    FooterPanel
  },
  setup() {
    const store = useStore(),
          viewNamespaceState = store.state[viewNamespaceSymbol],
          isShowSystemMenuBoard = computed(() => viewNamespaceState.isShowSystemMenuBoard);

    return {
      apps: systemMenuBoardMenus,
      recommendProjectMenus,
      isShowSystemMenuBoard
    };
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  @include animation-slide-up;
}

.slide-leave-active {
  @include animation-slide-down;
}

.system-menu-board {
  @include disabled-selected;
  overflow: hidden;
  position: absolute;
  left: 50%;
  bottom: 2%;
  width: 40%;
  padding: 25px 25px 0 25px;
  transform: translateX(-50%);
  background-color: #f2f2f2e7;
  border-radius: 8px;
}
</style>