<template>
  <div class="app-list">
    <div class="app-item">
      <img src="~assets/icons/code.png" class="app-logo" />
      <span>VsCode</span>
    </div>
      <div class="app-item">
      <img src="~assets/icons/edge.png" class="app-logo" />
      <span>Edge</span>
    </div>
      <div class="app-item">
      <img src="~assets/icons/github.png" class="app-logo" />
      <span>github</span>
    </div>
      <div class="app-item">
      <img src="~assets/icons/cloud-music.png" class="app-logo" />
      <span>网易云音乐</span>
    </div>
      <div class="app-item">
      <img src="~assets/icons/calculator.png" class="app-logo" />
      <span>计算器</span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

  },
}
</script>

<style lang="scss" scoped>
 .app-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px 0;

  .app-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 19%;
    padding: 18px;
    background-color: rgba(255, 255, 255, 0.705);
    font-size: 13px;
    border-radius: 4px;
    border: 1px solid #cdcdcd;

    .app-logo {
      width: 32px;
      height: 32px;
      margin-bottom: 8px;
    }

    &:hover {
      background-color: rgba(243, 239, 239, 0.959);
    }
  }
}
</style>