<template>
  <div class="small-components-panel">
    <div class="left">
      <weather-panel></weather-panel>
      <nba-panel></nba-panel>
    </div>
    <div class="right">
      <stock-panel></stock-panel>
      <one-drive-panel></one-drive-panel>
    </div>
  </div>
</template>

<script>
import WeatherPanel from "./WeatherPanel";
import StockPanel from "./StockPanel";
import NbaPanel from "./NbaPanel";
import OneDrivePanel from "./OneDrivePanel";

export default {
  name: 'SmallComponentsPanel',
  components: {
    WeatherPanel,
    StockPanel,
    NbaPanel,
    OneDrivePanel
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.small-components-panel {
  display: flex;
  justify-content: space-between;

  .left {
    width: 49%;
  }

  .right {
    width: 49%;
  }
}
</style>