<template>
  <base-app-widget
    :show="isShowSystemTerminal"
    :app-is-active="appIsActive"
    :app-config="appConfig"
    class="system-terminal"
    @mousedown.stop
  >
    <div class="system-terminal-bd">
      <div>Microsoft Windows [版本 10.0.22478.1012]</div>
      <div>(c) Xifan Corporation。保留所有权利。</div>
      <command-line
        v-for="(command, index) of commandList"
        :key="index"
        :gap="command.gap"
      >{{ command.text }}</command-line>
      <command-input
        ref="commandInputRef"
        @on-submit-command="handleSubmitCommand"
      ></command-input>
    </div>
  </base-app-widget>
</template>

<script>
import { useStore } from 'vuex';

import {
  SHOW_SYSTEM_TERMINAL,
  HIDDEN_SYSTEM_TERMINAL,
  CLOSE_SYSTEM_TERMINAL
} from "store/mutation-types";
import { viewNamespace } from  "utils";

import useCommandState from "composables/terminal";

import BaseAppWidget from "../BaseAppWidget";
import CommandLine from "./CommandLine";
import CommandInput from "./CommandInput";

export default {
  name: "SystemTerminal",
  _appConfig: {
    storeControlPropName: "isShowSystemTerminal",
    showEventMutationType: viewNamespace(SHOW_SYSTEM_TERMINAL),
    hiddenEventMutationType: viewNamespace(HIDDEN_SYSTEM_TERMINAL),
    closeEventMutationType: viewNamespace(CLOSE_SYSTEM_TERMINAL),
    info: {
      logo: require("assets/icons/terminal.png"),
      name: '系统终端'
    },
    onShow (vm) {
      setTimeout(() => {
        vm.commandInputRef && vm.commandInputRef.focus();
      });
    },
    onClose (vm) {
      setTimeout(() => {
        vm.commandList.length = 0;
      });
    }
  },
  components: {
    BaseAppWidget,
    CommandLine,
    CommandInput,
  },
  setup() {
    const store = useStore(),
          handleClose = () => store.commit(viewNamespace(CLOSE_SYSTEM_TERMINAL));

    const {
      commandInputRef,
      commandList,
      handleSubmitCommand
    } = useCommandState(handleClose);

    return {
      commandList,
      commandInputRef,
      handleSubmitCommand,
      handleClose
    };
  },
};
</script>

<style lang="scss" scoped>
.system-terminal-bd {
  @include disabled-selected;
  @include no-scroll;
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: #0c0c0cf5;
  font-size: 12px;
  line-height: 1.3;
  letter-spacing: .1em;
  color: #1eff00;
}
</style>