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