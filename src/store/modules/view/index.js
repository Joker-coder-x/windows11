import {
  APP_STATUS_MAP,
  makeNamespace
} from "utils";

import {
  HIDDEN_ALL_NOT_CONTEXT_MENU_BOARD,
  HIDDEN_ALL_SINGLE_BOARD,
  HIDDEN_DESKTOP_CONTEXT_MENU,
  HIDDEN_SYSTEM_MENU_BOARD,
  HIDDEN_SYSTEM_RECOM_INFO_BOARD,
  HIDDEN_SYSTEM_SEARCH_BOARD,
  HIDDEN_SYSTEM_STATUS_CONTROL_BOARD,
  HIDDEN_TASKBAR_CONTEXT_MENU,
  SHOW_DESKTOP_CONTEXT_MENU,
  SHOW_SYSTEM_MENU_BOARD,
  SHOW_SYSTEM_RECOM_INFO_BOARD,
  SHOW_SYSTEM_SEARCH_BOARD,
  SHOW_SYSTEM_STATUS_CONTROL_BOARD,
  SHOW_TASKBAR_CONTEXT_MENU,
  SHOW_VS_CODE_WIDGET,
  HIDDEN_VS_CODE_WIDGET,
  SHOW_EDGE_BROWSER_WIDGET,
  HIDDEN_EDGE_BROWSER_WIDGET,
  CLOSE_VS_CODE_WIDGET,
  CLOSE_EDGE_BROWSER_WIDGET,
  SHOW_SYSTEM_CALENDAR_BOARD,
  HIDDEN_SYSTEM_CALENDAR_BOARD,
  SHOW_SYSTEM_TERMINAL,
  HIDDEN_SYSTEM_TERMINAL,
  CLOSE_SYSTEM_TERMINAL,
  SHOW_CALCULATOR,
  HIDDEN_CALCULATOR,
  CLOSE_CALCULATOR,
  SHOW_SCREEN_SAVER,
  HIDDEN_SCREEN_SAVER,
} from "store/mutation-types";

const _namespace = makeNamespace('view');

const state = () => ({
  isShowScreenSaver: true,
  isShowDesktopContextMenu: false,
  isShowTaskbarContextMenu: false,
  isShowSystemMenuBoard: false,
  isShowSystemSearchBoard: false,
  isShowSystemRecomInfoBoard: false,
  isShowSystemStatusControlBoard: false,
  isShowSystemCalendarBoard: false,
  isShowVsCodeWidget: APP_STATUS_MAP.HIDDEN,
  isShowEdgeBrowserWidget: APP_STATUS_MAP.HIDDEN,
  isShowSystemTerminal: APP_STATUS_MAP.HIDDEN,
  isShowCalculator: APP_STATUS_MAP.HIDDEN,
  desktopContextMenuPosX: 0,
  desktopContextMenuPosY: 0,
  taskbarContextMenuPosX: 0,
  taskbarContextMenuPosY: 0,
});

