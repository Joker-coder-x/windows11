<template>
  <div class="popover" @click="handleClick">
    <div v-show="localValue"
         :class="['tooltip', direction]"
         :style="{[direction]: '-' + spacing}"
         @click.stop
         @mousedown.stop>
       <slot></slot>
    </div>
    <slot name="reference"></slot>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
export default {
  name: "Popover",
  props: {
    direction: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'bottom', 'left', 'right'].indexOf(val) !== -1;
      }
    },
    spacing: {
      type: String,
      default: '10px'
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    updateModelValue: null
  },
  setup (props, { emit }) {

    const localValue = ref(props.modelValue);

    const handleClick = () => localValue.value = !localValue.value;
    watch(localValue, (newVal) => emit('update:modelValue', newVal));
    watch(
      () => props.modelValue,
      (newVal) => {
        if (localValue.value !== newVal) {
          localValue.value = newVal
        }
      }
    );

    return {
      localValue,
      handleClick
    };
  },
}
</script>

<style lang="scss" scoped>
.popover {
  position: relative;
  display: inline-block;

  .tooltip {
    position: absolute;

    &.left {
      left: 0%;
      top: 50%;
      transform: translateY(-50%);
    }

    &.right {
      right: 0%;
      top: 50%;
      transform: translateY(-50%);
    }

    &.top {
      left: 50%;
      top: 0%;
      transform: translate(-50%, -100%);
    }

    &.bottom {
      bottom: 0%;
      left: 50%;
      transform: translate(-50%, 100%);
    }
  }
}
</style>