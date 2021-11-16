<template>
  <div
    class="app-item"
    :style="getStyle"
    draggable="true"
    @dragstart="handleDrag"
    @dblclick="handleDbClick"
  >
    <div class="app-logo">
      <img
        :src="item.icon"
        draggable="false"
        class="img" />
    </div>
    <div class="app-info">
      <span class="app-name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { layoutNamespaceSymbol } from "utils";

let uid = 0;

export default {
  name: "AppItem",
  props: {
    item: Object
  },
  emits: {
    setAppId: null
  },
  setup (props, { emit }) {
    const store = useStore(),
          layoutNamespaceState = store.state[layoutNamespaceSymbol],
          appid = ++ uid;  // 设置appid

    emit("setAppId", { item: props.item, appid });

    const appItemWidth = computed(() => layoutNamespaceState.appGridLayoutItemWidth),
          appItemHeight = computed(() => layoutNamespaceState.appGridLayoutItemHeight);

    const getStyle = computed(() => {
      const item = props.item;
      return {
        left: item.x + 'px',
        top: item.y + 'px',
        width: appItemWidth.value + 'px',
        height: appItemHeight.value + 'px'
      };
    });

    const handleDrag = (e) =>  e.dataTransfer.setData("appid", appid);
    const handleDbClick = () => props.item.handler && props.item.handler(store);

    return {
      getStyle,
      handleDrag,
      handleDbClick
    };
  },
}
</script>

<style lang="scss" scoped>
.app-item {
  @include disabled-selected;
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  border-radius: 2px;
  cursor: default;

  &:hover {
    background-color: rgba(180, 166, 166, 0.61);
  }

  .app-logo {
    .img {
      width: 42px;
      height: 42px;
    }
  }

  .app-info {
    @include ellipsis;

    .app-name {
      font-size: 12px;
    }
  }
}
</style>