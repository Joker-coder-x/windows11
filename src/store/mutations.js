import {
  HIDDEN_ALL_NOT_CONTEXT_MENU_BOARD,
  HIDDEN_ALL_SINGLE_BOARD,
  HIDDEN_DESKTOP_CONTEXT_MENU,
  HIDDEN_SYSTEM_MENU_BOARD,
  HIDDEN_SYSTEM_RECOM_INFO_BOARD,
  HIDDEN_SYSTEM_SEARCH_BOARD,
  HIDDEN_SYSTEM_STATUS_CONTROL_BOARD,
  HIDDEN_TASKBAR_CONTEXT_MENU,
  SET_APP_ITEM_SIZE,
  SET_AUDIO_VALUE,
  SET_LIGHT_VALUE,
  SET_EYE_CARE_MODE,
  SHOW_DESKTOP_CONTEXT_MENU,
  SHOW_SYSTEM_MENU_BOARD,
  SHOW_SYSTEM_RECOM_INFO_BOARD,
  SHOW_SYSTEM_SEARCH_BOARD,
  SHOW_SYSTEM_STATUS_CONTROL_BOARD,
  SHOW_TASKBAR_CONTEXT_MENU,
} from "./mutation-types";

export default {
  // 设置桌面图标大小
  [SET_APP_ITEM_SIZE] (state, sizeInfo) {
    state.appGridLayoutItemWidth = sizeInfo.width;
    state.appGridLayoutItemHeight = sizeInfo.height;
  },

  // 设置亮度
  [SET_LIGHT_VALUE] (state, value) {
    state.lightValue = value < 10 ? 10 : value;
  },

  // 设置音量
  [SET_AUDIO_VALUE] (state, value) {
    state.audioValue = value;
  },

  // 设置护眼模式
  [SET_EYE_CARE_MODE] (state, value) {
    state.eyeCareMode = value;
  },

  [SHOW_DESKTOP_CONTEXT_MENU] (state, pos) {
    this.commit(HIDDEN_ALL_SINGLE_BOARD);

    state.isShowDesktopContextMenu = true;
    state.desktopContextMenuPosX = pos.x || 0;
    state.desktopContextMenuPosY = pos.y || 0;
  },

  [HIDDEN_DESKTOP_CONTEXT_MENU] (state) {
    state.isShowDesktopContextMenu = false;
  },

  [SHOW_TASKBAR_CONTEXT_MENU] (state, pos) {
    this.commit(HIDDEN_DESKTOP_CONTEXT_MENU);

    state.isShowTaskbarContextMenu = true;
    state.taskbarContextMenuPosX = pos.x || 0;
    state.taskbarContextMenuPosY = pos.y || 0;
  },

  [HIDDEN_TASKBAR_CONTEXT_MENU] (state) {
    state.isShowTaskbarContextMenu = false;
  },

  [SHOW_SYSTEM_MENU_BOARD] (state) {
    this.commit(HIDDEN_ALL_SINGLE_BOARD);
    state.isShowSystemMenuBoard = true;
  },

  [HIDDEN_SYSTEM_MENU_BOARD] (state) {
    state.isShowSystemMenuBoard = false;
  },

  [SHOW_SYSTEM_SEARCH_BOARD] (state) {
    this.commit(HIDDEN_ALL_SINGLE_BOARD);
    state.isShowSystemSearchBoard = true;
  },

  [HIDDEN_SYSTEM_SEARCH_BOARD] (state) {
    state.isShowSystemSearchBoard = false;
  },

  [SHOW_SYSTEM_RECOM_INFO_BOARD] (state) {
    this.commit(HIDDEN_ALL_SINGLE_BOARD);
    state.isShowSystemRecomInfoBoard = true;
  },

  [HIDDEN_SYSTEM_RECOM_INFO_BOARD] (state) {
    state.isShowSystemRecomInfoBoard = false;
  },

  [SHOW_SYSTEM_STATUS_CONTROL_BOARD] (state) {
    this.commit(HIDDEN_ALL_SINGLE_BOARD);
    state.isShowSystemStatusControlBoard = true;
  },

  [HIDDEN_SYSTEM_STATUS_CONTROL_BOARD] (state) {
    state.isShowSystemStatusControlBoard = false;
  },

  // 关闭所有的非右键菜单的面板
  [HIDDEN_ALL_NOT_CONTEXT_MENU_BOARD] (state) {
    state.isShowSystemMenuBoard = false;
    state.isShowSystemSearchBoard = false;
  },

  // 关闭所有的面板
  [HIDDEN_ALL_SINGLE_BOARD] (state) {
    state.isShowSystemMenuBoard = false;
    state.isShowSystemSearchBoard = false;
    state.isShowDesktopContextMenu = false;
    state.isShowTaskbarContextMenu = false;
    state.isShowSystemRecomInfoBoard = false;
    state.isShowSystemStatusControlBoard = false;
  },
}