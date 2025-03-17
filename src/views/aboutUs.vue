<template>
  <div class="about-container">
    <h1>Easy Kanji について</h1>
    <p>Easy Kanji は、最適な店舗を探すための検索サイトです。</p>
    <router-link to="/" class="back-button">戻る</router-link>
  </div>
</template>

<script>
export default {
  name: "AboutUs"
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #1b5e20;
}
</style>