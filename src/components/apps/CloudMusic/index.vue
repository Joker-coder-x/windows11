<template>
  <base-app-widget
    :show="isShowCloudMusic"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="cloud-music"
    toolbar-bg-color="#EC4141"
    toolbar-text-color="#fff"
    toolbar-operate-panel-icon-color="white"
    toolbar-operate-panel-hover-color="#EC4141"
    @mousedown.stop
  >
    <div class="cloud-music-bd">
      网易云 --待更新~
    </div>
  </base-app-widget>
</template>

<script>
import {
  SHOW_CLOUD_MUSIC,
  HIDDEN_CLOUD_MUSIC,
  CLOSE_CLOUD_MUSIC
} from "store/mutation-types";
import { viewNamespace } from "utils";

import BaseAppWidget from "../BaseAppWidget";

export default {
  name: "CloudMusic",
  _appConfig: {
    storeControlPropName: "isShowCloudMusic",
    showEventMutationType: viewNamespace(SHOW_CLOUD_MUSIC),
    hiddenEventMutationType: viewNamespace(HIDDEN_CLOUD_MUSIC),
    closeEventMutationType: viewNamespace(CLOSE_CLOUD_MUSIC),
    info: {
      logo: require("assets/icons/cloud-music.png"),
      name: '网易云音乐',
    },
  },
  components: {
    BaseAppWidget
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.cloud-music {
  @include disabled-selected;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 25px #00000085;

  .cloud-music-bd {
    @include flex-center;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>