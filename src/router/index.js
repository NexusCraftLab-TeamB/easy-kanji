import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import Shop from '@/views/shop.vue';

const routes = [
  {
    path : '/',
    component : Home
  },
  {
    path : '/login',
    component : Login
  },
  {
    path : '/shop',
    component : Shop
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;