/**
 * 项目配置文件，暂时还是作用不大，后面慢慢把配置集中到这个文件
 */

import {
  SHOW_VS_CODE_WIDGET,
  SHOW_EDGE_BROWSER_WIDGET,
  HIDDEN_SYSTEM_MENU_BOARD,
  SHOW_SYSTEM_MENU_BOARD,
  HIDDEN_SYSTEM_SEARCH_BOARD,
  SHOW_SYSTEM_SEARCH_BOARD,
  HIDDEN_SYSTEM_RECOM_INFO_BOARD,
  SHOW_SYSTEM_RECOM_INFO_BOARD,
  SHOW_SYSTEM_TERMINAL
} from "./store/mutation-types";

export default {
  // 桌面图标布局
  layout: {
    row: 8,
    column: 20,
    rowGap: 15,
    columnGap: 4
  },
  apps: [
    {
      icon: require("assets/icons/win/917.png"),
      name: '此电脑'
    },
    {
      icon: require("assets/icons/bin0.png"),
      name: '回收站',
    },
    {
      icon: require("assets/icons/code.png"),
      name: 'VSCode',
      handler (store) {
        store.commit(SHOW_VS_CODE_WIDGET);
      }
    },
    {
      icon: require("assets/icons/cloud-music.png"),
      name: '网易云音乐'
    },
    {
      icon: require("assets/icons/edge.png"),
      name: 'Edge浏览器',
      handler (store) {
        store.commit(SHOW_EDGE_BROWSER_WIDGET);
      }
    },
    {
      icon: require("assets/icons/terminal.png"),
      name: '系统终端',
      handler (store) {
        store.commit(SHOW_SYSTEM_TERMINAL);
      }
    },
  ],
  tasks: [
    {
      logo: require("assets/icons/home.png"),
      name: 'windows',
      builtIn: true, // 内置的,
      handler: (store) => {
        store.state.isShowSystemMenuBoard ?
          store.commit(HIDDEN_SYSTEM_MENU_BOARD) :
          store.commit(SHOW_SYSTEM_MENU_BOARD);
      }
    },
    {
      iconClass: 'icon-search search',
      name: 'search',
      builtIn: true, // 内置的
      handler: (store) => {
        store.state.isShowSystemSearchBoard ?
          store.commit(HIDDEN_SYSTEM_SEARCH_BOARD) :
          store.commit(SHOW_SYSTEM_SEARCH_BOARD);
      }
    },
    {
      logo: require("assets/icons/widget.png"),
      name: 'widget',
      builtIn: true, // 内置的
      handler: (store) => {
        store.state.isShowSystemRecomInfoBoard ?
          store.commit(HIDDEN_SYSTEM_RECOM_INFO_BOARD) :
          store.commit(SHOW_SYSTEM_RECOM_INFO_BOARD);
      }
    },
    // {
    //   logo: require("assets/icons/settings.png"),
    //   name: 'setting',
    //   builtIn: true // 内置的
    // },
  ]
};