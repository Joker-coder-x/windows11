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
    <!-- app图标item -->
    <app-item
      v-for="(item, index) of apps"
      :key="index"
      :item="item"
      @set-app-id="handleSetAppId"
    ></app-item>
    <!-- 鼠标右键点击显示的菜单栏面板 -->
    <context-menu ref="contextMenuRef"></context-menu>
    <!-- 系统菜单面板 -->
    <system-menu-board></system-menu-board>
    <!-- 系统搜索面板 -->
    <system-search-board></system-search-board>
    <!-- 系统推荐资讯面板 -->
    <system-recom-info-board></system-recom-info-board>
    <!-- 系统状态控制面板 -->
    <system-status-control-board></system-status-control-board>
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
import SystemMenuBoard from "../apps/SystemMenuBoard";
import SystemSearchBoard from "../apps/SystemSearchBoard";
import SystemRecomInfoBoard from "../apps/SystemRecomInfoBoard";
import SystemStatusControlBoard from "../apps/SystemStatusControlBoard";

// 组合API模块
import initLayOut from "@/composables/layout";
import  { getDesktopContextMenuBehavior } from "composables/contextMenuBehavior";

export default {
  components: {
    AppItem,
    ContextMenu,
    SystemMenuBoard,
    SystemSearchBoard,
    SystemRecomInfoBoard,
    SystemStatusControlBoard
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