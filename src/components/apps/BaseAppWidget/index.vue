<template>
  <div
    :class="['base-app-widget', isFull ? 'full' : '']"
    :style="{
      width: isFull ? '100vw' : width,
      height: isFull ? '100vh' : height
    }"
  >
    <div
      class="toolbar"
      v-if="showToolBar"
      :style="{
        height: toolbarHeight,
        backgroundColor: toolbarBgColor,
        color: toolbarTextColor,
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
    <div
      class="main"
      ref="mainRef"
    >
      <slot></slot>
    </div>
  </div>
</template>


<script>
import {
  onMounted,
  ref,
  toRef,
  watch
} from 'vue';

import BaseAppWidgetOperatePanel from "./BaseAppWidgetOperatePanel";

export default {
  name: "BaseAppWidget",
  components: {
    BaseAppWidgetOperatePanel
  },
  props: {
    name: String,
    icon: String,
    // widget的宽度
    width: {
      type: [String, Number],
      default: '60vw'
    },
    // widget的高度
    height: {
      type: [String, Number],
      default: '75vh'
    },
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
    const isFull = ref(false),
          mainRef = ref(null),
          toolbarHeightRef = toRef(props, 'toolbarHeight');

    const handleMinimize = () => emit('onMinimize');
    const handleMaximize = () => {
      isFull.value = !isFull.value;
      emit('onMaximize');
    };
    const handleClose = () => emit('onClose');
    const setCssVariables = () => {
      mainRef.value.style.setProperty('--toolbar-height', toolbarHeightRef.value);
      mainRef.value.style.setProperty('--height', props.height);
    };

    onMounted(() => {
      setCssVariables();
    });
    watch(toolbarHeightRef, () => setCssVariables());

    return {
      isFull,
      mainRef,
      handleMinimize,
      handleMaximize,
      handleClose
    };
  },
}
</script>

<style lang="scss" scoped>
.base-app-widget {
  --toolbar-height: 30px;
  --height: 75vh;

  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  transition: width .25s, height .25s;

  &.full {
    left: 0;
    top: 0;
    border-radius: 0px;
    transform: translate(0%, 0%);
    transition: width .25s, height .25s;

    .main {
      height: calc(100vh - var(--toolbar-height))!important;
    }
  }

  &.active {
    z-index: $activeAppWidgetZIndex;
  }

  .toolbar {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 12px;

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
    position: relative;
    top: -1px;
    height: calc(var(--height) - var(--toolbar-height));
    width: 100%;
  }
}
</style>