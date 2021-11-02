export function $once (cb) {
  var isCall = false;
  return function () {
    if (!isCall) {
      isCall = true;
      cb && cb.apply(this, arguments);
    }
  }
}