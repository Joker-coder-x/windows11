import {
  SET_APP_ITEM_SIZE
} from "store/mutation-types";

const state = () => ({
  appGridLayoutItemWidth: 0, // app栅格的宽度
  appGridLayoutItemHeight: 0, // app栅格的高度
});

const mutations = {
  // 设置桌面图标大小
  [SET_APP_ITEM_SIZE] (state, sizeInfo) {
    state.appGridLayoutItemWidth = sizeInfo.width;
    state.appGridLayoutItemHeight = sizeInfo.height;
  },
};

export default {
  namespaced: true,
  state,
  mutations
};