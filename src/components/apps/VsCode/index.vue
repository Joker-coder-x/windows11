<template>
  <transition name="scale-slide">
    <base-app-widget
      v-if="isShowVsCodeWidget"
      :class="['vscode', appIsActive ? 'active' : '']"
      name="VS Code"
      :icon="require('assets/icons/code.png')"
      @on-minimize="handleMinimize"
      @on-close="handleClose"
    >
      <iframe
        class="iframe"
        src="https://github1s.com/Joker-coder-x/windows11/"
        frameborder="0"
      ></iframe>
    </base-app-widget>
  </transition>
</template>

<script>
import { useStore } from 'vuex';

import {
  SHOW_VS_CODE_WIDGET,
  HIDDEN_VS_CODE_WIDGET,
  CLOSE_VS_CODE_WIDGET,
} from "store/mutation-types";

import { viewNamespace } from "utils";

import BaseAppWidget from "../BaseAppWidget";

export default {
  name: 'VsCode',
  _appConfig: {
    storeControlPropName: "isShowVsCodeWidget",
    info: {
      logo: require("assets/icons/code.png"),
      name: 'Vs Code',
      handler: (store) => {
        store.getters[viewNamespace('isShowVsCodeWidget')] ?
          store.commit(viewNamespace(HIDDEN_VS_CODE_WIDGET)) :
          store.commit(viewNamespace(SHOW_VS_CODE_WIDGET));
      }
    }
  },
  components: {
    BaseAppWidget
  },
  setup() {
    const store = useStore();

    const handleMinimize = () => store.commit(viewNamespace(HIDDEN_VS_CODE_WIDGET));
    const handleClose = () => store.commit(viewNamespace(CLOSE_VS_CODE_WIDGET));

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

.vscode {
  @include disabled-selected;
}

.iframe {
  width: 100%;
  height: 100%;
}
</style>
