<template>
  <base-app-widget
    :show="isShowVsCodeWidget"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="vscode"
  >
    <iframe
      class="iframe"
      src="https://github1s.com/Joker-coder-x/windows11/"
      frameborder="0"
    ></iframe>
  </base-app-widget>
</template>

<script>
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
    showEventMutationType: viewNamespace(SHOW_VS_CODE_WIDGET),
    hiddenEventMutationType: viewNamespace(HIDDEN_VS_CODE_WIDGET),
    closeEventMutationType: viewNamespace(CLOSE_VS_CODE_WIDGET),
    info: {
      logo: require("assets/icons/code.png"),
      name: 'Vs Code',
    }
  },
  components: {
    BaseAppWidget
  },
  setup() { },
}
</script>

<style lang="scss" scoped>
.vscode {
  @include disabled-selected;
}

.iframe {
  width: 100%;
  height: 100%;
}
</style>
