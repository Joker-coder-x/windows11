<template>
  <base-app-widget
    :show="isShowRecycleBin"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="recycle-bin"
    toolbar-bg-color="#f3f3f3"
    toolbar-text-color="#424242"
    toolbar-operate-panel-icon-color="black"
    toolbar-operate-panel-hover-color="#DBDBDB"
    @mousedown.stop
  >
    <div class="recycle-bin-bd">
      回收站 --待更新~
    </div>
  </base-app-widget>
</template>

<script>
import {
  SHOW_RECYCLE_BIN,
  HIDDEN_RECYCLE_BIN,
  CLOSE_RECYCLE_BIN
} from "store/mutation-types";
import { viewNamespace } from "utils";

import BaseAppWidget from "../BaseAppWidget";

export default {
  name: "RecycleBin",
  _appConfig: {
    storeControlPropName: "isShowRecycleBin",
    info: {
      logo: require("assets/icons/bin1.png"),
      name: '回收站'
    },
    showEventMutationType: viewNamespace(SHOW_RECYCLE_BIN),
    hiddenEventMutationType: viewNamespace(HIDDEN_RECYCLE_BIN),
    closeEventMutationType: viewNamespace(CLOSE_RECYCLE_BIN),
  },
  components: {
    BaseAppWidget
  },
  setup() { },
}
</script>

<style lang="scss" scoped>
.recycle-bin {
  @include disabled-selected;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 25px #00000085;

  .recycle-bin-bd {
    @include flex-center;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>