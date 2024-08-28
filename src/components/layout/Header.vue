<template>
  <header class="app-header">
    <h1 @click="redirectToHome">イージー 幹事ぃ</h1>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    redirectToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.app-header {
  background-color: #007148;
  color: white;
  padding: 5px;
  text-align: center;
  cursor: pointer;

  h1 {
    margin: 5px;
  }
}
</style>