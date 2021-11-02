<template>
  <div
    class="input-range"
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
    ></div>
  </div>
</template>

<script>
import { ref, onUnmounted, onMounted } from 'vue'

export default {
  name: 'InputRange',
  props: {
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
  setup () {
    const isDown = ref(false),
          inputRangeRef = ref(null),
          inputSliderRef = ref(null),
          offsetLeft = ref(0);

    let lastX = 0,
        wrapWidth = 0,
        sliderWidth = 0,
        maxSliderLeft = 0;

    const setSizeInfo = () => {
      if (inputRangeRef.value && inputSliderRef.value) {
        wrapWidth = inputRangeRef.value.offsetWidth;
        sliderWidth = inputSliderRef.value.offsetWidth;
        maxSliderLeft = wrapWidth - sliderWidth;
      }
    }

    const handleMousedown = (e) => {
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

    document.body.addEventListener('mousemove', handleMouseMove, false);
    document.body.addEventListener('mouseup', handleMouseUp, false);
    window.addEventListener('resize', setSizeInfo, false);

    onMounted(() => {
      setSizeInfo();
    });

    onUnmounted(() => {
      document.body.removeEventListener('mousemove', handleMouseMove, false);
      document.body.removeEventListener('mouseup', handleMouseUp, false);
      window.removeEventListener('resize', setSizeInfo, false);
    });

    return {
      inputRangeRef,
      inputSliderRef,
      offsetLeft,
      handleMousedown
    };
  },
}
</script>

<style lang="scss" scoped>
.input-range {
  position: relative;
  display: inline-block;
  background-color: #ccc;
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