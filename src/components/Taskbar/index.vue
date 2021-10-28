<template>
  <div
    class="taskbar"
    ref="taskbarRef"
    @mousedown.right="handleShowContextMenu"
    @mousedown.middle="handleHiddenContextMenu"
    @mousedown.left="handleHiddenContextMenu"
  >
    <status-bar></status-bar>
    <task-list></task-list>
    <taskbar-context-menu ref="taskbarContextMenuRef"></taskbar-context-menu>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import StatusBar from "./StatusBar/index.vue";
import TaskList from "./TaskList/index.vue";

import TaskbarContextMenu from "./TaskbarContextMenu/index.vue";

import { getTaskbarContextMenuBehavior } from "composables/contextMenuBehavior";

export default {
  name: 'Taskbar',
  components: {
    StatusBar,
    TaskList,
    TaskbarContextMenu
  },
  setup() {
    const store = useStore(),
          taskbarRef = ref(null),
          taskbarContextMenuRef = ref(null);

    const {
      handleShowContextMenu,
      handleHiddenContextMenu
    } = getTaskbarContextMenuBehavior(store, taskbarRef, taskbarContextMenuRef);

    return {
      taskbarRef,
      taskbarContextMenuRef,
      handleShowContextMenu,
      handleHiddenContextMenu
    };
  },
}
</script>

<style lang="scss">
.taskbar {
  @include disabled-selected;
  position: relative;
  height: $taskbarHeight;
  border: 1px solid $taskbarBorderColor;
  background-color: $taskbarBgColor;
  box-sizing: border-box;
}
</style>