<template>
  <div class="app-list-panel">
    <div class="app-list-panel-hd">
      <div class="label">已固定</div>
      <div class="btn">所有应用<span class="iconfont icon-arrow-right"></span></div>
    </div>
    <div class="app-list-panel-bd">
      <app-list-item
        v-for="(item, index) of apps"
        :key="index"
        :app="item"
      ></app-list-item>
    </div>
  </div>
</template>

<script>
import AppListItem from "./AppListItem.vue";

export default {
  components: {
    AppListItem
  },
  props: {
    apps: Array
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.app-list-panel {
  padding: 30px 0 10px 0;

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
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>