<template>
  <transition name="scale-slide">
    <base-app-widget
      v-if="isShowSystemTerminal"
      name="系统终端"
      :icon="require('assets/icons/terminal.png')"
      :class="['system-terminal', appIsActive ? 'active' : '']"
      @on-minimize="handleMinimize"
      @on-close="handleClose"
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
  </transition>
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
    info: {
      logo: require("assets/icons/terminal.png"),
      name: '系统终端',
      handler: (store) => {
        store.getters[viewNamespace("isShowSystemTerminal")] ?
          store.commit(viewNamespace(HIDDEN_SYSTEM_TERMINAL)) :
          store.commit(viewNamespace(SHOW_SYSTEM_TERMINAL));
      }
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
          handleMinimize = () => store.commit(viewNamespace(HIDDEN_SYSTEM_TERMINAL)),
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
      handleMinimize,
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

.scale-slide-enter-active {
  animation: scale-slide .25s reverse;
}

.scale-slide-leave-active {
  animation: scale-slide .25s;
}
</style>