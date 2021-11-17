<template>
  <base-app-widget
    :show="isShowCalculator"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="calculator"
    width="21vw"
    height="70vh"
    toolbar-bg-color="#f3f3f3"
    toolbar-text-color="#424242"
    toolbar-operate-panel-icon-color="black"
    toolbar-operate-panel-hover-color="#DBDBDB"
    @mousedown.stop
  >
    <div class="calculator-bd">
      <div class="calculator-type">
        <span class="iconfont icon-classification"></span>
        <span class="label">标准</span>
      </div>
      <div class="computed-view-area">
        <div class="expression-area">{{ exp }}</div>
        <div
          class="result-area"
          :style="{ fontSize: inputFontSize}"
        >
          {{ result }}
        </div>
      </div>
      <div class="labels">
        <div class="label-item disabled">MC</div>
        <div class="label-item disabled">MR</div>
        <div class="label-item">M+</div>
        <div class="label-item">M-</div>
        <div class="label-item">MS</div>
        <div class="label-item disabled">M<span class="iconfont icon-arrow-down"></span> </div>
      </div>
      <div class="input-area">
        <calculator-input-btn-list @click="handleInputBtnClick"></calculator-input-btn-list>
      </div>
      <div class="history-container">
        <div>历史记录</div>
        <calculator-history-list :history-list="historyList"></calculator-history-list>
      </div>
    </div>
  </base-app-widget>
</template>

<script>
import { useStore } from 'vuex';

import {
  SHOW_CALCULATOR,
  HIDDEN_CALCULATOR,
  CLOSE_CALCULATOR
} from "store/mutation-types";
import { viewNamespace } from "utils";
import useCalculatorState from "composables/calculator";

import BaseAppWidget from "../BaseAppWidget";
import CalculatorInputBtnList from "./CalculatorInputBtnList";
import CalculatorHistoryList from "./CalculatorHistoryList";

export default {
  name: "Calculator",
  _appConfig: {
    storeControlPropName: "isShowCalculator",
    showEventMutationType: viewNamespace(SHOW_CALCULATOR),
    hiddenEventMutationType: viewNamespace(HIDDEN_CALCULATOR),
    closeEventMutationType: viewNamespace(CLOSE_CALCULATOR),
    info: {
      logo: require("assets/icons/calculator.png"),
      name: '计算器',
    },
  },
  components: {
    BaseAppWidget,
    CalculatorInputBtnList,
    CalculatorHistoryList
  },
  setup () {
    const store = useStore();
    const {
      result,
      exp,
      inputFontSize,
      historyList,
      handleInputBtnClick
    } = useCalculatorState();

    return {
      result,
      exp,
      inputFontSize,
      historyList,
      handleInputBtnClick
    };
  },
}
</script>


<style lang="scss" scoped>
.calculator {
  @include disabled-selected;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 25px #00000085;

  &.full {
    .calculator-bd  {
      padding-right: 22%;

      .history-container {
        top: 0;
        right: 0;
        display: block;
        width: 22%;
      }
    }
  }
}

.calculator-bd {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;

  .calculator-type {
    padding: 18px 15px;
    font-size: 19px;

    .iconfont {
      margin-right: 1em;
      font-weight: bold;
    }
  }

  .labels {
    display: flex;
    padding: 10px 0;
    font-size: 13px;

    .label-item {
      @include flex-center;
      flex: auto;

      &.disabled {
        color: #999;
      }
    }
  }

  .computed-view-area {
    padding: 10px;
    text-align: right;

    .expression-area {
      height: 20px;
      font-size: 13px;
      color: #777;
    }

    .result-area {
      font-weight: bold;
      font-size: 2.5em;
      word-break: keep-all;
    }
  }

  .input-area {
    flex: auto;
  }

  .history-container {
    display: none;
    position: absolute;
    height: 100%;
    padding: 10px;
  }
}
</style>