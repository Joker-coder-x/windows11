<template>
  <div
    class="status-info-panel-container"
    @click="handleStatusInfoPanelClick"
    @mousedown.stop
  >
    <div class="status-info-panel">
      <img src="~assets/icons/wifi.png" class="img" />
      <system-audio-icon class="img"></system-audio-icon>
      <img src="~assets/icons/ui/battery.png" class="img" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import SystemAudioIcon from "../../apps/SystemAudioIcon";

import {
  SHOW_SYSTEM_STATUS_CONTROL_BOARD,
  HIDDEN_SYSTEM_STATUS_CONTROL_BOARD
} from "store/mutation-types";

export default {
  name: "StatusInfoPanel",
  components: {
    SystemAudioIcon
  },
  setup() {
    const store = useStore();
    const handleStatusInfoPanelClick = () => {
      store.state.isShowSystemStatusControlBoard ?
       store.commit(HIDDEN_SYSTEM_STATUS_CONTROL_BOARD) :
       store.commit(SHOW_SYSTEM_STATUS_CONTROL_BOARD);
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
    }
  }
}
</style>