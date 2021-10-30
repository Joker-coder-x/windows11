<template>
  <div
    :class="['context-menu', isShow ? 'show' : '']"
    :style="setMenuPos"
    @mousedown.stop
  >
    <context-menu-item
      v-for="(item, index) of menus"
      :key="index"
      :item="item">
    </context-menu-item>
  </div>
</template>

<script>
import ContextMenuItem from "./ContextMenuItem.vue";
import { useStore } from "vuex";
import { computed } from 'vue';

const menus = [
  {
    img: require("assets/icons/menu/view.png"),
    name: '查看',
    rightIcon: 'icon-arrow-right'
  },
  {
    img: require("assets/icons/menu/sort.png"),
    name: '排序方式',
    rightIcon: 'icon-arrow-right'
  },
  {
    img: require("assets/icons/menu/refresh.png"),
    name: '刷新',
    splitLine: true,
  },
  {
    img: require("assets/icons/menu/new.png"),
    name: '新建',
    rightIcon: 'icon-arrow-right',
    splitLine: true,
  },
  {
    img: require("assets/icons/menu/display.png"),
    name: '显示设置'
  },
  {
    img: require("assets/icons/menu/personalize.png"),
    name: '个性化',
    splitLine: true
  },
  {
    img: require("assets/icons/menu/terminal.png"),
    name: '在Windows 终端 中打开',
  },
  {
    img: require("assets/icons/menu/info.png"),
    name: '关于'
  },
  {
    img: require("assets/icons/menu/more.png"),
    name: '显示更多选项',
    rightText: 'Shift + F10'
  },
];

export default {
  components: {
    ContextMenuItem
  },
  setup() {
    const store = useStore();
    const setMenuPos = computed(() => {
      return {
        left: store.state.desktopContextMenuPosX + 'px',
        top: store.state.desktopContextMenuPosY + 'px',
      };
    });
    const isShow = computed(() => store.state.isShowDesktopContextMenu);

    return {
      menus,
      setMenuPos,
      isShow
    };
  },
}
</script>

<style lang="scss" scoped>
.context-menu {
  @include disabled-selected;
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  z-index: $desktopContextMenuZIndex;
  padding: 4px;
  background-color: #f9f9f9e0;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(68, 68, 68, 0.548);

  &.show {
    display: block;
  }
}
</style>