export default {
  setAppItemSize (state, sizeInfo) {
    state.appGridLayoutItemWidth = sizeInfo.width;
    state.appGridLayoutItemHeight = sizeInfo.height;
  },

  showDesktopContextMenu (state, pos) {
    this.commit('hiddenTaskbarContextMenu');

    state.isShowDesktopContextMenu = true;
    state.desktopContextMenuPosX = pos.x || 0;
    state.desktopContextMenuPosY = pos.y || 0;
  },

  hiddenDesktopContextMenu (state) {
    state.isShowDesktopContextMenu = false;
  },

  showTaskbarContextMenu (state, pos) {
    this.commit('hiddenDesktopContextMenu');

    state.isShowTaskbarContextMenu = true;
    state.taskbarContextMenuPosX = pos.x || 0;
    state.taskbarContextMenuPosY = pos.y || 0;
  },

  hiddenTaskbarContextMenu (state) {
    state.isShowTaskbarContextMenu = false;
  },

  showSystemMenuBoard (state) {
    state.isShowSystemMenuBoard = true;
  },

  hiddenSystemMenuBoard (state) {
    state.isShowSystemMenuBoard = false;
  }
}