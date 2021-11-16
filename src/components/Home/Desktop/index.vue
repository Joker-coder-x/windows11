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
    <desktop-context-menu ref="contextMenuRef"></desktop-context-menu>
    <!-- 系统菜单面板 -->
    <system-menu-board></system-menu-board>
    <!-- 系统搜索面板 -->
    <system-search-board></system-search-board>
    <!-- 系统推荐资讯面板 -->
    <system-recom-info-board></system-recom-info-board>
    <!-- 系统状态控制面板 -->
    <system-status-control-board></system-status-control-board>
    <!-- 系统日历面板 -->
    <system-calendar-board></system-calendar-board>
    <!-- 系统终端 -->
    <system-terminal></system-terminal>
    <!-- vscode -->
    <vs-code></vs-code>
    <!-- edge浏览器 -->
    <edge-browser></edge-browser>
    <!-- 计算器 -->
    <calculator></calculator>
    <!-- 记事本 -->
    <notepad></notepad>
  </div>
</template>

<script>
// 导入Vue API
import {
  ref,
  reactive
} from 'vue';
import { useStore } from 'vuex';

import config from "@/config";

// 组合API模块
import initLayOut from "composables/layout";
import  { getDesktopContextMenuBehavior } from "composables/contextMenuBehavior";

// 导入子组件
import AppItem from "./AppItem/index.vue";
import DesktopContextMenu from "./DesktopContextMenu/index.vue";
import SystemMenuBoard from "components/apps/SystemMenuBoard";
import SystemSearchBoard from "components/apps/SystemSearchBoard";
import SystemRecomInfoBoard from "components/apps/SystemRecomInfoBoard";
import SystemStatusControlBoard from "components/apps/SystemStatusControlBoard";
import SystemCalendarBoard from "components/apps/SystemCalendarBoard";
import SystemTerminal from "components/apps/SystemTerminal";
import VsCode from "components/apps/VsCode";
import EdgeBrowser from "components/apps/EdgeBrowser";
import Calculator from "components/apps/Calculator";
import Notepad from "components/apps/Notepad";

export default {
  components: {
    AppItem,
    DesktopContextMenu,
    SystemMenuBoard,
    SystemSearchBoard,
    SystemRecomInfoBoard,
    SystemStatusControlBoard,
    SystemCalendarBoard,
    SystemTerminal,
    VsCode,
    EdgeBrowser,
    Calculator,
    Notepad
  },
  setup () {
    const desktopRef = ref(null),
          contextMenuRef = ref(null),
          store = useStore(),
          apps = reactive(config.apps.map(item => ({...item, x: 0, y: 0, appid: null})));

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