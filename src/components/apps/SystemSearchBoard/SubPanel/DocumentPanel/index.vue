<template>
  <div class="document-panel">
    <span class="iconfont icon-folder"></span>
    <span class="content">请输入关键字以搜索文档</span>
  </div>
</template>

<script>
export default {
  name: 'DocumentPanel',
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.document-panel {
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