<template>
  <div class="footer-panel">
    <div class="account-wrap">
      <img src="~assets/images/xifan.jpg" class="img" />
      <span>稀饭</span>
    </div>
    <div class="btn-shutdown">
      <span class="iconfont icon-shut-down"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterPanel',
  setup() {

  },
}
</script>

<style lang="scss" scoped>
$bgColor: #ebe6e6a1;
$hoverColor: rgba(255, 255, 255, 0.733);

.footer-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin: 0 -25px;
  padding: 0 8%;
  background-color: $bgColor;
  color: #333;
  border-radius: 8px;
  border-top: 1px solid #bbb;

  .account-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 4px;

    &:hover {
      background-color: $hoverColor;
    }

    .img {
      width: 30px;
      height: 30px;
      margin-right: 12px;
      border-radius: 50%;
    }
  }

  .btn-shutdown {
    padding: 10px;
    border-radius: 4px;
    line-height: 18px;

    &:hover {
      background-color: $hoverColor;
    }

    .iconfont {
      font-size: 18px;
    }
  }
}
</style>