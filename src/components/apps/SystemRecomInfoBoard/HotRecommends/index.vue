<template>
  <div class="hot-recommends">
    <div class="hd">热门资讯</div>
    <div class="bd">
      <hot-recommend-item
        v-for="item of hotRecommends"
        :key="item.id"
        :recommend-data="item"
      ></hot-recommend-item>
    </div>
  </div>
</template>

<script>
import hotRecommends from "assets/datas/hot-recommends.js";

import HotRecommendItem from "./HotRecommendItem";

export default {
  name: "HotRecommends",
  components: {
    HotRecommendItem
  },
  setup() {
    return {
      hotRecommends
    }
  },
}
</script>

<style lang="scss" scoped>
.hot-recommends {
  padding: 20px 4px 0 4px;
  margin: 20px 0 20px 0;
  background-image: linear-gradient(to right, #d4cde6, #dad3ee,  #ebe6f5);
  border-radius: 8px;
  box-shadow: $systemRecomInfoBoardItemShadow;

  .hd {
    font-weight: bold;
    padding: 0 15px;
    margin-bottom: 20px;
  }

  .bd {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>