<template>
  <div
    class="calculator-input-btn-item"
    @click="handleItemClick"
  >
    <div :class="['content', type]"  v-bind="$attrs"><slot></slot></div>
  </div>
</template>

<script>
import { toRefs, unref } from 'vue';

export default {
  name: "CalculatorInputBtnItem",
  inheritAttrs: false,
  props: {
    ch: String,
    type: String
  },
  emits: {
    click: null
  },
  setup (props, { emit }) {
    const { ch } = toRefs(props);
    const handleItemClick = () => {
      emit('click', unref(ch));
    }

    return {
      handleItemClick
    };
  },
}
</script>

<style lang="scss" scoped>
.calculator-input-btn-item {
  width: 25%;
  padding: 2px;

  .content {
    @include flex-center;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-bottom: 1px solid #aaa;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      opacity: .7;
    }

    &.gray {
      background-color: #f9f9f9;
      font-size: 13px;
      color: #444;

      .iconfont {
        font-size: 18px;
      }
    }

    &.primary {
      background-color: #005FBA;
      font-size: 18px;
      color: #fff;
    }

    &.primary:hover {
      background-color: #196EC0;
      opacity: 1;
    }
  }
}
</style>