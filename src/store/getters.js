import { APP_STATUS_MAP } from "../utils"

export default {
  isShowVsCodeWidget (state) {
    return state.isShowVsCodeWidget === APP_STATUS_MAP.SHOW;
  },
  isShowEdgeBrowserWidget (state) {
    return state.isShowEdgeBrowserWidget === APP_STATUS_MAP.SHOW;
  },
  curActiveTask (state) {
    return state.tasks.find(t => t.active === true);
  }
}