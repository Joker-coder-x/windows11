<template>
  <div
    :class="['input-range', isShowTip ? 'tip' : '']"
    ref="inputRangeRef"
    :style="{
      backgroundColor: bgColor
    }"
  >
    <div
      class="input-range-over"
      :style="{
        width: offsetLeft + 'px',
        backgroundColor: trackColor
      }"
    ></div>
    <div
      :class="['input-range-slider', sliderClass]"
      ref="inputSliderRef"
      @mousedown="handleMousedown"
      :style="{
        left: offsetLeft + 'px'
      }"
      :data-value="value"
    ></div>
  </div>
</template>

<script>
import {
  ref,
  onUnmounted,
  onMounted,
  watch,
  computed,
  warn
} from 'vue';

import { useStore } from 'vuex';

export default {
  name: 'InputRange',
  props: {
    min:{
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    modelValue: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    showTip: {
      type: Boolean,
      default: true
    },
    sliderClass: {
      type: String,
      default: ''
    },
    trackColor: {
      type: [String, Number],
      default: '#0E63B5'
    },
    bgColor: {
      type: [String, Number],
      default: '#ddd'
    }
  },
  setup (props, { emit }) {
    const isDown = ref(false),
          inputRangeRef = ref(null),
          inputSliderRef = ref(null),
          offsetLeft = ref(0),
          value = ref(props.modelValue),
          store = useStore();

    let lastX = 0,
        wrapWidth = 0,
        sliderWidth = 0,
        maxSliderLeft = 0;

    watch(
      () => props.modelValue,
      newVal => {
        if (value.value !== newVal) {
          value.value = newVal;
        }
      }
    );
    watch(
      offsetLeft,
      newVal => {
        value.value = Math.round(props.min + ((props.max - props.min) * (newVal / maxSliderLeft)));
        emit('update:modelValue', value.value);
      }
    );
    watch(
      computed(() => store.state.isShowSystemStatusControlBoard),
      newVal => {
        if (newVal) {
          setTimeout(setSliderPos);
        }
      }
    );

    const isShowTip = computed(() => props.showTip && isDown.value);
    const setSizeInfo = () => {
      if (inputRangeRef.value && inputSliderRef.value) {
        wrapWidth = inputRangeRef.value.offsetWidth;
        sliderWidth = inputSliderRef.value.offsetWidth;
        maxSliderLeft = wrapWidth - sliderWidth;
      }
    };
    const setSliderPos = () => {
      setSizeInfo();
      offsetLeft.value = maxSliderLeft * ((value.value - props.min) / props.max);
    };

    const handleMousedown = (e) => {
      if (!maxSliderLeft) {
        setSizeInfo();
      }

      isDown.value = true;
      lastX = e.pageX;
    };

    const handleMouseMove = (e) => {
      if (isDown.value) {
        let curX = e.pageX,
            distance = curX - lastX;

        offsetLeft.value += distance;

        if (offsetLeft.value < 0) {
          offsetLeft.value = 0;
        } else if (offsetLeft.value > maxSliderLeft) {
          offsetLeft.value = maxSliderLeft;
        }

        lastX = curX;
      }
    };

    const handleMouseUp = () => isDown.value = false;
    const bindEvent = () => {
      document.body.addEventListener('mousemove', handleMouseMove, false);
      document.body.addEventListener('mouseup', handleMouseUp, false);
      window.addEventListener('resize', setSizeInfo, false);
    };

    onMounted(() => {
      bindEvent();
      setSizeInfo();
    });
    onUnmounted(() => {
      document.body.removeEventListener('mousemove', handleMouseMove, false);
      document.body.removeEventListener('mouseup', handleMouseUp, false);
      window.removeEventListener('resize', setSizeInfo, false);
    });

    return {
      value,
      isShowTip,
      inputRangeRef,
      inputSliderRef,
      offsetLeft,
      handleMousedown
    };
  },
}

</script>

<style lang="scss" scoped>
.input-range.tip .input-range-slider::before {
  content: attr(data-value);
  position: absolute;
  top: -35px;
  left: 50%;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 10px;
  line-height: 10px;
  border-radius: 4px;
  transform: translateX(-50%);
}

.input-range{
  position: relative;
  display: inline-block;
  height: 4px;
  width: 200px;
  border-radius: 2px;
  box-sizing: border-box;

  &-slider {
    position: absolute;
    left: 0;
    top: 50%;
    width: 12px;
    height: 12px;
    background-color: blue;
    border-radius: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &-over {
    position: absolute;
    left: 0;
    top: 0;
    width: 0px;
    height: 100%;
    border-radius: 2px;
  }
}

</style>