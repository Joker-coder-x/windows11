<template>
  <transition name="scale-slide">
    <base-app-widget
      v-if="isShowCalculator"
      :class="['calculator', appIsActive ? 'active' : '']"
      name="计算器"
      width="21vw"
      height="70vh"
      :icon="require('assets/icons/calculator.png')"
      toolbar-bg-color="#f3f3f3"
      toolbar-text-color="#424242"
      toolbar-operate-panel-icon-color="black"
      toolbar-operate-panel-hover-color="#DBDBDB"
      @on-minimize="handleMinimize"
      @on-close="handleClose"
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
  </transition>
</template>

<script>
import {
  computed,
  reactive,
  ref,
  unref,
  watch
} from 'vue';
import { useStore } from 'vuex';

import {
  SHOW_CALCULATOR,
  HIDDEN_CALCULATOR,
  CLOSE_CALCULATOR
} from "store/mutation-types";

import BaseAppWidget from "../BaseAppWidget";
import CalculatorInputBtnList from "./CalculatorInputBtnList";
import CalculatorHistoryList from "./CalculatorHistoryList";

const CALCULATOR_STATUS = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  MATH: "MATH",
  RESULT: 'RESULT',
};

export default {
  name: "Calculator",
  _appConfig: {
    storeControlPropName: "isShowCalculator",
    info: {
      logo: require("assets/icons/calculator.png"),
      name: '计算器',
      handler: (store) => {
        store.getters.isShowCalculator ?
          store.commit(HIDDEN_CALCULATOR) :
          store.commit(SHOW_CALCULATOR);
      }
    },
  },
  components: {
    BaseAppWidget,
    CalculatorInputBtnList,
    CalculatorHistoryList
  },
  setup () {
    const store = useStore(),
          valueA = ref(''),
          valueB = ref(''),
          sign = ref(''),
          curInputOperator = ref(CALCULATOR_STATUS.LEFT),
          calculatorState = ref(CALCULATOR_STATUS.LEFT),
          mathLabel = ref(''),
          mathValue = ref(0),
          historyList = reactive([]);

    const result = computed(() => {
      let _result = '';
      switch (calculatorState.value) {
        case CALCULATOR_STATUS.LEFT :
          _result = valueA.value || 0;
          break;
        case CALCULATOR_STATUS.RIGHT :
          _result = valueB.value || 0;
          break;
        case CALCULATOR_STATUS.RESULT :
          _result = parseExpression(unref(valueA), unref(sign), unref(valueB)) || 0;
          historyList.push({
            exp: exp.value,
            result: resolveResult(_result)
          });
          break;
        case CALCULATOR_STATUS.MATH :
          _result = mathValue.value || 0;
          historyList.push({
            exp: exp.value,
            result: resolveResult(_result)
          });
          break;
        default:
          _result = '无效的输入';
          break;
      }

      return resolveResult(_result);
    });
    const exp = computed(() => {
      switch (calculatorState.value) {
        case CALCULATOR_STATUS.LEFT :
          return '';
        case CALCULATOR_STATUS.RIGHT :
          return `${valueA.value || 0} ${sign.value}`;
        case CALCULATOR_STATUS.RESULT :
          return  `${valueA.value || 0} ${sign.value} ${valueB.value || 0} = `;
        case CALCULATOR_STATUS.MATH :
          return mathLabel.value;
        default:
          return '';
      }
    });
    const inputFontSize = computed(() => {
      const str = result.value;

      if (str.length <= 10) {
        return "2.5em"
      } else if (str.length === 11) {
        return "2.35em";
      } else if (str.length === 12) {
        return "2.25em";
      } else if (str.length === 13) {
        return "2.15em";
      } else if (str.length > 13) {
        return "2em";
      }
    });

    const handleInputBtnClick = (ch) => {
      parseInputChar(
        ch,
        valueA,
        valueB,
        sign,
        curInputOperator,
        calculatorState,
        mathLabel,
        mathValue
      );
    };
    const handleMinimize = () => store.commit(HIDDEN_CALCULATOR);
    const handleClose = () => store.commit(CLOSE_CALCULATOR);

    return {
      result,
      exp,
      inputFontSize,
      historyList,
      handleMinimize,
      handleClose,
      handleInputBtnClick
    };
  },
}

