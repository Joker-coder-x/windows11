/**
 * 绑定事件处理程序兼容版API
 * @param {*} el
 * @param {*} type
 * @param {*} fn
 * @param {*} useCapture
 */
export function $on (el, type, fn, useCapture) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? useCapture : false;
  if (el.addEventListener) {
    $on = function (el, type, fn, useCapture){
      el.addEventListener(type, fn, useCapture);
    };
  } else if(el.attachEvent) {
    $on = function (el, type, fn){
      el.attachEvent('on' + type, function _() {
        fn.__warpperFn__ = _;
        fn.call(el);
      });
    };
  } else {
    $on = function (el, type, fn) {
      el['on' + type] = fn;
    };
  }

  $on(el, type, fn, useCapture);
}

/**
 * 移除绑定事件处理程序兼容版API
 * @param {*} el
 * @param {*} type
 * @param {*} fn
 * @param {*} useCapture
 */
export function $off (el, type, fn, useCapture) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? useCapture : false;
  if (el.removeEventListener) {
    $off = function (el, type, fn, useCapture) {
      el.removeEventListener(type, fn, useCapture);
    };
  } else if(el.detachEvent) {
    $off = function (el, type, fn) {
      el.detachEvent('on' + type, fn.__warpperFn__ ? fn.__warpperFn__ : fn);
    };
  } else {
    $off = function (el, type, fn){
      el['on' + type] = null;
    };
  }

  $off(el, type, fn, useCapture);
}

export function getStyles (elem, prop) {
  if (window.getComputedStyle) {
    return prop ? window.getComputedStyle(elem, null)[prop] : window.getComputedStyle(elem, null);
  } else {
    return prop ? elem.currentStyle[prop] : elem.currentStyle;
  }
}

/**
 *
 * document.documentElement.clientLeft/clientTop 表示文档的偏移（margin) 这两个值在IE8及以下版本的值可能会是undefined
 * 所以才需要 || 0
 *
 */
export function pagePos(e){
  var clientX = e.clientX,
      clientY= e.clientY,
      scrollPos = getScrollOffset();

  return {
      x: (clientX + scrollPos.x) - (document.documentElement.clientLeft || 0),
      y: (clientY + scrollPos.y) - (document.documentElement.clientTop || 0)
  };
}

export function getScrollOffset(){
  if(window.pageXOffset){
      return {
          x: window.pageXOffset,
          y: window.pageYOffset
      }
  }else{
      return {
          x: document.body.scrollLeft + document.documentElement.scrollLeft,
          y: document.body.scrollTop + document.documentElement.scrollTop
      }
  }
}

export function getElemDocPosition(node){
  var oParent = node.offsetParent,
      offsetLeft = node.offsetLeft,
      offsetTop = node.offsetTop;

  while(oParent){
    offsetLeft += oParent.offsetLeft;
    offsetTop  += oParent.offsetTop;
    oParent = oParent.offsetParent;
  }

  return {
    offsetLeft: offsetLeft,
    offsetTop: offsetTop
  };
}


/**
 * 获取电池状态的API
 * @notice  该API不支持IE
 * @returns {Promise}
 */
export function getBatteryManager () {
  return navigator.getBattery();
}


export function setFullScreen () {
  var elem = document.body;

  if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
  } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
  } else if (elem.requestFullScreen) {
      elem.requestFullscreen();
  } else {
    //浏览器不支持全屏API或已被禁用
    console.warn('浏览器不支持全屏API或已被禁用!!!');
  }
}