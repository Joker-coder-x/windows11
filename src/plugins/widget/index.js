import {
  computed,
  watch,
  ref
} from "vue";

import {
  ADD_TASK,
  DELETE_TASK_ACTIVE,
  REMOVE_TASK
} from "store/mutation-types";

import {
  APP_STATUS_MAP,
  isObject,
  taskNamespace,
  taskNamespaceSymbol,
  viewNamespace,
  viewNamespaceSymbol
} from "utils";

export default function (app) {
  app.mixin({
    data () {
      const vm = this,
            options = vm.$options,
            appConfig = options._appConfig,
            store = vm.$store;

      if (appConfig && isObject(appConfig)) {
        const {
          storeControlPropName,
          showEventMutationType,
          hiddenEventMutationType,
          closeEventMutationType,
          onShow,
          onHidden,
          onClose
        } = appConfig;

        const appInfo = appConfig.info,
              appIsActive = ref(false),
              viewNamespaceState = store.state[viewNamespaceSymbol],
              storeControlPropNameRef = computed(() => viewNamespaceState[storeControlPropName]);

        watch(
          storeControlPropNameRef,
          newVal => {
            const appInfo = appConfig.info;

            switch (newVal) {
              case APP_STATUS_MAP.SHOW:
                appInfo && store.commit(taskNamespace(ADD_TASK), { ...appInfo, active: true, status: newVal });
                onShow && onShow.call(vm, vm);
                break;
              case APP_STATUS_MAP.HIDDEN:
                appInfo && store.commit(taskNamespace(DELETE_TASK_ACTIVE), { ...appInfo, active: false, status: newVal });
                onHidden && onHidden.call(vm, vm);
                break;
              case APP_STATUS_MAP.CLOSE:
                appInfo && store.commit(taskNamespace(REMOVE_TASK), appInfo.name);
                onClose && onClose.call(vm, vm);
                break;
              default:
                break;
            }
          }
        );

        if (appInfo) {
          const taskNamespaceState = store.state[taskNamespaceSymbol];

          if (!appInfo.handler) {
            appInfo.handler = function (store) {
              store.getters[viewNamespace(storeControlPropName)] ?
                store.commit(hiddenEventMutationType) :
                store.commit(showEventMutationType);
            }
          }

          watch(
            computed(() => taskNamespaceState.tasks),
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
                    store.commit(taskNamespace(ADD_TASK), {...t, active: true });
                    break;
                  }
                }
              }
            },
            { deep: true }
          );
        }

        return {
          appIsActive,
          appConfig: {
            name: appInfo.name,
            icon: appInfo.logo,
            hiddenEventMutationType: hiddenEventMutationType,
            closeEventMutationType: closeEventMutationType,
          },
          [storeControlPropName]: computed(() => store.getters[viewNamespace(storeControlPropName)]),
        };
      } else {
        return {};
      }
    }
  });
};