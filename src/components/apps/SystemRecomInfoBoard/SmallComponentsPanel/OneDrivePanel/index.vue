<template>
  <div class="one-drive-panel">
    <panel-header
      :logo="require('assets/icons/oneDrive.png')"
      title="照片"
    ></panel-header>
    <div class="one-drive-panel-bd">
      <span>通过从 OneDrive 应用上传照片，</span>
      <span>重温美好的记忆。</span>
    </div>
    <div class="one-drive-panel-ft">
      <a
        href="https://www.microsoft.com/zh-cn/microsoft-365/onedrive/mobile"
        class="lk"
        target="_blank"
      >获取移动应用</a>
    </div>
  </div>
</template>

<script>
import PanelHeader from "../PanelHeader";
export default {
  name: 'OneDrivePanel',
  components: {
    PanelHeader
  },
  setup() {

  },
};
</script>


<style lang="scss" scoped>
.one-drive-panel {
  margin-top: 10px;
  padding: 10px;
  background-image: linear-gradient(to bottom, #EEEFF2, #c6cde9);
  border-radius: 8px;
  box-shadow: $systemRecomInfoBoardItemShadow;
  background-image: url('~assets/icons/qzgy.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;

  &-bd {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 155px;
    font-weight: bold;
  }

  &-ft {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 0 10px 0;

    .lk {
      padding: 8px 12px;
      font-size: 14px;
      text-decoration: none;
      color: #eee;
      background-color: rgba(27, 26, 26, 0.733);
      border-radius: 4px;

      &:hover {
        background-color: rgba(58, 54, 54, 0.733);
      }
    }
  }
}
</style>