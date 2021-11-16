<template>
  <div class="recommend-project-panel">
    <div class="recommend-project-panel-hd">
      <div class="label">推荐的项目</div>
      <div class="btn">更多<span class="iconfont icon-arrow-right"></span></div>
    </div>
    <div class="recommend-project-panel-bd">
      <recommend-project-item
        v-for="(p, index) of projects"
        :key="index"
        :project="p"
      ></recommend-project-item>
    </div>
  </div>
</template>

<script>
import RecommendProjectItem from "./RecommendProjectItem.vue";

export default {
  name: "RecommendProjectPanel",
  props: {
    projects: Array
  },
  components: {
    RecommendProjectItem
  }
}
</script>

<style lang="scss" scoped>
.recommend-project-panel {
  margin-top: 20px;

  &-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;

    .label {
      font-size: 13px;
      font-weight: bold;
      color: #222;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 2px 2px 7px;
      background-color: #f0f0f0;
      color: #424242;
      font-size: 12px;
      border-radius: 4px;
      border: 1px solid rgb(201, 199, 199);
      cursor: default;

      &:hover {
        background-color: #eceaea;
      }

      .iconfont {
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }

  &-bd {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 20px;
  }
}
</style>