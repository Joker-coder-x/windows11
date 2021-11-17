import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import WidgetPlugin from './plugins/widget';
import { systemNamespaceSymbol } from 'utils';

import "styles/index.scss";
import "utils/common.js";

router.beforeEach((to, from, next) => {
  if ((to.name !== 'Setup' && to.name !== 'Shutdown') && !store.state[systemNamespaceSymbol].setup) {
    next({ name: 'Setup' });
  } else {
    next();
  }
});

const app = createApp(App);

app.use(store)
  .use(WidgetPlugin)
  .use(router)
  .mount('#app');