<template>
   <div
    class="operate-panel"
    ref="operatePanelRef"
  >
    <div
      class="operate-item minimize"
      @click="handleMinimize"
    >
      <span class="iconfont icon-minimize operate-icon"></span>
    </div>
    <div
      class="operate-item maximize"
      @click="handleMaximize"
    >
      <span :class="['iconfont scale operate-icon', full ? 'icon-middlemize' : 'icon-maximize']"></span>
    </div>
    <div
      class="operate-item close"
      @click="handleClose"
    >
      <span class="iconfont icon-close operate-icon"></span>
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

export default {
  name: "BaseAppWidgetOperatePanel",
  props: {
    full: {
      type: Boolean,
      default: false
    },
    iconColor: {
      validator (value) {
        return ['white', 'black'].indexOf(value) !== -1;
      },
      default: 'white'
    },
    hoverColor: {
      type: String,
      default: '#2B2B2B'
    },
    closeHoverColor: {
      type: String,
      default: '#B90505'
    }
  },
  emits: {
    onMinimize: null,
    onMaximize: null,
    onClose: null,
  },
  setup (props, { emit }) {
    const operatePanelRef = ref(null);
    const handleMinimize = () => emit('onMinimize');
    const handleMaximize = () => emit('onMaximize');
    const handleClose = () => emit('onClose');

    const setCssVariables = (operatePanelRef) => {
      const oStyleObj = operatePanelRef.value.style;
      oStyleObj.setProperty('--icon-color', props.iconColor === 'white' ? '#fff' : '#000');
      oStyleObj.setProperty('--hover-color', props.hoverColor);
      oStyleObj.setProperty('--close-hover-color', props.closeHoverColor);
    };

    onMounted(() => {
      setCssVariables(operatePanelRef);
    });

    watch(
      [toRef(props, 'iconColor'), toRef(props, 'hoverColor'), toRef(props, 'closeHoverColor')],
      () => setCssVariables(operatePanelRef)
    );

    return {
      operatePanelRef,
      handleMinimize,
      handleMaximize,
      handleClose
    };
  },
}
</script>

<style lang="scss" scoped>
.operate-panel {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .operate-item {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    height: 100%;
    box-sizing: border-box;

    &.close {
      &:hover {
        background-color: #B90505;
        background-color: var(--close-hover-color);

        .operate-icon {
          color: #fff;
        }
      }
    }

    &:hover {
      background-color: #2B2B2B;
      background-color: var(--hover-color);
    }

    &:active {
      .operate-icon {
        transition: all .25s;
        transform: scale(.7);
      }
    }

    .operate-icon {
      color: var(--icon-color);
      font-size: 16px;

      &.scale {
        transform: scale(.65);
      }
    }
  }
}
</style>