import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import Shop from '@/views/shop.vue';
import ShopCheck from '@/views/shopCheck.vue';
import ShopShare from '@/views/shopShare.vue';
import ReviewForm from '../views/ReviewForm.vue';
import ShopSearch from '../views/shopSearch.vue';

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
    path : '/shopCheck',
    component : ShopCheck
  },
  {
    path : '/shopShare',
    component : ShopShare
  },
  {
    path : '/shopSearch',
    component : ShopSearch
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