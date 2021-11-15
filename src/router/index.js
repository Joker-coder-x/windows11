import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Setup from "../views/Setup.vue";
import StartingUp from "../views/StartingUp";
import Shutdown from "../views/Shutdown";

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
