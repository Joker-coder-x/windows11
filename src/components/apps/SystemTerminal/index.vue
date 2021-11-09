<template>
  <base-app-widget
    v-if="isShowSystemTerminal"
    name="系统终端"
    :icon="require('assets/icons/terminal.png')"
    class="system-terminal"
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
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

import BaseAppWidget from "../BaseAppWidget";
import CommandLine from "./CommandLine";
import CommandInput from "./CommandInput";

import {
  SHOW_SYSTEM_TERMINAL,
  HIDDEN_SYSTEM_TERMINAL,
  CLOSE_SYSTEM_TERMINAL
} from "store/mutation-types";


export default {
  name: "SystemTerminal",
  _appConfig: {
    storeControlPropName: "isShowSystemTerminal",
    info: {
      logo: require("assets/icons/terminal.png"),
      name: '系统终端',
      handler: (store) => {
        store.getters.isShowSystemTerminal ?
          store.commit(HIDDEN_SYSTEM_TERMINAL) :
          store.commit(SHOW_SYSTEM_TERMINAL);
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
          commandInputRef = ref(null),
          commandList = reactive([]);

    const handleSubmitCommand = (command) => {
      commandInputRef.value.focus();
      const commandLines = parseCommand({command, commandList, close: handleClose});
      commandList.push(...commandLines);
    };
    const handleMinimize = () => store.commit(HIDDEN_SYSTEM_TERMINAL);
    const handleClose = () => store.commit(CLOSE_SYSTEM_TERMINAL);

    return {
      commandList,
      commandInputRef,
      handleSubmitCommand,
      handleMinimize,
      handleClose
    };
  },
};

const commandMap = {
  "HELP": ({ command }) => {
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`CD        显示当前目录的名称或将其更改。`),
      createCommandLine(`CLS       清除屏幕。`),
      createCommandLine(`EXIT      退出终端。`),
      createCommandLine(`HELP      命令手册。`),
      createCommandLine(`TIME      显示系统时间。`),
      createCommandLine(`DATE      显示系统日期。`),
      createCommandLine(`VER       显示 Windows 的版本。`),
      createCommandLine(`有关工具的详细信息，请参阅联机帮助中的命令行参考。`, true),
    ];
  },
  "CLS": ({ commandList }) => {
    commandList.length = 0;
    return [];
  },
  "CD": ({ command }) => {
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`C:\\User\\xifan`),
    ];
  },
  "VER": ({ command }) => {
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`Microsoft Windows [版本 10.0.22478.1012]`, true),
    ];
  },
  "DIR": ({ command }) => {
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`2021/11/05  23:48    <DIR>          .`, true),
      createCommandLine(`2021/11/05  23:48    <DIR>          ..`),
    ];
  },
  "TIME": ({ command }) => {
    const date = new Date();
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`当前时间：${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`),
    ];
  },
  "DATE": ({ command }) => {
    const date = new Date();
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`当前日期：${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`),
    ];
  },
   "EXIT": ({ close }) => {
    close();
    return [];
  },
};

function createCommandLine (text, gap = false) {
  return {
    text,
    gap
  };
}

/**
 * 解析命令
 */
function parseCommand (opts) {
  const { command } = opts;
  const handler = commandMap[command.toUpperCase()];

  if (!handler) {
    return [
      createCommandLine(`C:\\User\\xifan> ${command}`, true),
      createCommandLine(`'${command}' 不是内部或外部命令，也不是可运行的程序`),
      createCommandLine(`或批处理文件。`),
      createCommandLine(`输入 ‘help’ 查看所有可用命令。`, true),
    ];
  }

  return handler(opts);
}
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