import {
  getElemDocPosition,
  getStyles,
  pagePos
} from "../utils";

export function getDesktopContextMenuBehavior (store, desktopRef, contextMenuRef) {
  const handleShowContextMenu = (e) => {
    e = e || window.event;
    e.preventDefault();
    store.commit('showDesktopContextMenu', computedElementShowPos(e, contextMenuRef.value.$el, desktopRef.value));
  }

  const handleHiddenContextMenu = (e) => {
    e = e || window.event;
    if (!contextMenuRef.value.$el.contains(e.target)) {
      store.commit('hiddenDesktopContextMenu');
    }
  };

  return {
    handleShowContextMenu,
    handleHiddenContextMenu
  };
};

export function getTaskbarContextMenuBehavior (store, tarbarRef, contextMenuRef) {
  const handleShowContextMenu = (e) => {
    e = e || window.event;
    e.preventDefault();
    store.commit('showTaskbarContextMenu', computedElementShowPos(e, contextMenuRef.value.$el, tarbarRef.value));
  }

  const handleHiddenContextMenu = (e) => {
    e = e || window.event;
    if (!contextMenuRef.value.$el.contains(e.target)) {
      store.commit('hiddenTaskbarContextMenu');
    }
  };

  return {
    handleShowContextMenu,
    handleHiddenContextMenu
  };
}


/**
 * 控制某个元素在某个元素中显示不溢出
 * @param {MouseEvent} e
 * @param {Element} elem
 * @param {Element} container
 */
function computedElementShowPos(e, elem, container){
  var elemWidth = parseInt(getStyles(elem, 'width')),
      elemHeight = parseInt(getStyles(elem, 'height')),
      containerWidth = parseInt(getStyles(container, 'width')),
      containerHeight = parseInt(getStyles(container, 'height')),
      containerOffsetPos = getElemDocPosition(container),
      containerOffsetLeft = containerOffsetPos.offsetLeft || 0,
      containerOffsetTop = containerOffsetPos.offsetTop || 0,
      containerScrollWidth = containerOffsetLeft + containerWidth,
      containerScrollHeight = containerOffsetTop + containerHeight,
      pos = pagePos(e),
      oLeft = pos.x,
      oTop = pos.y;

  if(oLeft <= containerOffsetLeft){
      oLeft = containerOffsetLeft;
  }else if(oLeft + elemWidth > (containerOffsetLeft + containerWidth)){
      oLeft = containerScrollWidth - elemWidth;
  }

  if(oTop <= containerOffsetTop){
      oTop = containerOffsetTop;
  }else if(oTop + elemHeight > (containerOffsetTop + containerHeight)){
      oTop = containerScrollHeight - elemHeight;
  }

  return {
      x: oLeft,
      y: oTop
  };
}