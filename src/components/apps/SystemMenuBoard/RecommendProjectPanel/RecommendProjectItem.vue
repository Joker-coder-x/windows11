<template>
  <div class="recommend-project-item">
    <img :src="project.img" class="img" />
    <span class="name">{{ project.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    project: Object
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.recommend-project-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  padding: 10px;
  font-size: 12px;

  &:hover {
    background-color: rgb(236, 233, 233);
    border-radius: 8px;
  }

  .img {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
}
</style>