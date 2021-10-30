<template>
  <div class="lately-list">
    <div class="lately-item">
      <img src="~assets/icons/calculator.png" class="lately-item-img" />
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
.lately-list {
  padding-top: 10px;
  overflow-y: hidden;
  .lately-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px;
    border-radius: 4px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.932);
    }

    &-img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
</style>