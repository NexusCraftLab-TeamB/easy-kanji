<template>
  <v-app id="inspire" class="mt-10">
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

      <v-toolbar-title class="text-start" @click="redirectToHome">イージー幹事</v-toolbar-title>
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
      { title: 'ホーム' },
      { title: '店舗評価/登録' },
      { title: 'ログアウト' }
    ]
  }),
  methods: {
    onItemClick(item) {
      console.log(item.title);
      // 必要に応じて他の処理を追加
    },
    redirectToHome() {
      this.$router.push('/');
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
  padding: 0.5rem;
}

main {
  background-color: #f7f7f7!important;
}
</style>