<template>
  <div :class="['task-list-item', item.builtIn ? '':  'action' ]">
    <template v-if="item.img">
      <img
        class="img"
        :src="item.img" />
    </template>
    <template v-else-if="item.iconClass">
      <span :class="['iconfont', item.iconClass]"></span>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    item: Object
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.task-list-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 5px;
  margin-right: 5px;
  border-radius: 4px;
  line-height: 26px;

  &:hover {
    background-color: rgb(255, 255, 255);
  }

  &:active {
    .iconfont, .img {
      transform: scale(.8);
      transition: .25s;
    }
  }

  .img {
    width: 23px;
    height: 23px;
  }

  .iconfont {
    font-size: 24px;
    color: #424242;
  }

  .iconfont.windows {
    color: #00ADEF;
  }
}

.task-list-item.action::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 18%;
  height: 3px;
  border-radius: 1.5px;
  background-color: #888;
  transform: translateX(-50%);
}
</style>