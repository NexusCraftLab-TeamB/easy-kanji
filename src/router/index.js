import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
//import Login from '@/views/login.vue';
import Shop from '@/views/shop.vue';
import ReviewForm from '../views/ReviewForm.vue';
import ShopSearch from '../views/shopSearch.vue';

const routes = [
  {
    path : '/',
    name:Home,
    component : Home
  },
  {
    path: '/shop/:ShopId',
    name: 'Shop',
    component: Shop,
    props: true
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