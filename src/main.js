import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "styles/index.scss";
import "utils/common.js";

import appWidgetController from './app-widget-controller';

const app = createApp(App);

app.use(store)
  .use(appWidgetController)
  .use(router)
  .mount('#app');
