import {
  SHOW_VS_CODE_WIDGET,
  SHOW_EDGE_BROWSER_WIDGET,
  HIDDEN_SYSTEM_MENU_BOARD,
  SHOW_SYSTEM_MENU_BOARD,
  HIDDEN_SYSTEM_SEARCH_BOARD,
  SHOW_SYSTEM_SEARCH_BOARD,
  HIDDEN_SYSTEM_RECOM_INFO_BOARD,
  SHOW_SYSTEM_RECOM_INFO_BOARD,
  SHOW_SYSTEM_TERMINAL,
  SHOW_CALCULATOR,
  SHOW_NOTEPAD,
  SHOW_RECYCLE_BIN,
  SHOW_MY_COMPUTER,
  SHOW_CLOUD_MUSIC
 } from "store/mutation-types";
import { viewNamespace, sendEmail } from "utils";
import { jumpLink } from "../utils/dom";

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
      name: '此电脑',
      handler (store) {
        store.commit(viewNamespace(SHOW_MY_COMPUTER));
      }
    },
    {
      icon: require("assets/icons/bin0.png"),
      name: '回收站',
      handler (store) {
        store.commit(viewNamespace(SHOW_RECYCLE_BIN));
      }
    },
    {
      icon: require("assets/icons/code.png"),
      name: 'VSCode',
      handler (store) {
        store.commit(viewNamespace(SHOW_VS_CODE_WIDGET));
      }
    },
    {
      icon: require("assets/icons/cloud-music.png"),
      name: '网易云音乐',
      handler (store) {
        store.commit(viewNamespace(SHOW_CLOUD_MUSIC));
      }
    },
    {
      icon: require("assets/icons/edge.png"),
      name: 'Edge浏览器',
      handler (store) {
        store.commit(viewNamespace(SHOW_EDGE_BROWSER_WIDGET));
      }
    },
    {
      icon: require("assets/icons/terminal.png"),
      name: '系统终端',
      handler (store) {
        store.commit(viewNamespace(SHOW_SYSTEM_TERMINAL));
      }
    },
    {
      icon: require("assets/icons/calculator.png"),
      name: '计算器',
      handler (store) {
        store.commit(viewNamespace(SHOW_CALCULATOR));
      }
    },
    {
      icon: require("assets/icons/notepad.png"),
      name: '记事本',
      handler (store) {
        store.commit(viewNamespace(SHOW_NOTEPAD));
      }
    },
    {
      icon: require("assets/icons/mail.png"),
      name: '邮件',
      handler () {
        sendEmail("3014375877@qq.com");
      }
    },
    {
      icon: require("assets/icons/github.png"),
      name: 'github',
      handler () {
        jumpLink("https://github.com/Joker-coder-x");
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
          store.commit(viewNamespace(HIDDEN_SYSTEM_MENU_BOARD)) :
          store.commit(viewNamespace(SHOW_SYSTEM_MENU_BOARD));
      }
    },
    {
      iconClass: 'icon-search search',
      name: 'search',
      builtIn: true, // 内置的
      handler: (store) => {
        store.state.isShowSystemSearchBoard ?
          store.commit(viewNamespace(HIDDEN_SYSTEM_SEARCH_BOARD)) :
          store.commit(viewNamespace(SHOW_SYSTEM_SEARCH_BOARD));
      }
    },
    {
      logo: require("assets/icons/widget.png"),
      name: 'widget',
      builtIn: true, // 内置的
      handler: (store) => {
        store.state.isShowSystemRecomInfoBoard ?
          store.commit(viewNamespace(HIDDEN_SYSTEM_RECOM_INFO_BOARD)) :
          store.commit(viewNamespace(SHOW_SYSTEM_RECOM_INFO_BOARD));
      }
    },
    // {
    //   logo: require("assets/icons/settings.png"),
    //   name: 'setting',
    //   builtIn: true // 内置的
    // },
  ]
 };