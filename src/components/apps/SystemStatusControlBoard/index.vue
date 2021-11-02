<template>
  <transition>
    <div class="system-status-control-panel">
      <div class="control-list">
        <control-item
          v-for="(item, index) of controlList"
          :key="index"
          :item="item"
          @set-active-item="handleSetActiveItem"
        ></control-item>
      </div>
      <div class="panel">
        <img
          class="icon"
          src="~assets/icons/ui/nightlight.png" />
        <input-range
          class="range"
          slider-class="slider"
          bg-color="#868686"
        ></input-range>
      </div>
      <div class="panel">
        <img
          class="icon"
          src="~assets/icons/ui/audio.png" />
        <input-range
          class="range"
          slider-class="slider"
          bg-color="#868686"
        ></input-range>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive } from 'vue';
import ControlItem from "./ControlItem";
import InputRange from "../../common/InputRange";

const controlList = [
  {
    icon: require('assets/icons/ui/wifi.png'),
    name: 'WIFI',
    active: true
  },
  {
    icon: require('assets/icons/ui/airplane.png'),
    name: '飞行模式',
    active: false
  },
  {
    icon: require('assets/icons/ui/bluetooth.png'),
    name: '蓝牙',
    active: false
  },
  {
    icon: require('assets/icons/ui/saver.png'),
    name: '省点模式',
    active: false
  },
  {
    icon: require('assets/icons/ui/moon.png'),
    name: '专注助手',
    active: false
  },
  {
    icon: require('assets/icons/ui/nightlight.png'),
    name: '夜间模式',
    active: false
  },
  {
    icon: require('assets/icons/ui/location.png'),
    name: '位置',
    active: false
  },
  {
    icon: require('assets/icons/ui/connect.png'),
    name: '连接',
    active: false
  },
  {
    icon: require('assets/icons/ui/project.png'),
    name: '投放',
    active: false
  },
];

export default {
  name: 'SystemStatusControlBoard',
  components: {
    ControlItem,
    InputRange
  },
  setup() {
    const handleSetActiveItem = (item) => {
      item.active = !item.active;
    }

    return {
      controlList: reactive(controlList),
      handleSetActiveItem
    };
  },
}
</script>


<style lang="scss" scoped>
:global(.slider) {
  width: 18px !important;
  height: 18px !important;
  background-color: #fff !important;
}

:global(.slider::after) {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  background-color: #1A6FC1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

:global(.slider:hover::after) {
  width: 12px;
  height: 12px;
}

:global(.slider:active::after) {
  width: 8px;
  height: 8px;
}

.system-status-control-panel {
  @include disabled-selected;
  position: absolute;
  right: 1%;
  bottom: 2%;
  width: 25%;
  padding: 20px;
  background-color: #eee;
  border-radius: 8px;

  .control-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .panel {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 0 10px;

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    .range {
      width: 85%!important;
    }

    &:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>