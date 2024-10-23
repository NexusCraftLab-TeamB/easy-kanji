<template>
  <v-app id="inspire">

    <v-main>
      <router-view />
    </v-main>
    <v-footer
      class="pt-10"
    />
  </v-app>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
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
    }
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
}

main {
  background-color: #f7f7f7!important;
}

footer {
  background-color: #f7f7f7!important;
}
</style>