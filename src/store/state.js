import config from "../config";
import { APP_STATUS_MAP } from "../utils";

export default {
  eyeCareMode: false, // 护眼模式
  appGridLayoutItemWidth: 0, // app栅格的宽度
  appGridLayoutItemHeight: 0, // app栅格的高度
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
  desktopContextMenuPosX: 0,
  desktopContextMenuPosY: 0,
  taskbarContextMenuPosX: 0,
  taskbarContextMenuPosY: 0,
  lightValue: 100, // 亮度值 范围：0-100
  audioValue: 100, // 音量值 范围: 0-100
  tasks: config.tasks.map(item => ({...item , active: false}))
};