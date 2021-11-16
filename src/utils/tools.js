export function isObject (obj) {
  return obj !== null && typeof(obj) === 'object';
}

export function hasOwnProp (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function $once (cb) {
  var isCall = false;
  return function () {
    if (!isCall) {
      isCall = true;
      cb && cb.apply(this, arguments);
    }
  }
}

// 前导零填充
export function leadingZeroFill (num, targetNum = 10) {
  return num < targetNum ? '0' + num : num;
}