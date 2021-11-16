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
import { useStore } from "vuex";
import { computed } from 'vue';

import { desktopContextMenus } from "@/config";
import { viewNamespaceSymbol } from "utils";

import ContextMenuItem from "./ContextMenuItem.vue";

export default {
  name: "DesktopContextMenu",
  components: {
    ContextMenuItem
  },
  setup() {
    const store = useStore(),
          viewNamespaceState = store.state[viewNamespaceSymbol];

    const setMenuPos = computed(() => {
      return {
        left: viewNamespaceState.desktopContextMenuPosX + 'px',
        top:  viewNamespaceState.desktopContextMenuPosY + 'px',
      };
    });
    const isShow = computed(() => viewNamespaceState.isShowDesktopContextMenu);

    return {
      menus: desktopContextMenus,
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