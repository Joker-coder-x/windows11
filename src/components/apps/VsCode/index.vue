<template>
  <transition name="scale-slide">
    <base-app-widget
      v-show="isShowVsCodeWidget"
      :class="['vscode', appIsActive ? 'active' : '']"
      name="VS Code"
      :icon="require('assets/icons/code.png')"
      @on-minimize="handleMinimize"
      @on-close="handleClose"
    >
      <iframe
        class="iframe"
        src="https://github1s.com/Joker-coder-x/windows11/blob/HEAD/README.md"
        frameborder="0"
      ></iframe>
    </base-app-widget>
  </transition>
</template>

<script>
import { unref } from 'vue';
import { useStore } from 'vuex';

import {
  SHOW_VS_CODE_WIDGET,
  HIDDEN_VS_CODE_WIDGET,
  CLOSE_VS_CODE_WIDGET,
  ADD_TASK
} from "store/mutation-types";

import { APP_STATUS_MAP } from "utils";

import BaseAppWidget from "../BaseAppWidget";

export default {
  name: 'VsCode',
  _appConfig: {
    storeControlPropName: "isShowVsCodeWidget",
    info: {
      logo: require("assets/icons/code.png"),
      name: 'Vs Code',
      handler: (store) => {
        store.getters.isShowVsCodeWidget ?
          store.commit(HIDDEN_VS_CODE_WIDGET) :
          store.commit(SHOW_VS_CODE_WIDGET);
      }
    }
  },
  components: {
    BaseAppWidget
  },
  setup() {
    const store = useStore();

    const handleMinimize = () => store.commit(HIDDEN_VS_CODE_WIDGET);
    const handleClose = () => store.commit(CLOSE_VS_CODE_WIDGET);

    return {
      handleMinimize,
      handleClose
    };
  },
}
</script>

<style lang="scss" scoped>
.scale-slide-enter-active {
  animation: scale-slide .25s reverse;
}

.scale-slide-leave-active {
  animation: scale-slide .25s;
}

@keyframes scale-slide {
  to {
    width: 0vw;
    height: 0vh;
    opacity: 0;
    top: 100%;
  }
}

.vscode {
  @include disabled-selected;

  &.active {
    z-index: $activeAppWidgetZIndex;
  }
}

.iframe {
  width: 100%;
  height: 100%;
}
</style>
