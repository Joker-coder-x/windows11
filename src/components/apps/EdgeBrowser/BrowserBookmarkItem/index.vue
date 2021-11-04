<template>
  <div
    class="bookmark-item"
    @click="handleClick"
  >
    <img
      class="ico"
      :src="item.ico" />
    <span class="label">{{ item.label }}</span>
  </div>
</template>

<script>
export default {
  name: "BrowserBookmarkItem",
  props: {
    item: Object
  },
  setup (props, { emit }) {
    const handleClick = () => {
      emit('onClick', props.item.url)
    }

    return {
      handleClick
    };
  },
}
</script>

<style lang="scss" scoped>
.bookmark-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  margin-right: 2px;
  border-radius: 4px;
  color: #424242;
  cursor: pointer;

  &:hover {
    background-color: #DCDCDC;
  }

  .ico {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }

  .label {
    font-size: 12px;
  }
}
</style>