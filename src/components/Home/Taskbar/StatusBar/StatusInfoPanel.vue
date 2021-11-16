<template>
  <div
    class="status-info-panel-container"
    @click="handleStatusInfoPanelClick"
    @mousedown.stop
  >
    <div class="status-info-panel">
      <img src="~assets/icons/wifi.png" class="img" />
      <system-audio-icon class="img"></system-audio-icon>
      <system-battery-icon class="img"></system-battery-icon>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import SystemAudioIcon from "components/apps/SystemAudioIcon";
import SystemBatteryIcon from "components/apps/SystemBatteryIcon";

import {
  SHOW_SYSTEM_STATUS_CONTROL_BOARD,
  HIDDEN_SYSTEM_STATUS_CONTROL_BOARD
} from "store/mutation-types";

import {
  viewNamespace,
  viewNamespaceSymbol
} from "utils";

export default {
  name: "StatusInfoPanel",
  components: {
    SystemAudioIcon,
    SystemBatteryIcon
  },
  setup() {
    const store = useStore(),
          viewNamespaceState = store.state[viewNamespaceSymbol];

    const handleStatusInfoPanelClick = () => {
      viewNamespaceState.isShowSystemStatusControlBoard ?
       store.commit(viewNamespace(HIDDEN_SYSTEM_STATUS_CONTROL_BOARD)) :
       store.commit(viewNamespace(SHOW_SYSTEM_STATUS_CONTROL_BOARD));
    };

    return {
      handleStatusInfoPanelClick
    };
  },
}
</script>

<style lang="scss" scoped>
.status-info-panel-container {
  padding: 3px 0;

  .status-info-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 6px;
    border-radius: 4px;

    &:hover {
      background-color: $taskbarHoverColor;
    }

    .img {
      width: 16px;
      height: 16px;
      margin-right: 8px;

      &.iconfont {
        font-size: 14px;
      }
    }
  }
}
</style>