function parseExpression (a, s, b) {
  a = parseNumber(a);
  b = parseNumber(b);

  switch (s) {
    case '+' :
      return a + b;
    case '-' :
      return a - b;
    case '×' :
      return a * b;
    case '÷' :
      return b == 0 ? '除数不能为零' : a / b;
    case '' :
      return a;
    default:
      return '无效的表达式';
  }
}

function getCurInputValueRef (valueA, valueB, curInputOperator) {
  return curInputOperator.value === CALCULATOR_STATUS.LEFT ? valueA : valueB;
}

function parseInputChar (ch, valueA, valueB, sign, curInputOperator, calculatorState, mathLabel, mathValue) {
  // 数字
  if (/^(\d|\.)$/.test(ch)) {
    handleInputNum(ch, valueA, valueB, curInputOperator, calculatorState);
  } else if (/^(\+|\-|÷|×)$/.test(ch)) {
    sign.value = ch;
    curInputOperator.value = calculatorState.value = CALCULATOR_STATUS.RIGHT;
    valueB.value = '';
  } else if (ch === 'equal') {
    calculatorState.value = CALCULATOR_STATUS.RESULT;
  } else if (/^(inv|sq|sqrt)$/.test(ch)) {
    handleMathFn(ch, valueA, calculatorState, mathLabel, mathValue);
  } else {
    switch (ch.toLowerCase()) {
      case 'delete' :
        handleDeleteChar(valueA, valueB, curInputOperator);
        break;
      case '%' :
      case 'ce' :
      case 'c' :
        handleClearAllInput(valueA, valueB, sign, curInputOperator, calculatorState);
        break;
      case 'reverse' :
        handleNumberRevserse(valueA, valueB, curInputOperator);
        break;
    }
  }
}

function handleMathFn (ch, valueA, calculatorState, mathLabel, mathValue) {
  calculatorState.value = CALCULATOR_STATUS.MATH;
  const num = parseNumber(valueA.value);

  switch (ch) {
    case 'inv' :
      mathValue.value = 1 / num;
      mathLabel.value = `1/(${num})`;
      break;
    case 'sq' :
      mathValue.value = Math.pow(num, 2);
      mathLabel.value = `sqr(${num})`;
      break;
    case 'sqrt' :
      mathValue.value = Math.sqrt(num);
      mathLabel.value = `sqrt(${num})`;
      break;
  }
}

function handleNumberRevserse (valueA, valueB, curInputOperator) {
  const curValue = getCurInputValueRef(valueA, valueB, curInputOperator),
        str = curValue.value;

  curValue.value = str[0] === '-' ? str.slice(1) : '-' + str;
}

function handleInputNum (ch, valueA, valueB, curInputOperator, calculatorState) {
  if (calculatorState.value === CALCULATOR_STATUS.RESULT || calculatorState.value === CALCULATOR_STATUS.MATH) {
    curInputOperator.value = calculatorState.value = CALCULATOR_STATUS.LEFT;
    valueA.value = '';
  }

  switch (curInputOperator.value) {
    case CALCULATOR_STATUS.LEFT :
      (ch === '.' && hasDot(valueA.value)) || (valueA.value = '' + valueA.value + ch);
      break;
    case CALCULATOR_STATUS.RIGHT :
      (ch === '.' && hasDot(valueB.value)) || (valueB.value = '' + valueB.value + ch);
    default:
      break;
  }
}

function handleDeleteChar (valueA, valueB, curInputOperator) {
  const chars = getCurInputValueRef(valueA, valueB, curInputOperator).value.toString();

  if (chars.length) {
    getCurInputValueRef(valueA, valueB, curInputOperator).value = chars.slice(0, chars.length - 1);
  }
}

function handleClearAllInput (valueA, valueB, sign, curInputOperator, calculatorState) {
  valueA.value = '';
  valueB.value = '';
  sign.value = '';
  curInputOperator.value = CALCULATOR_STATUS.LEFT;
  calculatorState.value = CALCULATOR_STATUS.LEFT;
}

function parseNumber (val) {
  if (val.toString().indexOf('.') !== -1) {
    return parseFloat(val);
  } else {
    return Number(val);
  }
}

function hasDot (val) {
  return val.toString().indexOf('.') !== -1;
}

function resolveResult (result) {
  return String(result).replace(/(?=\B(\d{3})+$)/g, ',');
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

.scale-slide-enter-active {
  animation: scale-slide .25s reverse;
}

.scale-slide-leave-active {
  animation: scale-slide .25s;
}
</style>