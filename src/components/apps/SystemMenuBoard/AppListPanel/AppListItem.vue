<template>
  <div class="app-list-item">
    <img :src="app.img"  class="img"/>
    <span class="name">{{ app.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'AppListItem',
  props: {
    app: Object
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.app-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 16.6%;
  padding: 10px;

  &:hover {
    background-color: rgb(236, 233, 233);
    border-radius: 8px;
  }

  .img {
    width: 26px;
    height: 26px;
    margin-bottom: 8px;
  }

  .name {
    display: inline-block;
    font-size: 10px;
    transform: scale(.9);
  }
}
</style>