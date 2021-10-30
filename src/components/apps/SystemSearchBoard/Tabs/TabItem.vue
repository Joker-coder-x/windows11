<template>
  <div
    :class="['tab-item', isActive ? 'active' : '']"
    @click="handleTabItemClick"
  >
    <span>{{ item.label }}</span>
  </div>
</template>


<script>
import { computed } from 'vue';

export default {
  name: 'TabItem',
  props: {
    item: Object,
    index: Number,
    activeIndex: Number
  },
  emits: ['updateActiveIndex'],
  setup (props, { emit }) {
    const handleTabItemClick = () => emit('updateActiveIndex', props.index);
    const isActive = computed(() => props.index === props.activeIndex);

    return {
      isActive,
      handleTabItemClick
    };
  },
}
</script>

<style lang="scss" scoped>
.tab-item {
  position: relative;
  padding: 10px;
  margin-right: 1.2em;
  font-size: 14px;
  color: #666;

  &.active {
    color: #333;
  }

  &.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 20%;
    height: 3px;
    background-color: #196EC0;
    border-radius: 1.5px;
    transform: translateX(-50%);
  }
}
</style>