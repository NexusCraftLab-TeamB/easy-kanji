<template>
  <v-app id="inspire">

    <v-main>
      <router-view />
    </v-main>
    <v-footer class="pt-10"/>
    <template v-if="$route.path === '/'">
      <button v-if="showScrollButton" @click="scrollToTop" class="scroll-to-top">
        ▲
        <p>TOP</p>
      </button>
    </template>
  </v-app>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      showScrollButton: false, // スクロールボタンの表示フラグ
      items: [
        { title: 'ホーム', route: '/' },
        { title: '店舗評価/登録', route: '/review' },
      ],
    };
  },
  methods: {
    onItemClick(item) {
      console.log(item.title);
      this.$router.push(item.route);
    },
    redirectToHome() {
      this.$router.push('/');
    },
    // スクロールイベントハンドラ
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    // ボタンクリックハンドラ
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
body {
  background-color: #f7f7f7!important;
}
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  padding: 0rem;
}

html {
  font-size: 16px;
}

@media (max-width: 1200px) {
  html {
    font-size: 15px;
  }
}

@media (max-width: 992px) {
  html {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 12px;
  }

  .scroll-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}

main {
  background-color: #f7f7f7!important;
}

footer {
  background-color: #f7f7f7!important;
}

.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  border-radius: 50%;
  background-color: #146a3d;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
}

.scroll-to-top:hover {
  background-color: #0f4e2b;
}

.scroll-to-top p {
  position: relative;
  top: -5px;
  font-size: 10px;
}
</style>