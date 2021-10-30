<template>
  <div class="tabs-wrap">
    <div class="tabs-list">
      <tab-item
        v-for="(item, index) of tabsData"
        :key="index"
        :item="item"
        :index="index"
        :activeIndex="loaclActiveIndex"
        @update-active-index="handleUpdateActiveIndex"
      ></tab-item>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

import TabItem from "./TabItem.vue";

export default {
  name: 'Tabs',
  components: {
    TabItem
  },
  props: {
    tabsData: Array,
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }) {
    const loaclActiveIndex = ref(props.activeIndex);

    watch(
      () => props.activeIndex,
      (newVal) => loaclActiveIndex.value = newVal
    );
    watch(loaclActiveIndex, (newVal) => emit('updateActiveIndex', newVal));

    const handleUpdateActiveIndex = (index) => loaclActiveIndex.value = index;

    return {
      loaclActiveIndex,
      handleUpdateActiveIndex
    };
  },
}
</script>

<style lang="scss" scoped>
.tabs-wrap {
  padding: 20px 10px;
  .tabs-list {
    display: flex;
    align-items: center;
  }
}
</style>