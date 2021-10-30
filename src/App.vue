<template>
  <div
    class="app"
    id="app"
    @mousedown=" handleAppMouseDown"
  >
    <router-view />
  </div>
</template>


<script>
import { useStore } from 'vuex';

import {
  HIDDEN_ALL_NOT_CONTEXT_MENU_BOARD,
  HIDDEN_ALL_SINGLE_BOARD
} from "store/mutation-types";

export default {
  setup() {
    const store = useStore();
    const handleAppMouseDown = (e) => {
      e = e || window.event;
      e.button === 2 ?
        store.commit(HIDDEN_ALL_NOT_CONTEXT_MENU_BOARD) :
        store.commit(HIDDEN_ALL_SINGLE_BOARD);
    }

    return {
       handleAppMouseDown
    };
  },
}
</script>


