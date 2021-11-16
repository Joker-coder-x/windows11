import {
  systemNamespace,
  systemNamespaceSymbol
} from "utils";
import {
  SET_LIGHT_VALUE,
  SET_EYE_CARE_MODE
} from "store/mutation-types";

export default [
  {
    icon: require('assets/icons/ui/wifi.png'),
    name: 'WIFI',
    active: true
  },
  {
    icon: require('assets/icons/ui/airplane.png'),
    name: '飞行模式',
    active: false
  },
  {
    icon: require('assets/icons/ui/bluetooth.png'),
    name: '蓝牙',
    active: false
  },
  {
    icon: require('assets/icons/ui/saver.png'),
    name: '省电模式',
    active: false,
    handler (store) {
      this.active ?
        (this.lastLightValue = store.state[systemNamespaceSymbol].lightValue, store.commit(systemNamespace(SET_LIGHT_VALUE), 40)) :
        store.commit(systemNamespace(SET_LIGHT_VALUE), this.lastLightValue);
    }
  },
  {
    icon: require('assets/icons/ui/moon.png'),
    name: '专注助手',
    active: false
  },
  {
    icon: require('assets/icons/ui/eye_care.png'),
    name: '护眼模式',
    active: false,
    handler (store) {
      this.active ?
        store.commit(systemNamespace(SET_EYE_CARE_MODE), true) :
        store.commit(systemNamespace(SET_EYE_CARE_MODE), false);
    }
  },
  {
    icon: require('assets/icons/ui/location.png'),
    name: '位置',
    active: false
  },
  {
    icon: require('assets/icons/ui/connect.png'),
    name: '连接',
    active: false
  },
  {
    icon: require('assets/icons/ui/project.png'),
    name: '投放',
    active: false
  },
];
