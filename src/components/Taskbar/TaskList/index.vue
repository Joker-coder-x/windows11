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
import { computed, unref} from 'vue';
import { useStore } from 'vuex';

import TaskListItem from "./TaskListItem.vue";

import { ADD_TASK } from "store/mutation-types";
import { APP_STATUS_MAP } from "utils";

export default {
  name: 'TaskList',
  components: {
    TaskListItem,
  },
  setup() {
    const store = useStore();
    const handleTaskItemClick = (task) =>{
      const curActiveTask = unref(store.getters.curActiveTask);

      if (
        curActiveTask &&
        curActiveTask.name !== task.name &&
        task.status === APP_STATUS_MAP.SHOW
      ) {
        store.commit(ADD_TASK, task);
        return;
      }

      task.handler && task.handler(store, task)
    };
    const tasks = computed(() => store.state.tasks);

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