const mutations = {
  [SHOW_DESKTOP_CONTEXT_MENU] (state, pos) {
    this.commit(_namespace(HIDDEN_ALL_SINGLE_BOARD));

    state.isShowDesktopContextMenu = true;
    state.desktopContextMenuPosX = pos.x || 0;
    state.desktopContextMenuPosY = pos.y || 0;
  },

  [HIDDEN_DESKTOP_CONTEXT_MENU] (state) {
    state.isShowDesktopContextMenu = false;
  },

  [SHOW_TASKBAR_CONTEXT_MENU] (state, pos) {
    this.commit(_namespace(HIDDEN_DESKTOP_CONTEXT_MENU));

    state.isShowTaskbarContextMenu = true;
    state.taskbarContextMenuPosX = pos.x || 0;
    state.taskbarContextMenuPosY = pos.y || 0;
  },

  [HIDDEN_TASKBAR_CONTEXT_MENU] (state) {
    state.isShowTaskbarContextMenu = false;
  },

  [SHOW_SYSTEM_MENU_BOARD] (state) {
    this.commit(_namespace(HIDDEN_ALL_SINGLE_BOARD));
    state.isShowSystemMenuBoard = true;
  },

  [HIDDEN_SYSTEM_MENU_BOARD] (state) {
    state.isShowSystemMenuBoard = false;
  },

  [SHOW_SYSTEM_SEARCH_BOARD] (state) {
    this.commit(_namespace(HIDDEN_ALL_SINGLE_BOARD));
    state.isShowSystemSearchBoard = true;
  },

  [HIDDEN_SYSTEM_SEARCH_BOARD] (state) {
    state.isShowSystemSearchBoard = false;
  },

  [SHOW_SYSTEM_RECOM_INFO_BOARD] (state) {
    this.commit(_namespace(HIDDEN_ALL_SINGLE_BOARD));
    state.isShowSystemRecomInfoBoard = true;
  },

  [HIDDEN_SYSTEM_RECOM_INFO_BOARD] (state) {
    state.isShowSystemRecomInfoBoard = false;
  },

  [SHOW_SYSTEM_STATUS_CONTROL_BOARD] (state) {
    this.commit(_namespace(HIDDEN_ALL_SINGLE_BOARD));
    state.isShowSystemStatusControlBoard = true;
  },

  [HIDDEN_SYSTEM_STATUS_CONTROL_BOARD] (state) {
    state.isShowSystemStatusControlBoard = false;
  },

  [SHOW_SYSTEM_CALENDAR_BOARD] (state) {
    this.commit(_namespace(HIDDEN_ALL_SINGLE_BOARD));
    state.isShowSystemCalendarBoard = true;
  },

  [HIDDEN_SYSTEM_CALENDAR_BOARD] (state) {
    state.isShowSystemCalendarBoard = false;
  },

  [SHOW_VS_CODE_WIDGET] (state) {
    state.isShowVsCodeWidget = APP_STATUS_MAP.SHOW;
  },

  [HIDDEN_VS_CODE_WIDGET] (state) {
    state.isShowVsCodeWidget = APP_STATUS_MAP.HIDDEN;
  },

  [CLOSE_VS_CODE_WIDGET] (state) {
    state.isShowVsCodeWidget = APP_STATUS_MAP.CLOSE;
  },

  [SHOW_EDGE_BROWSER_WIDGET] (state) {
    state.isShowEdgeBrowserWidget = APP_STATUS_MAP.SHOW;
  },

  [HIDDEN_EDGE_BROWSER_WIDGET] (state) {
    state.isShowEdgeBrowserWidget = APP_STATUS_MAP.HIDDEN;
  },

  [CLOSE_EDGE_BROWSER_WIDGET] (state) {
    state.isShowEdgeBrowserWidget = APP_STATUS_MAP.CLOSE;
  },

  [SHOW_SYSTEM_TERMINAL] (state) {
    state.isShowSystemTerminal = APP_STATUS_MAP.SHOW;
  },

  [HIDDEN_SYSTEM_TERMINAL] (state) {
    state.isShowSystemTerminal = APP_STATUS_MAP.HIDDEN;
  },

  [CLOSE_SYSTEM_TERMINAL] (state) {
    state.isShowSystemTerminal = APP_STATUS_MAP.CLOSE;
  },

  [SHOW_CALCULATOR] (state) {
    state.isShowCalculator = APP_STATUS_MAP.SHOW;
  },

  [HIDDEN_CALCULATOR] (state) {
    state.isShowCalculator = APP_STATUS_MAP.HIDDEN;
  },

  [CLOSE_CALCULATOR] (state) {
    state.isShowCalculator = APP_STATUS_MAP.CLOSE;
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
    state.isShowSystemCalendarBoard = false;
  },

  [SHOW_SCREEN_SAVER] (state) {
    state.isShowScreenSaver = true;
  },

  [HIDDEN_SCREEN_SAVER] (state) {
    state.isShowScreenSaver = false;
  }
};

const getters = {
  isShowVsCodeWidget (state) {
    return state.isShowVsCodeWidget === APP_STATUS_MAP.SHOW;
  },
  isShowEdgeBrowserWidget (state) {
    return state.isShowEdgeBrowserWidget === APP_STATUS_MAP.SHOW;
  },
  isShowSystemTerminal (state) {
    return state.isShowSystemTerminal === APP_STATUS_MAP.SHOW;
  },
  isShowCalculator (state) {
    return state.isShowCalculator === APP_STATUS_MAP.SHOW;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};