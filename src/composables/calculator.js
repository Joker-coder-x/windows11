import {
  computed,
  reactive,
  ref,
  unref
} from 'vue';

const CALCULATOR_STATUS = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  MATH: "MATH",
  RESULT: 'RESULT',
};

export default function useCalculatorState () {
  const valueA = ref(''),
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

  return {
    result,
    exp,
    inputFontSize,
    historyList,
    handleInputBtnClick
  };
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