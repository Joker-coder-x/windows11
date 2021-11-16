<template>
  <transition name="slide" mode="out-in">
    <div
      class="system-search-board"
      v-show="isShowSystemSearchBoard"
      @mousedown.stop
    >
      <div class="system-search-board-input-wrap">
        <system-search-board-input
          :placeholder="placeholder"
          ref="searchInputRef"
        >
        </system-search-board-input>
      </div>
      <tabs
        :tabsData="tabsData"
        :activeIndex="activeIndex"
        @update-active-index="handleUpdateActiveIndex"
      ></tabs>

      <component :is="panelComponentName"></component>
    </div>
  </transition>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { tabsData } from "./data";
import { viewNamespaceSymbol } from "utils";

import SystemSearchBoardInput from "./SystemSearchBoardInput";
import Tabs from "./Tabs";
import AllPanel from "./SubPanel/AllPanel";
import AppPanel from "./SubPanel/AppPanel";
import DocumentPanel from "./SubPanel/DocumentPanel";
import WebPagePanel from "./SubPanel/WebPagePanel";

export default {
  name: 'SystemSearchBoard',
  components: {
    SystemSearchBoardInput,
    Tabs,
    AllPanel,
    AppPanel,
    DocumentPanel,
    WebPagePanel
  },
  setup() {
    const activeIndex = ref(0),
          placeholder = ref("在此键入已搜索"),
          searchInputRef = ref(null),
          panelComponentName = ref(tabsData[activeIndex.value].component),
          store = useStore(),
          viewNamespaceState = store.state[viewNamespaceSymbol];

    const isShowSystemSearchBoard = computed(() => viewNamespaceState.isShowSystemSearchBoard);

    const handleUpdateActiveIndex = (index) => {
      const item = tabsData[index],
            { key, label, component } = item;

      if (key !== 'more') {
        placeholder.value = key !== 'all' ? label + ':' : "在此键入已搜索";
        searchInputRef.value.focus();
        panelComponentName.value = component;
      }

      activeIndex.value = index
    };

    return {
      tabsData,
      activeIndex,
      placeholder,
      panelComponentName,
      searchInputRef,
      isShowSystemSearchBoard,
      handleUpdateActiveIndex
    };
  },
}
</script>

<style lang="scss" scoped>
$bgColor: #f2f2f2e7;

.slide-enter-active {
  @include animation-slide-up;
}

.slide-leave-active {
  @include animation-slide-down;
}

.system-search-board {
  @include disabled-selected;
  overflow: hidden;
  position: absolute;
  left: 50%;
  bottom: 1%;
  width: 50%;
  height: 95%;
  padding: 25px 25px 0 25px;
  transform: translateX(-50%);
  background-color: $bgColor;
  border-radius: 8px;
}
</style>