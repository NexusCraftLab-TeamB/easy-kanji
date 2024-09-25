import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import Shop from '@/views/shop.vue';
import ShopCheck from '@/views/shopCheck.vue';
import ReviewForm from '../views/ReviewForm.vue';
import ShopSearch from '../views/shopSearch.vue';
import store from '@/store'; // Vuexストアをインポート


const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/',
    component: Login,
    beforeEnter: (to, from, next) => {
      // ストアの状態をリセット
      store.commit('resetState');
      next(); // 次のルートに進む
    }
  },
  {
    path: '/shop',
    component: Shop
  },
  {
    path: '/shopCheck',
    component: ShopCheck
  },
  {
    path: '/shopSearch',
    component: ShopSearch
  },
  {
    path: '/review',
    component: ReviewForm
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
