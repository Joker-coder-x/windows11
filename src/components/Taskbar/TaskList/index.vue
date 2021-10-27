<template>
  <div class="task-list">
    <task-list-item
      v-for="(item, index) of tasks"
      :key="index"
      :item="item"
    ></task-list-item>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import TaskListItem from "./TaskListItem.vue";


export default {
  components: {
    TaskListItem,
  },
  setup() {
    const tasks = reactive([
      {
        //iconClass: 'icon-windows-fill windows',
        img: require("assets/icons/home.png"),
        name: 'windows',
        builtIn: true // 内置的
      },
      {
        iconClass: 'icon-search search',
        //img: require("assets/icons/search.png"),
        name: 'search',
        builtIn: true // 内置的
      },
      {
        img: require("assets/icons/widget.png"),
        name: 'widget',
        builtIn: true // 内置的
      },
      {
        img: require("assets/icons/settings.png"),
        name: 'setting',
        builtIn: true // 内置的
      },
      {
        img: require("assets/icons/code.png"),
        name: 'vscode'
      }
    ]);

    return {
      tasks
    };
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
  padding: 3px 5px;
  transform: translate(-50%, -50%);
}
</style>