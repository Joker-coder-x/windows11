import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "styles/index.scss";
import "utils/common.js";

import appWidgetController from './app-widget-controller';

router.beforeEach((to, from, next) => {
  if (to.name !== 'Setup' && !store.state.setup) {
    next({ name: 'Setup' });
  } else {
    next();
  }
});

const app = createApp(App);

app.use(store)
  .use(appWidgetController)
  .use(router)
  .mount('#app');
