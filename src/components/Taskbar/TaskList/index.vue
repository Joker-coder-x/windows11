<template>
  <div class="task-list">
    <task-list-item
      v-for="(item, index) of tasks"
      :key="index"
      :item="item"
      @task-item-click="handleTaskItemClick"
    ></task-list-item>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import TaskListItem from "./TaskListItem.vue";

const tasks = [
  {
    img: require("assets/icons/home.png"),
    name: 'windows',
    builtIn: true, // 内置的,
    handler: (store) => {
      store.state.isShowSystemMenuBoard ?
        store.commit('hiddenSystemMenuBoard') :
        store.commit('showSystemMenuBoard');
    }
  },
  {
    iconClass: 'icon-search search',
    name: 'search',
    builtIn: true, // 内置的
    handler: (store) => {
      store.state.isShowSystemSearchBoard ?
        store.commit('hiddenSystemSearchBoard') :
        store.commit('showSystemSearchBoard');
    }
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
];

export default {
  name: 'TaskList',
  components: {
    TaskListItem,
  },
  setup() {
    const store = useStore();
    const handleTaskItemClick = (taskInfo) => taskInfo.handler && taskInfo.handler(store);

    return {
      tasks,
      handleTaskItemClick
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