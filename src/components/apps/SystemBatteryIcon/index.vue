<template>
  <template v-if="!isCharging">
    <span
      v-bind="$attrs"
      :class="[iconName, isShowTip ? 'tip' : '']"
      :data-value="batteryValue + '%'"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    ></span>
  </template>
  <template v-else>
    <span
      :class="['battery', isShowTip ? 'tip' : '']"
      :data-value="batteryValue + '%'"
      v-bind="$attrs"
      href="javascript:;" >
      <img
        src="~assets/icons/ui/battery.png"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousemove="handleMouseMove"
      />
    </span>
  </template>
</template>

<script>
import {
  computed,
  onUnmounted,
  ref
} from 'vue';

import { getBatteryManager } from "utils";

export default {
  name: "SystemBatteryIcon",
  setup () {
    const batteryValue = ref(100),
          isCharging = ref(false),
          isShowTip = ref(false);
    const iconName = computed(() => {
      const val = batteryValue.value;

      let icon = 'iconfont icon-battery'
      if (val >= 90) {
        icon += '4';
      } else if (val >= 70 && val < 90) {
        icon += '3';
      } else if (val >= 40 && val < 70) {
        icon += '2';
      } else if (val >= 15 && val < 40) {
        icon += '1';
      } else {
        icon += '0';
      }

      return icon;
    });

    updateBatteryInfo(batteryValue, isCharging);
    let t = setInterval(() => {
      updateBatteryInfo(batteryValue, isCharging)
    }, 1000);

    onUnmounted(() => {
      clearInterval(t);
      t = null;
    });

    const {
      handleMouseEnter,
      handleMouseMove,
      handleMouseLeave
    } = getMouseEventHandlers(isShowTip);

    return {
      batteryValue,
      isCharging,
      isShowTip,
      iconName,
      handleMouseEnter,
      handleMouseMove,
      handleMouseLeave
    };
  },
};


function updateBatteryInfo (batteryValue, isCharging) {
  getBatteryManager()
    .then(batteryManager => {
      batteryValue.value = batteryManager.level * 100;
      isCharging.value = batteryManager.charging;
    });
};

function getMouseEventHandlers (isShowTip) {
  const delay = 600;
  let enterTime = null;
  let t = null;

  const handleMouseEnter = () => {
    enterTime = new Date().getTime();

    t = setTimeout(() => {
      if (enterTime !== null) {
        isShowTip.value = true;
      }
    }, delay);
  };
  const handleMouseMove = () => {
    const time = new Date().getTime();

    if (time - enterTime > delay) {
      isShowTip.value = true;
    }
  };
  const handleMouseLeave = () => {
    isShowTip.value = false;
    enterTime = null;
    clearTimeout(t);
  };

  return {
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave
  };
}

</script>

<style lang="scss" scoped>
.battery {
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
  }
}

.tip {
  position: relative;

  &::after {
    content: attr(data-value);
    position: absolute;
    top: -30px;
    left: 50%;
    padding: 6px;
    background-color: #fff;
    font-size: 10px;
    line-height: 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    transform: translateX(-50%);
  }
}
</style>