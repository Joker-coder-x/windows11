<template>
  <base-app-widget
    :show="isShowNotepad"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="notepad"
    name="未命名文件.txt - 记事本"
    toolbar-bg-color="#fff"
    toolbar-text-color="#424242"
    toolbar-operate-panel-icon-color="black"
    toolbar-operate-panel-hover-color="#DBDBDB"
    @mousedown.stop
  >
    <div class="notepad-bd">
      <notepad-toolbar></notepad-toolbar>
      <div
        class="input-area"
        contenteditable="true"
        autofocus
        ref="inputRef"
      ></div>
      <notepad-status-bar></notepad-status-bar>
    </div>
  </base-app-widget>
</template>

<script>
import { ref } from 'vue';

import {
  viewNamespace
} from "utils";
import {
  HIDDEN_NOTEPAD,
  SHOW_NOTEPAD,
  CLOSE_NOTEPAD
} from "store/mutation-types";

import BaseAppWidget from "../BaseAppWidget";
import NotepadToolbar from "./NotepadToolbar";
import NotepadStatusBar from "./NotepadStatusBar";

export default {
  name: "Notepad",
  _appConfig: {
    storeControlPropName: "isShowNotepad",
    showEventMutationType: viewNamespace(SHOW_NOTEPAD),
    hiddenEventMutationType: viewNamespace(HIDDEN_NOTEPAD),
    closeEventMutationType: viewNamespace(CLOSE_NOTEPAD),
    info: {
      logo: require("assets/icons/notepad.png"),
      name: '记事本',
    },
    onShow (vm) {
      setTimeout(() => {
        vm.inputRef && vm.inputRef.focus();
      });
    },
  },
  components: {
    BaseAppWidget,
    NotepadToolbar,
    NotepadStatusBar
  },
  setup () {
    const inputRef = ref(null);

    return {
      inputRef,
    };
  },
}
</script>

<style lang="scss" scoped>
.notepad {
  @include disabled-selected;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 25px #00000085;

  &-bd {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .input-area {
      flex: auto;
      overflow-x: scroll;
      overflow-y: scroll;
      padding: 3px;
      outline: none;
      border-bottom: 1px solid #ccc;
    }
  }
}


</style>