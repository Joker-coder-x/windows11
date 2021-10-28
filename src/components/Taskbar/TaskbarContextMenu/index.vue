<template>
  <div
    :class="['taskbar-context-menu', isShow ? 'show' : '']"
    :style="setMenuPos"
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

import TaskbarContextMenuItem from "./TaskbarContextMenuItem.vue";

const taskMenus = [
  {
    iconClass: 'icon-setting',
    label: '任务栏设置'
  }
];

export default {
  name: 'TaskbarContextMenu',
  components: {
    TaskbarContextMenuItem
  },
  setup() {
    const store = useStore(),
          state = store.state;
    const setMenuPos = computed(() => {
      return {
        left: store.state.taskbarContextMenuPosX + 'px',
        top: store.state.taskbarContextMenuPosY + 'px',
      };
    });
    const isShow = computed(() => store.state.isShowTaskbarContextMenu);

    return {
      taskMenus,
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