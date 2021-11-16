import config from "@/config";
import {
  APP_STATUS_MAP,
  taskNamespace
} from "utils";

import {
  ADD_TASK,
  SET_TASK_ACTIVE,
  DELETE_TASK_ACTIVE,
  REMOVE_TASK
} from "store/mutation-types";

const state = () => ({
  tasks: config.tasks.map(item => ({...item , active: false})),
});

const mutations = {
  [ADD_TASK] (state, payload) {
    const tasks = state.tasks,
          isFind = tasks.find(t => t.name === payload.name);

    if (!isFind) {
      tasks.push(payload);
    }

    this.commit(taskNamespace(SET_TASK_ACTIVE), payload.name);
  },

  [SET_TASK_ACTIVE] (state, taskName) {
    const tasks = state.tasks;
    tasks.map(t => t.active = false);
    const idx = tasks.findIndex(t => t.name === taskName);

    if (idx !== -1) {
      tasks.splice(idx, 1, { ...tasks[idx], active: true, status: APP_STATUS_MAP.SHOW });
    }
  },

  [DELETE_TASK_ACTIVE] (state, payload) {
    const tasks = state.tasks,
          idx = tasks.findIndex(t => t.name === payload.name);

    if (idx !== -1) {
      tasks.splice(idx, 1, payload);
    }
  },

  [REMOVE_TASK] (state, taskName) {
    state.tasks = state.tasks.filter(t => t.name !== taskName);
  },
};

const getters = {
  curActiveTask (state) {
    return state.tasks.find(t => t.active === true);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};