<template>
  <div>
    <h1>Home</h1>
    <button @click="goToLogin">login</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* スタイルをここに追加 */
</style>