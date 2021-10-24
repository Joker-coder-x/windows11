<template>
  <div class="task-list">
    <task-list-item></task-list-item>
    <task-list-item></task-list-item>
    <task-list-item></task-list-item>
    <task-list-item></task-list-item>
    <task-list-item></task-list-item>
  </div>
</template>

<script>
import TaskListItem from "./TaskListItem.vue";

export default {
  components: {
    TaskListItem,
  },
  setup() {
    
  },
}
</script>

<style lang="scss" scoped>
.task-list {
  position: absolute;
  display: flex;
  left: 50%;
  top: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
}
</style>