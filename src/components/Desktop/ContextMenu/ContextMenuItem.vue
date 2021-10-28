<template>
  <div :class="['context-menu-item-container', item.splitLine ? 'split' : '']">
    <div class="context-menu-item">
      <div class="left">
        <img :src="item.img" class="img" />
      </div>
      <div class="middle">{{ item.name }}</div>
      <div :class="['right', item.rightIcon ? 'icon' : 'text']">
        <template v-if="item.rightIcon">
          <span :class="['iconfont', item.rightIcon]"></span>
        </template>
        <template v-else-if="!item.rightIcon && item.rightText">
         <span class="right-text">{{ item.rightText }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.context-menu-item-container {
  padding: 5px;

  &.split {
    border-bottom: 1px solid rgba(202, 197, 197, 0.952);
  }

  .context-menu-item {
    display: flex;
    align-items: center;
    padding: 5px;
    white-space: nowrap;
    border-radius: 6px;

    .left {
      flex: 1;

      .img {
        width: 14px;
        height: 14px;
      }
    }

    .middle {
      flex: 8;
      font-size: 12px;
      width: 190px;
    }

    .right {
      flex: 2;

      &.icon {
        text-align: right;
      }

      .iconfont {
        color: #777;
      }

      .right-text {
        display: inline-block;
        font-size: 10px;
        color: #999;
        transform: scale(.85);
      }
    }

    &:hover {
      background-color: #ccc4c4de;
    }
  }
}
</style>