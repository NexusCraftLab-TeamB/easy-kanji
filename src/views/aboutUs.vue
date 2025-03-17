<template>
  <div class="about-container">
    <!-- ✅ 画像を上部に表示 -->
    <img src="@/assets/AboutUs.jpg" alt="About Easy Kanji" class="about-image">

    <!-- ✅ 画像の下にコンテンツを配置 -->
    <div class="text-content">
      <h1>Easy Kanji について</h1>
      <p>Easy Kanji は、最適な店舗を探すための検索サイトです。</p>
      <h1>できること</h1>
      <h2>キーワードから検索：</h2>
      <p>テキストボックスに記載された言葉でいろいろ考慮しながら検索します。</p>
      <p>利用実績がある店舗が優先されます。</p>

      <h2>カテゴリから検索：</h2>
      <p>条件を指定して検索します。実績がある店舗が優先されます。</p>
      
      <h2>検索結果にない店舗を登録する：</h2>
      <p>いくら検索しても店舗が出てこない。そんな時に利用します。</p>
      <p>登録した店舗の修正はできないので、慎重に登録しましょう。</p>
      <p>登録した店舗は、カテゴリから名前検索すると見つかりやすいです。</p>

      <router-link to="/" class="back-button">戻る</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs"
};
</script>

<style scoped>
/* ✅ 全体のコンテナ */
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  text-align: center;
}

/* ✅ 画像のスタイル */
.about-image {
  width: 100%;
  height: auto;
  max-height: 700px; /* 高さを制限 */
  object-fit: cover; /* 画像の比率を保ちつつリサイズ */
}

/* ✅ 画像の下に表示するテキスト */
.text-content {
  max-width: 800px;
  padding: 20px;
}

/* ✅ 見出し */
h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #1b5e20;
}

/* ✅ 説明文 */
p {
  font-size: 18px;
  margin-bottom: 20px;
}

/* ✅ 戻るボタン */
.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.back-button:hover {
  background-color: #1b5e20;
}
</style>