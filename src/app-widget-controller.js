import { computed, watch } from "vue";

import { isObject } from "./utils";

export default function (app) {
  app.mixin({
    data () {
      const vm = this,
            options = vm.$options,
            appConfig = options._appConfig;

      if (appConfig && isObject(appConfig)) {
        const { storeControlPropName, onShow, onHidden } = appConfig;
        const storeControlPropNameRef = computed(() => vm.$store.state[storeControlPropName]);

        watch(
          storeControlPropNameRef,
          newVal => newVal ? onShow && onShow.call(vm, vm) : onHidden && onHidden.call(vm, vm)
        );

        return {
          [storeControlPropName]: storeControlPropNameRef
        };
      } else {
        return {};
      }
    }
  });
};