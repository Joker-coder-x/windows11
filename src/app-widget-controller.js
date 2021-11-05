import {
  computed,
  watch
} from "vue";

import {
  ADD_TASK,
  REMOVE_TASK
} from "./store/mutation-types";

import {
  APP_STATUS_MAP,
  isObject
} from "./utils";

export default function (app) {
  app.config.globalProperties.$APP_STATUS_MAP = APP_STATUS_MAP;

  app.mixin({
    data () {
      const vm = this,
            options = vm.$options,
            appConfig = options._appConfig,
            store = vm.$store;

      if (appConfig && isObject(appConfig)) {
        const {
          storeControlPropName,
          onShow,
          onHidden,
          onClose
        } = appConfig;
        const storeControlPropNameRef = computed(() => store.state[storeControlPropName]);

        watch(
          storeControlPropNameRef,
          newVal => {
            switch (newVal) {
              case APP_STATUS_MAP.SHOW:
                appConfig.info && store.commit(ADD_TASK, appConfig.info);
                onShow && onShow.call(vm, vm);
                break;
              case APP_STATUS_MAP.HIDDEN:
                onHidden && onHidden.call(vm, vm);
                break;
              case APP_STATUS_MAP.CLOSE:
                appConfig.info && store.commit(REMOVE_TASK, appConfig.info);
                onClose && onClose.call(vm, vm);
                break;
              default:
                break;
            }
          }
        );

        return {
          [storeControlPropName]: computed(() => store.getters[storeControlPropName])
        };
      } else {
        return {};
      }
    }
  });
};