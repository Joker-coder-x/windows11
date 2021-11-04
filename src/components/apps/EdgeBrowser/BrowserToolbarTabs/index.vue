<template>
  <div class="browser-toolbar-tabs">
    <div class="browser-toolbar-tab-item">
      <div class="site-info">
        <img
          class="ico"
          src="~assets/icons/icos/bing.ico" />
        <span class="name">bing</span>
      </div>
      <div>
        <span class="iconfont icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BorwserToolbarTabs",
  setup () {

  },
}
</script>

<style lang="scss" scoped>
.browser-toolbar-tabs {
  height: 100%;

  .browser-toolbar-tab-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10vw;
    padding: 0 10px;
    background-color: #F7F7F7;
    font-size: 12px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 0 3px #aaa;

    .site-info {
      display: flex;
      align-items: center;

      .ico {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }
  }
}
</style>