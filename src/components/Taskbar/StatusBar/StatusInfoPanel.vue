<template>
  <div class="status-info-panel-container">
    <div class="status-info-panel">
      <img src="~assets/icons/wifi.png" class="img" />
      <img src="~assets/icons/audio3.png" class="img" />
      <img src="~assets/icons/ui/battery.png" class="img" />
    </div>
  </div>
</template>

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
      background-color: #fff;
    }

    .img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
}
</style>