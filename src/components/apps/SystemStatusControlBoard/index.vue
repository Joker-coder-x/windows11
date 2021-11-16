<template>
  <transition name="slide-horizontal">
    <div
      v-if="isShowSystemStatusControlBoard"
      class="system-status-control-panel"
      @mousedown.stop
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
        <system-audio-icon class="icon"></system-audio-icon>
        <input-range
          v-model="audioValue"
          class="range"
          slider-class="slider"
          bg-color="#868686"
        ></input-range>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  computed,
  reactive
} from 'vue';
import { useStore } from 'vuex';

import {
  SET_AUDIO_VALUE,
  SET_LIGHT_VALUE,
  SET_EYE_CARE_MODE
} from "store/mutation-types";

import { systemControlList } from "@/config";
import { viewNamespaceSymbol, systemNamespace, systemNamespaceSymbol } from "utils";

import ControlItem from "./ControlItem";
import InputRange from "../../common/InputRange";
import SystemAudioIcon from "../SystemAudioIcon";

export default {
  name: 'SystemStatusControlBoard',
  components: {
    ControlItem,
    InputRange,
    SystemAudioIcon
  },
  setup () {
    const store = useStore(),
          viewNamespaceState = store.state[viewNamespaceSymbol],
          systemNamespaceState = store.state[systemNamespaceSymbol];

    const isShowSystemStatusControlBoard = computed(() => viewNamespaceState.isShowSystemStatusControlBoard);
    const lightValue = computed({
      get: () => systemNamespaceState.lightValue,
      set: (newVal) => store.commit(systemNamespace(SET_LIGHT_VALUE), newVal)
    });
    const audioValue = computed({
      get: () => systemNamespaceState.audioValue,
      set: (newVal) => store.commit(systemNamespace(SET_AUDIO_VALUE), newVal)
    });

    const handleSetActiveItem = (item) => {
      item.active = !item.active;
      item.handler && item.handler(store);
    }

    return {
      controlList: reactive(systemControlList),
      lightValue,
      audioValue,
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