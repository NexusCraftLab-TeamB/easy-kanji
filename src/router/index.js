import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import Shop from '@/views/shop.vue';
import ReviewForm from '../views/ReviewForm.vue';

const routes = [
  {
    path : '/home',
    component : Home
  },
  {
    path : '/',
    component : Login
  },
  {
    path : '/shop',
    component : Shop
  },
  {
    path : '/review',
    component : ReviewForm
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;