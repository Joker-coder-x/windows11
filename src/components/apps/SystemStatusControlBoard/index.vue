<template>
  <transition name="slide-horizontal">
    <div
      v-show="isShowSystemStatusControlBoard"
      class="system-status-control-panel"
    >
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
          v-model="lightValue"
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
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

import ControlItem from "./ControlItem";
import InputRange from "../../common/InputRange";

import { SET_LIGHT_VALUE } from "store/mutation-types";

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
    name: '省电模式',
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
  setup () {
    const store = useStore();
    const handleSetActiveItem = (item) => item.active = !item.active;
    const isShowSystemStatusControlBoard = computed(() => store.state.isShowSystemStatusControlBoard);
    const lightValue = computed({
      get () {
        return store.state.lightValue;
      },
      set (newVal) {
        store.commit(SET_LIGHT_VALUE, newVal);
      }
    });

    return {
      controlList: reactive(controlList),
      lightValue,
      isShowSystemStatusControlBoard,
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

.slide-horizontal-enter-active {
  animation: slide-left .25s;
}

.slide-horizontal-leave-active {
  animation: slide-right .25s;
}

@keyframes slide-left {
  from {
    right: -100%;
    opacity: 0;
  }

  to {
    right: 1%;
    opacity: 1;
  }
}

@keyframes slide-right {
  from {
    right: 1%;
    opacity: 1;
  }

  to {
    right: -100%;
    opacity: 0;
  }
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