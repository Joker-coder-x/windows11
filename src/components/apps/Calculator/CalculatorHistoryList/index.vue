<template>
  <div class="calculator-history-list">
    <div
      v-for="(item, index) of historyList"
      :key="index"
      class="calculator-history-item"
    >
      <div class="exp">{{ item.exp }}</div>
      <div class="result">{{ item.result }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatorHistoryList",
  props: {
    historyList: Array
  },
  setup (props) {

  },
}
</script>

<style lang="scss" scoped>
.calculator-history-list {
  @include no-scroll;
  overflow: auto;
  height: 100%;
  padding: 10px 0;
  text-align: right;

  .calculator-history-item {
    padding: 10px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    border-radius: 4px;

    &:hover {
      background-color: #EAEAEA;
    }

    .exp {
      margin-bottom: 8px;
      font-size: 13px;
      color: #999;
    }

    .result {

    }
  }
}
</style>