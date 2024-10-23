// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/home.vue';
// //import Login from '@/views/login.vue';
// import Shop from '@/views/shop.vue';
// import ReviewForm from '../views/ReviewForm.vue';
// import ShopSearch from '../views/shopSearch.vue';

// const routes = [
//   {
//     path : '/',
//     name:Home,
//     component : Home
//   },
//   {
//     path: '/shop/:ShopId',
//     name: 'Shop',
//     component: Shop,
//     props: true
//   },
//   {
//     path : '/shopSearch',
//     component : ShopSearch
//   },
//   {
//     path : '/review',
//     component : ReviewForm
//   }
// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// });

// export default router;


import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Login from '@/views/login.vue'; // ログインコンポーネントをインポート
import Shop from '@/views/shop.vue';
import ReviewForm from '../views/ReviewForm.vue';
import ShopSearch from '../views/shopSearch.vue';
// import ProtectedPage from '../views/ProtectedPage.vue'; // 保護されたページのインポート
import { Auth } from 'aws-amplify'; // Authをインポート

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } // 認証が必要
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/shop/:ShopId',
    name: 'Shop',
    component: Shop,
    props: true,
    meta: { requiresAuth: true } // 認証が必要
  },
  {
    path: '/shopSearch',
    component: ShopSearch,
    meta: { requiresAuth: true } // 認証が必要
  },
  {
    path: '/review',
    component: ReviewForm,
    meta: { requiresAuth: true } // 認証が必要
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// ルートガードを設定
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        next();
      })
      .catch(() => {
        next('/'); // 認証されていない場合はログインページへリダイレクト
      });
  } else {
    next();
  }
});

export default router;
