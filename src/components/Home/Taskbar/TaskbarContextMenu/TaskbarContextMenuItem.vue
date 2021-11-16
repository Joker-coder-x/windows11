<template>
  <div class="taskbar-context-menu-item">
    <span :class="['iconfont', item.iconClass]"></span>
    <span class="label">{{ item.label }}</span>
  </div>
</template>

<script>
export default {
  name: 'TaskbarContextMenuItem',
  props: {
    item: Object
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.taskbar-context-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 6px;
  border-radius: 6px;
  background-color: transparent;

  &:hover {
    background-color: $taskbarContextMenuHoverColor;
  }

  .iconfont {
    font-size: 18px;
    margin-right: 6px;
  }
}
</style>