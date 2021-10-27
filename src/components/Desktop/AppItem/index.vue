<template>
  <div
    class="app-item"
    :style="getStyle"
    draggable="true"
    @dragstart="handleDrag"
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
let uid = 0;

export default {
  props: {
    item: Object
  },
  emits: {
    setAppId: null
  },
  setup (props, { emit }) {
    const store = useStore();
    // 设置appid
    const appid = ++ uid;
    emit("setAppId", { item: props.item, appid });
    const appItemWidth = computed(() => store.state.appGridLayoutItemWidth),
          appItemHeight = computed(() => store.state.appGridLayoutItemHeight);

    const getStyle = computed(() => {
      const item = props.item;
      return {
        left: item.x + 'px',
        top: item.y + 'px',
        width: appItemWidth.value + 'px',
        height: appItemHeight.value + 'px'
      };
    });

    function handleDrag (e) {
      e.dataTransfer.setData("appid", appid);
    }

    return {
      getStyle,
      handleDrag
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
      width: 48px;
      height: 48px;
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