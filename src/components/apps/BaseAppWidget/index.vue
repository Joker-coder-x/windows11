<template>
  <div :class="['base-app-widget', isFull ? 'full' : '']">
    <div
      class="toolbar"
      v-if="showToolBar"
      :style="{
        height: toolbarHeight,
        backgroundColor: toolbarBgColor,
        color: toolbarTextColor
      }"
    >
      <slot name="toolbar">
        <div class="logo-panel">
          <img
            class="icon"
            :src="icon" />
          <span class="name">{{ name }}</span>
        </div>
        <base-app-widget-operate-panel
          :icon-color="toolbarOperatePanelIconColor"
          :hover-color="toolbarOperatePanelHoverColor"
          :close-hover-color="toolbarOperatePanelCloseHoverColor"
          @on-minimize="handleMinimize"
          @on-maximize="handleMaximize"
          @on-close="handleClose"
        ></base-app-widget-operate-panel>
      </slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';

import BaseAppWidgetOperatePanel from "./BaseAppWidgetOperatePanel";

export default {
  name: "BaseAppWidget",
  components: {
    BaseAppWidgetOperatePanel
  },
  props: {
    name: String,
    icon: String,
    // 是否显示顶部工具栏
    showToolBar: {
      type: Boolean,
      default: true
    },
    // 顶部工具栏背景颜色
    toolbarBgColor: {
      type: String,
      default: '#191919'
    },
    // 顶部工具栏文字颜色
    toolbarTextColor: {
      type: String,
      default: '#fff'
    },
    // 顶部工具栏高度
    toolbarHeight: {
      type: String,
      default: '30px'
    },
    toolbarOperatePanelHoverColor: {
      type: String,
      default: '#2B2B2B'
    },
    toolbarOperatePanelCloseHoverColor: {
      type: String,
      default: '#B90505'
    },
    toolbarOperatePanelIconColor: {
      type: String,
      default: 'white'
    },
  },
  emits: {
    onMinimize: null,
    onMaximize: null,
    onClose: null,
  },
  setup (props, { emit }) {
    const isFull = ref(false);

    const handleMinimize = () => emit('onMinimize');
    const handleMaximize = () => {
      isFull.value = !isFull.value;
      emit('onMaximize');
    };
    const handleClose = () => emit('onClose');

    return {
      isFull,
      handleMinimize,
      handleMaximize,
      handleClose
    };
  },
}
</script>

<style lang="scss" scoped>
.base-app-widget {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60vw;
  height: 70vh;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  transition: width .25s, height .25s;

  &.full {
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    transform: translate(0%, 0%);
    transition: width .25s, height .25s;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-panel {
      display: flex;
      align-items: center;
      padding-left: 10px;

      .icon {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }

      .name {
        font-size: 12px;
      }
    }
  }

  .main {
    flex: auto;
    width: 100%;
  }
}
</style>