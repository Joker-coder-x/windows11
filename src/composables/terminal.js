import { reactive, ref } from 'vue';

export default function useCommandState (close) {
  const commandInputRef = ref(null),
        commandList = reactive([]);

  const handleSubmitCommand = (command) => {
    commandInputRef.value.focus();
    const commandLines = parseCommand({ command, commandList, close });
    commandList.push(...commandLines);
  };

  return {
    commandInputRef,
    commandList,
    handleSubmitCommand
  };
}

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

/**
 * 创建命令行所需的数据结构
 */
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