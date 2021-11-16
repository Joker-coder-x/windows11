import { viewNamespace } from "utils";
import {
  SET_AUDIO_VALUE,
  SET_LIGHT_VALUE,
  SET_EYE_CARE_MODE,
  SETUP,
  SHOW_SCREEN_SAVER,
  SHUTDOWN,
  RESOURCES_LOADED,
} from "store/mutation-types";


const state = () => ({
  resourcesPreload: false, // 标识是否已经预加载资源
  isSetup: false, // 是否开机标识
  eyeCareMode: false, // 护眼模式
  lightValue: 100, // 亮度值 范围：0-100
  audioValue: 100, // 音量值 范围: 0-100
});

const mutations = {
  // 资源预加载
  [RESOURCES_LOADED] (state) {
    state.resourcesPreload = true;
  },

  // 开机
  [SETUP] (state) {
    state.setup = true;
    this.commit(viewNamespace(SHOW_SCREEN_SAVER));
  },

  // 关机
  [SHUTDOWN] (state) {
    state.setup = false;
  },

  // 设置亮度
  [SET_LIGHT_VALUE] (state, value) {
    state.lightValue = value < 10 ? 10 : value;
  },

  // 设置音量
  [SET_AUDIO_VALUE] (state, value) {
    state.audioValue = value;
  },

  // 设置护眼模式
  [SET_EYE_CARE_MODE] (state, value) {
    state.eyeCareMode = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations
};