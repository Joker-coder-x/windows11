<template>
  <base-app-widget
    :show="isShowMyComputer"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="my-computer"
    toolbar-bg-color="#f3f3f3"
    toolbar-text-color="#424242"
    toolbar-operate-panel-icon-color="black"
    toolbar-operate-panel-hover-color="#DBDBDB"
    @mousedown.stop
  >
    <div class="my-computer-bd">
      此电脑 --待更新~
    </div>
  </base-app-widget>
</template>

<script>
import { viewNamespace } from "utils";
import {
  SHOW_MY_COMPUTER,
  HIDDEN_MY_COMPUTER,
  CLOSE_MY_COMPUTER
} from "store/mutation-types";

import BaseAppWidget from "../BaseAppWidget";

export default {
  name: "MyComputer",
  _appConfig: {
    storeControlPropName: "isShowMyComputer",
    info: {
      logo: require("assets/icons/win/917.png"),
      name: '此电脑'
    },
    showEventMutationType: viewNamespace(SHOW_MY_COMPUTER),
    hiddenEventMutationType: viewNamespace(HIDDEN_MY_COMPUTER),
    closeEventMutationType: viewNamespace(CLOSE_MY_COMPUTER)
  },
  components: {
    BaseAppWidget
  },
  setup() { },
}
</script>


<style lang="scss" scoped>
.my-computer {
  @include disabled-selected;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 25px #00000085;

  .my-computer-bd {
    @include flex-center;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>