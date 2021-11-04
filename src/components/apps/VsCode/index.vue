<template>
  <transition name="scale-slide">
    <base-app-widget
      v-if="isShowVsCodeWidget"
      class="vscode"
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
import { useStore } from 'vuex';

import { HIDDEN_VS_CODE_WIDGET } from "store/mutation-types";

import BaseAppWidget from "../BaseAppWidget";

export default {
  name: 'VsCode',
  _appConfig: {
    storeControlPropName: "isShowVsCodeWidget",
  },
  components: {
    BaseAppWidget
  },
  setup() {
    const store = useStore();

    const hiddenVsCodeWidget = () => store.commit(HIDDEN_VS_CODE_WIDGET);

    const handleMinimize = () => hiddenVsCodeWidget();
    const handleClose = () => hiddenVsCodeWidget();

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
}

.iframe {
  width: 100%;
  height: 100%;
}
</style>
