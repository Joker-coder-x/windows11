import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Setup from "../views/Setup.vue";
import StartingUp from "../views/StartingUp";

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
