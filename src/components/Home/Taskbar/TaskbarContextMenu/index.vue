<template>
  <div
    :class="['taskbar-context-menu', isShow ? 'show' : '']"
    :style="setMenuPos"
    @mousedown.stop
  >
    <taskbar-context-menu-item
      v-for="(item, index) of taskMenus"
      :key="index"
      :item="item"
    ></taskbar-context-menu-item>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { taskbarContextMenus } from "@/config";
import { viewNamespaceSymbol } from "utils";

import TaskbarContextMenuItem from "./TaskbarContextMenuItem.vue";

export default {
  name: 'TaskbarContextMenu',
  components: {
    TaskbarContextMenuItem
  },
  setup() {
    const store = useStore(),
          viewNamespaceState = store.state[viewNamespaceSymbol];

    const setMenuPos = computed(() => {
      return {
        left: viewNamespaceState.taskbarContextMenuPosX + 'px',
        top: viewNamespaceState.taskbarContextMenuPosY + 'px',
      };
    });
    const isShow = computed(() => viewNamespaceState.isShowTaskbarContextMenu);

    return {
      taskMenus: taskbarContextMenus,
      setMenuPos,
      isShow
    };
  },
}
</script>


<style lang="scss" scoped>
.taskbar-context-menu {
  display: none;
  position: fixed;
  z-index: $taskbarContextMenuZIndex;
  padding: 3px;
  background-color: $taskbarContextMenuBgColor;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  color: #424242;

  &.show {
    display: block;
  }
}

</style>