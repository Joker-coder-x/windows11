<template>
  <div
    class="desktop"
    ref="desktopRef"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @mousedown.right="handleShowContextMenu"
    @mousedown.middle="handleHiddenContextMenu"
    @mousedown.left="handleHiddenContextMenu"
  >
    <app-item
      v-for="(item, index) of apps"
      :key="index"
      :item="item"
      @set-app-id="handleSetAppId"
    ></app-item>

    <context-menu ref="contextMenuRef"></context-menu>
  </div>
</template>

<script>
// 导入Vue API
import {
  ref,
  reactive
} from 'vue';

import { useStore } from 'vuex';

// 导入子组件
import AppItem from "./AppItem/index.vue";
import ContextMenu from "./ContextMenu/index.vue";

// 组合API模块
import initLayOut from "@/composables/layout";
import  { getDesktopContextMenuBehavior } from "composables/contextMenuBehavior";

export default {
  components: {
    AppItem,
    ContextMenu
  },
  setup () {
    const desktopRef = ref(null);
    const contextMenuRef = ref(null);
    const store = useStore();
    const apps = reactive([
      {
        icon: require("assets/icons/win/917.png"),
        name: '此电脑',
        x: 0,
        y: 0,
        appid: null
      },
      {
        icon: require("assets/icons/bin0.png"),
        name: '回收站',
        x: 0,
        y: 0,
        appid: null
      },
      {
        icon: require("assets/images/app/vscode.png"),
        name: 'VSCode',
        x: 0,
        y: 0,
        appid: null
      },
      {
        icon: require("assets/images/app/cloud-music.png"),
        name: '网易云音乐',
        x: 0,
        y: 0,
        appid: null
      },
      {
        icon: require("assets/icons/edge.png"),
        name: 'Edge浏览器',
        x: 0,
        y: 0,
        appid: null
      },
    ]);

    const {
      handleDragOver,
      handleDrop,
      handleSetAppId
    } = initLayOut(apps, desktopRef, store);

    const {
      handleShowContextMenu,
      handleHiddenContextMenu
    } = getDesktopContextMenuBehavior(store, desktopRef, contextMenuRef);

    return {
      desktopRef,
      contextMenuRef,
      apps,
      handleDragOver,
      handleDrop,
      handleSetAppId,
      handleShowContextMenu,
      handleHiddenContextMenu
    }
  },
}
</script>


<style lang="scss">
.desktop {
  position: relative;
  height: $desktopHeight;
}
</style>