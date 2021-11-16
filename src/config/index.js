/**
 * 项目配置文件出口文件
 */

import desktopContextMenus from "./modules/desktopContext";
import taskbarContextMenus from "./modules/taskbarContext";
import { systemMenuBoardMenus, recommendProjectMenus} from "./modules/systemMenuBoard";
import systemControlList from "./modules/controlList";
import config from "./config";

export {
  desktopContextMenus,
  taskbarContextMenus,
  systemMenuBoardMenus,
  recommendProjectMenus,
  systemControlList
}

export default config;

