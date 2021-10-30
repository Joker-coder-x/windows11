<template>
  <div class="web-page-panel">
    <span class="iconfont icon-network"></span>
    <span class="content">请输入关键字以搜索Web</span>
  </div>
</template>

<script>
export default {
  name: 'WebPagePanel',
  setup() {
  },
}
</script>

<style lang="scss" scoped>
.web-page-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 55%;

  .iconfont {
    font-size: 5em;
    color: #777;
    margin-bottom: 20px;
  }

  .content {
    color: #333;
    font-weight: bold;
    font-size: 2em;
  }
}
</style>