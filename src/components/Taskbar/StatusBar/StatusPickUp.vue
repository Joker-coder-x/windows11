<template>
  <div class="pick-up">
    <span class="iconfont icon-arrow-up"></span>
  </div>
</template>

<style lang="scss" scoped>
.pick-up {
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: $taskbarHoverColor;
  }

  .iconfont {
    font-size: 25px;
    color: #424242;
  }
}
</style>