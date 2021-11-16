import { createRouter, createWebHashHistory } from 'vue-router';
import Setup from "../views/Setup.vue";
const Home = () => import("../views/Home.vue");
const StartingUp = () => import("../views/StartingUp");
const Shutdown = () => import("../views/Shutdown");

const routes = [
  {
    path: '/',
    name: 'Setup',
    component: Setup
  },
  {
    path: '/startingup',
    name: 'StartingUp',
    component: StartingUp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/shutdown',
    name: 'Shutdown',
    component: Shutdown
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
