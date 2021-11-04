<template>
  <div
    class="false-input"
    @click="handleFalseInputClick"
  >
    <span class="iconfont icon-search"></span>
    <span class="placeholder">在此键入已搜索</span>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import { SHOW_SYSTEM_SEARCH_BOARD } from "store/mutation-types";

export default {
  name: 'FalseInput',
  setup () {
    const store = useStore();
    const handleFalseInputClick = () => {
      store.commit(SHOW_SYSTEM_SEARCH_BOARD);
    };

    return {
      handleFalseInputClick
    };
  },
}
</script>

<style lang="scss" scoped>
.false-input {
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 12px;
  color: #666;
  font-size: 13px;
  background-color: rgba(243, 241, 241, 0.932);
  border-radius: 6px;
  border: 2px solid rgb(207, 203, 203);
  border-bottom: 2px solid #0f73d1;

  .iconfont {
    padding-right: 10px;
  }
}
</style>