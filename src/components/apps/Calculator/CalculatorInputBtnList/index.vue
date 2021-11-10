<template>
  <div class="calculator-input-btn-list">
    <calculator-input-btn-item type="gray" ch="%" @click="handleBtnItemClick">%</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="CE" @click="handleBtnItemClick">CE</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="C" @click="handleBtnItemClick">C</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="delete" @click="handleBtnItemClick"><span class="iconfont icon-delete"></span></calculator-input-btn-item>

    <calculator-input-btn-item type="gray" ch="inv" @click="handleBtnItemClick">1/x</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="sq" @click="handleBtnItemClick">x<sup>2</sup></calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="sqrt" @click="handleBtnItemClick"><sup>2</sup>√x</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="÷" @click="handleBtnItemClick">÷</calculator-input-btn-item>

    <calculator-input-btn-item ch="7" @click="handleBtnItemClick">7</calculator-input-btn-item>
    <calculator-input-btn-item ch="8" @click="handleBtnItemClick">8</calculator-input-btn-item>
    <calculator-input-btn-item ch="9" @click="handleBtnItemClick">9</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="×" @click="handleBtnItemClick">×</calculator-input-btn-item>

    <calculator-input-btn-item ch="4" @click="handleBtnItemClick">4</calculator-input-btn-item>
    <calculator-input-btn-item ch="5" @click="handleBtnItemClick">5</calculator-input-btn-item>
    <calculator-input-btn-item ch="6" @click="handleBtnItemClick">6</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="-" @click="handleBtnItemClick">－</calculator-input-btn-item>

    <calculator-input-btn-item ch="1" @click="handleBtnItemClick">1</calculator-input-btn-item>
    <calculator-input-btn-item ch="2" @click="handleBtnItemClick">2</calculator-input-btn-item>
    <calculator-input-btn-item ch="3" @click="handleBtnItemClick">3</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="+" @click="handleBtnItemClick">＋</calculator-input-btn-item>

    <calculator-input-btn-item type="gray" ch="reverse" @click="handleBtnItemClick">+/-</calculator-input-btn-item>
    <calculator-input-btn-item ch="0" @click="handleBtnItemClick">0</calculator-input-btn-item>
    <calculator-input-btn-item type="gray" ch="." @click="handleBtnItemClick">.</calculator-input-btn-item>
    <calculator-input-btn-item type="primary" ch="equal" @click="handleBtnItemClick">＝</calculator-input-btn-item>
  </div>
</template>

<script>
import CalculatorInputBtnItem from "./CalculatorInputBtnItem";

export default {
  name: "CalculatorInputBtnList",
  components: {
    CalculatorInputBtnItem
  },
  emits: {
    click: null
  },
  setup (props, { emit }) {
    const handleBtnItemClick = (ch) => {
      emit('click', ch);
    };

    return {
      handleBtnItemClick
    };
  },
}
</script>

<style lang="scss" scoped>
.calculator-input-btn-list {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
</style>