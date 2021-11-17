<template>
  <base-app-widget
    :show="isShowEdgeBrowserWidget"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    :class="['edge-browser', isFull ? 'full' : '']"
    toolbarBgColor="#E8E8E8"
    toolbarTextColor="#333"
    @mousedown.stop
  >
    <template #toolbar>
      <div class="toolbar-content">
        <div class="left">
          <div class="logo">
            <img
              class="img"
              src="~assets/icons/edge.png" />
          </div>
          <browser-toolbar-tabs></browser-toolbar-tabs>
        </div>
        <base-app-widget-operate-panel
          iconColor="black"
          hoverColor="#D4D6D8"
          :full="isFull"
          @on-minimize="handleMinimize"
          @on-maximize="handleMaximize"
          @on-close="handleClose"
        ></base-app-widget-operate-panel>
    </div>
    </template>
    <template #default>
      <div class="browser-bd">
        <div class="top">
          <div class="address-bar">
            <div class="address-operate-panel">
              <span class="iconfont icon-direction-left"></span>
              <span class="iconfont icon-direction-right"></span>
              <span class="iconfont icon-refresh"></span>
            </div>
            <div class="input-wrap">
              <span class="iconfont icon-lock"></span>
              <input
                class="input"
                type="text"
                value="http://cn.bing.com" />
            </div>
          </div>
          <div class="bookmark-bar">
            <browser-bookmark-item
              v-for="(item, index) of bookmarks"
              :key="index"
              :item="item"
              @on-click="handleChangeUrl"
            ></browser-bookmark-item>
          </div>
        </div>
        <div class="view">
          <iframe
            class="iframe"
            :src="curUrl"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </template>
  </base-app-widget>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import {
  HIDDEN_EDGE_BROWSER_WIDGET,
  SHOW_EDGE_BROWSER_WIDGET,
  CLOSE_EDGE_BROWSER_WIDGET
} from "store/mutation-types";

import { viewNamespace } from "utils";

import BaseAppWidget from "../BaseAppWidget";
import BrowserBookmarkItem from "./BrowserBookmarkItem";
import BaseAppWidgetOperatePanel from "../BaseAppWidget/BaseAppWidgetOperatePanel";
import BrowserToolbarTabs from "./BrowserToolbarTabs";

const bookmarks = [
  {
    ico: require('assets/icons/icos/google.ico'),
    label: "Google",
    url: "https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp"
  },
  {
    ico: require('assets/icons/icos/youtube.ico'),
    label: "youtube",
    url: "https://www.youtube.com/"
  },
  {
    ico: require('assets/icons/icos/bilibili.ico'),
    label: "Bilibili",
    url: "https://www.bilibili.com/"
  },
  {
    ico: require('assets/icons/icos/360.ico'),
    label: "360搜索",
    url: "https://www.so.com/"
  },
];

export default {
  name: "EdgeBrowser",
  _appConfig: {
    storeControlPropName: "isShowEdgeBrowserWidget",
    showEventMutationType: viewNamespace(SHOW_EDGE_BROWSER_WIDGET),
    hiddenEventMutationType: viewNamespace(HIDDEN_EDGE_BROWSER_WIDGET),
    closeEventMutationType: viewNamespace(CLOSE_EDGE_BROWSER_WIDGET),
    info: {
      logo: require("assets/icons/edge.png"),
      name: 'Edge浏览器',
    }
  },
  components: {
    BaseAppWidget,
    BrowserBookmarkItem,
    BrowserToolbarTabs,
    BaseAppWidgetOperatePanel
  },
  setup () {
    const store = useStore(),
          isFull = ref(false),
          curUrl = ref("http://cn.bing.com");

    const handleChangeUrl = (url) => curUrl.value = url;
    const handleMinimize = () => store.commit(viewNamespace(HIDDEN_EDGE_BROWSER_WIDGET));
    const handleMaximize = () => isFull.value = !isFull.value;
    const handleClose = () => store.commit(viewNamespace(CLOSE_EDGE_BROWSER_WIDGET));

    return {
      isFull,
      curUrl,
      bookmarks,
      handleChangeUrl,
      handleMinimize,
      handleMaximize,
      handleClose
    };
  },
}
</script>

<style lang="scss" scoped>
$topColor: #F7F7F7;

.edge-browser {
  @include disabled-selected;
  box-shadow: 0 0 25px #00000085;
}

.full {
  width: 100vw!important;
  height: 100vh!important;
}

.toolbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  .left {
    display: flex;
    height: 100%;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;

      .img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }
  }
}

.browser-bd {
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    width: 100%;
    background: #F7F7F7;
    border: none;

    .address-bar {
      display: flex;
      align-items: center;
      height: 36px;

      .address-operate-panel {
        display: flex;
        align-items: center;
        color: #424242;
        margin-left: 4px;
        margin-right: 8px;

        .iconfont {
          display: inline-block;
          padding: 4px 10px;

          &:hover {
            background-color: #ddd;
          }
        }
      }

      .input-wrap {
        position: relative;
        width: 75%;
        height: 100%;
        padding: 5px;
        font-size: 12px;

        .iconfont {
          position: absolute;
          left: 15px;
          top: 50%;
          color: #777;
          font-size: 14px;
          transform: translateY(-50%);
        }

        .input {
          overflow: hidden;
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
          color: #424242;
          outline: none;
          text-indent: 2.8em;
          border-radius: 4px;
          box-shadow: 0 2px 3px #c0bdbd75;

          &:focus {
            outline: 2px solid #99BBEF;
          }
        }
      }
    }

    .bookmark-bar {
      display: flex;
      padding: 4px 6px;
    }
  }

  .view {
    flex: auto;

    .iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}

</style>