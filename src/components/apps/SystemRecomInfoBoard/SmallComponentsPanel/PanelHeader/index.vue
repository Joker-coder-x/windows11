<template>
    <div class="panel-header">
      <div class="logo">
        <img
          :src="logo"
          class="img" />
        <span class="name">{{ title }}</span>
      </div>
      <div class="more">
        <span class="iconfont icon-more"></span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PanelHeader',
  props: {
    title: String,
    logo: String
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .logo {
    .img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    .name {
      vertical-align: 2.5px;
      font-size: 13px;
    }
  }
}
</style>