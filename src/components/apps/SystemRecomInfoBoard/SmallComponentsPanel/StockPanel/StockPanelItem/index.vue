<template>
  <div class="stock-panel-item">
    <div class="name-info">
      <span class="code">{{ stockData.code }}</span>
      <span class="name">{{ stockData.name }}</span>
    </div>
    <div class="price-info">
      <span class="price">{{ stockData.cur_price }}</span>
      <span class="rate green">{{ stockData.change }}%</span>
      <span class="iconfont icon-plus-circle"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockPanelItem',
  props: {
    stockData: Object
  }
};
</script>

<style lang="scss" scoped>
.stock-panel-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #ddd;
  }

  .name-info {
    display: flex;
    flex-direction: column;
    font-size: 12px;

    .code {
      font-size: 13.5px;
      margin-bottom: 3px;
    }

    .name {
      color: #666;
    }
  }

  .price-info {
    display: flex;
    align-items: center;

    .rate {
      padding: 3px 6px;
      color: #fff;
      border-radius: 2px;
      font-weight: bold;
      font-size: 12px;
      margin-right: 10px;
      margin-left: 20px;

      &.green {
        background-color: #09D031;

      }

      &.red {
        background-color: red;
      }
    }

    .iconfont {
      color: #666;
      font-size: 16px;

      &:hover {
        color: #3498db;
      }
    }
  }
}
</style>