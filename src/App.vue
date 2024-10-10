<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="onItemClick(item)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app color="green">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-start cursor-pointer" @click="redirectToHome">イージー幹事</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
      { title: 'ホーム', route: '/home' },
      { title: '店舗評価/登録', route: '/review' },
      { title: 'ログアウト', route: '/' }
    ]
  }),
  methods: {
    onItemClick(item) {
      console.log(item.title);
      this.$router.push(item.route);
    },
    redirectToHome() {
      this.$router.push('/home');
    }
  }
};
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

main {
  background-color: #f7f7f7!important;
}
</style>
