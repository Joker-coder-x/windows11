<template>
  <div
    :class="[
      'task-list-item', item.builtIn ? '':  'action', item.active ? 'active' : '']"
    @click="handleTaskItemClick"
    @mousedown.stop
  >
    <template v-if="item.logo">
      <img
        class="img"
        :src="item.logo" />
    </template>
    <template v-else-if="item.iconClass">
      <span :class="['iconfont', item.iconClass]"></span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TaskListItem',
  props:{
    item: Object
  },
  emits: {
    taskItemClick: null
  },
  setup (props, { emit }) {
    const handleTaskItemClick = () => {
      emit('taskItemClick', props.item);
    };

    return {
      handleTaskItemClick
    };
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
    background-color: $taskbarHoverColor;
  }

  &:active {
    .iconfont, .img {
      transform: scale(.8);
      transition: .25s;
    }
  }

  &.action::after {
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

  &.active.action::after {
    width: 40%;
    background-color: #0078D7;
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
</style>