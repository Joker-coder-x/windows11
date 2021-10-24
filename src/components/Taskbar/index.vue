<template>
  <div class="taskbar">
    <status-bar></status-bar>
    <task-list></task-list>
  </div>
</template>

<script>
import StatusBar from "./StatusBar/index.vue";
import TaskList from "./TaskList/index.vue";

export default {
  components: {
    StatusBar,
    TaskList
  },
  setup() {
    
  },
}
</script>

<style lang="scss">
.taskbar {
  position: relative;
  height: $taskbarHeight;
  border: 1px solid $taskbarBorderColor;
  background-color: $taskbarBgColor;
  box-sizing: border-box;
}
</style>