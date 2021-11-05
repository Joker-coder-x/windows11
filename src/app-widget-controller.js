import {
  computed,
  watch,
  ref
} from "vue";

import {
  ADD_TASK,
  DELETE_TASK_ACTIVE,
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

        const appInfo = appConfig.info,
          appIsActive = ref(false),
          storeControlPropNameRef = computed(() => store.state[storeControlPropName]);

        watch(
          storeControlPropNameRef,
          newVal => {
            const appInfo = appConfig.info;

            switch (newVal) {
              case APP_STATUS_MAP.SHOW:
                appInfo && store.commit(ADD_TASK, { ...appInfo, active: true, status: newVal });
                onShow && onShow.call(vm, vm);
                break;
              case APP_STATUS_MAP.HIDDEN:
                appInfo && store.commit(DELETE_TASK_ACTIVE, { ...appInfo, active: false, status: newVal });
                onHidden && onHidden.call(vm, vm);
                break;
              case APP_STATUS_MAP.CLOSE:
                appInfo && store.commit(REMOVE_TASK, appInfo.name);
                onClose && onClose.call(vm, vm);
                break;
              default:
                break;
            }
          }
        );

        if (appInfo) {
          watch(
            computed(() => store.state.tasks),
            (tasks) => {
              tasks.map(t => {
                if (t.name === appInfo.name) {
                  appIsActive.value = t.active;
                }
              });

              if (!tasks.some(t => t.active === true)) {
                let t = null;
                for (let i = tasks.length - 1; i >= 0; i --) {
                  t = tasks[i];
                  if (t.status === APP_STATUS_MAP.SHOW && !t.builtIn) {
                    store.commit(ADD_TASK, {...t, active: true });
                    break;
                  }
                }
              }
            },
            { deep: true }
          );
        }

        return {
          [storeControlPropName]: computed(() => store.getters[storeControlPropName]),
          appIsActive
        };
      } else {
        return {};
      }
    }
  });
};