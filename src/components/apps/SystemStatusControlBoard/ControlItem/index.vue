<template>
  <div
    :class="['control-item', item.active ? 'active' : '']"
    @click="handleItemClick"
  >
    <div class="icon-wrap">
      <img
        class="img"
        :src="item.icon" />
    </div>
    <span class="name">{{ item.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'ControlItem',
  props: {
    item: Object
  },
  emits: ['setActiveItem'],
  setup (props, { emit }) {
    const handleItemClick = () => emit('setActiveItem', props.item);

    return {
      handleItemClick
    };
  },
}
</script>

<style lang="scss" scoped>
.control-item {
  @include flex-center;
  flex-direction: column;
  width: 33%;
  margin-bottom: 16px;
  cursor: pointer;

  &.active {
    .icon-wrap {
      color: #fff;
      background-color: #005FBA;
      transition: all .25s;

      .img {
        filter: invert(1);
      }

      &:hover {
        background-color: #003F95;
        transition: all .25s;
      }

      &:active {
        background-color: #0078D7;
        transition: all .25s;
      }
    }
  }

  .icon-wrap {
    @include flex-center;
    margin-bottom: 10px;
    padding: 16px 40px;
    background-color: #fff;
    border-radius: 4px;
    border-bottom: 1px solid #999;

    &:hover {
      background-color: #f5f5f5;
    }

    &:active {
      .img {
        transition: .25s;
        transform: scale(.8);
      }
    }

    .img {
      width: 16px;
      height: 16px;
    }
  }

  .name {
    font-size: 12px;
  }
}
</style>