<template>
  <div class="stock-panel">
    <panel-header
      :logo="require('assets/icons/shares.png')"
      title="为您推荐"
    ></panel-header>
    <div class="stock-panel-list">
      <stock-panel-item
        v-for="(item, index) of stockDatas"
        :stock-data="item"
        :key="index"
      ></stock-panel-item>
    </div>
    <div class="stock-panel-ft">
      <a
        href="https://www.msn.cn/zh-cn/money"
        class="lk"
        target="_blank"
      >前往详细列表</a>
    </div>
  </div>
</template>

<script>
import PanelHeader from "../PanelHeader";
import StockPanelItem from "./StockPanelItem";

const stockDatas = [
  {
    code: "600519",
    name: "贵州茅台",
    cur_price: "1299.00",
    change: -9.99
  },
  {
    code: "600809",
    name: "山西汾酒",
    cur_price: "269.00",
    change: -9.99
  },
];

export default {
  name: 'StockPanel',
  components: {
    PanelHeader,
    StockPanelItem
  },
  setup() {
    return {
      stockDatas
    };
  },
}
</script>

<style lang="scss" scoped>
.stock-panel {
  padding: 10px;
  border-radius: 8px;
  background-color: #eee;
  box-shadow: $systemRecomInfoBoardItemShadow;

  .stock-panel-list {
    padding: 16px 0;
  }

  .stock-panel-ft {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;

    .lk {
      text-decoration: none;
      font-size: 14px;
      color: #2980b9;
    }
  }
}
</style>