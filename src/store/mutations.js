export default {
  setAppItemSize (state, sizeInfo) {
    state.appGridLayoutItemWidth = sizeInfo.width;
    state.appGridLayoutItemHeight = sizeInfo.height;
  }
}