<template>
    <div class="shop-container">
      <h1>店舗詳細</h1>
            <!-- 店舗の詳細情報を表示 -->
      <div class="shop-details">
        <div class="shop-detailsA">
          <img src="../assets/yoshinoya.jpg" alt="Yoshinoya">
        </div>
        <div class="shop-detailsB">
          <h2>{{ shop.name }}</h2>
          <p>住所:  {{ shop.address }}</p>
          <p>電話番号:  {{ shop.tel }}</p>
        </div>
      </div>

      <!-- シェアとこれで決定ボタン -->
      <div class="action-buttons">
        <button class="share-button" @click="shareShop">シェア</button>
        <button class="confirm-button" @click="confirmShop">これで決定</button>
      </div>

      <div class="detail-container">
      <div class="detail-item">
        <div class="label">利用実績:</div>
        <div class="value">{{ shop.usageCount }}回</div>
      </div>
      <div class="detail-item">
        <div class="label">総合評価:</div>
        <div class="value">{{ shop.rating }}/5</div>
      </div>
      </div>

      <!-- タグ一覧 -->
      <div class="tags">
        <h2 class="heading">タグ</h2>
        <ul>
          <div class="tagsA">
            <span>駅から近い</span>
              <span>有楽町</span>
              <span>五人以上</span>
              <span>和食</span>
              <span>開発一部</span>
              <span>2024.3実績</span>
              <span>開発三部</span>
              <a href="#" class="more-link">more</a>
          </div>
          <!-- 他のタグもここに追加できます -->
        </ul>
      </div>

      <!-- レビュー一覧 -->
      <div class="reviews">
        <h2 class="heading">レビュー</h2>
        <ul>
          <li v-for="review in shop.reviews" :key="review.id">
            <span class="review-user">{{ review.user }}:</span>
            <span class="review-comment">{{ review.comment }}</span>
          </li>
        </ul>
      </div>

      <!-- 画像一覧 -->
      <div class="image-gallery">
        <h3>お店の雰囲気</h3>
        <div class="image-grid">
          <img src="../assets/yoshinoyaIn1.jpg" alt="Yoshinoya">
          <img src="../assets/yoshinoyaIn2.jpg" alt="Yoshinoya2">
          <img src="../assets/yoshinoyaIn3.jpg" alt="Yoshinoya3">
          <!--<img v-for="image in shop.images" :key="image.id" :src="image.url" alt="店内の写真" />-->
        </div>
      </div>
    
  </div>
</template>

  <script>
  export default {
    name: 'ShopView',
    data() {
      return {
        shop: {
          name: '吉野家',
          address: '東京都渋谷区X-X-XX',
          tel: '080-1234-9999',
          photoUrl: 'https://example.com/cafe-a-photo.jpg',
          usageCount: 15,
          rating: 4.5,
          reviews: [
            { id: 1, user: '開発二部', comment: '美味しい料理でした！' },
            { id: 2, user: 'JASTEM開発三部', comment: 'あまり満足できませんでした。' }
            // 他のレビューもここに追加できます
          ],
          images: [
            { id: 1, url: 'https://example.com/image1.jpg' },
            { id: 2, url: 'https://example.com/image2.jpg' },
            { id: 3, url: 'https://example.com/your-image.jpg' }
          ]
        }
      };
    },
    methods: {
      confirmShop() {
        // 店舗決定画面へ遷移する
        this.$router.push("/shopCheck"); 
      },
      shareShop(){
        // 店舗情報を共有する
        this.$router.push("/shopShare"); 
      }
    }
  };
  </script>
  
  <style scoped>
    
  .shop-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%; /* ビューポートの幅を100%に設定 */
    height: 100vh; /* ビューポートの高さを100%に設定 */
    margin: 0; /* 外側の余白をなくす */
    padding: 0; /* 内側の余白をなくす */
    }
  
  .shop-details {
    background-color: #f2f9e9; /* 背景色 */
    background-size: 90% 90%; /* 幅と高さを90%に設定 */
    padding: 20px;
    border-radius: 10px;
    margin-top: 15px;
    width: 90%; 
  }
  .shop-detailsA {
    float: left;
    width: 50%;
    box-sizing: border-box; /* パディングとボーダーを含めたサイズを指定 */
    background-color: #f2f9e9; /* 背景色 */
  }
  .shop-detailsA img {
  max-width: 90%; /* 画像の最大幅を親要素の幅に合わせる */
  height: auto; /* 縦横比を維持して高さを自動調整 */
  }

  .shop-detailsB {
    float: right;
    width: 50%;
    text-align: left;
  }
  
.share-button,
.confirm-button {
    background-color: #97e094;
    color: #fff;
    border: none;
    padding: 15px 80px; /* 内側の余白を増やしてボタンを大きくする */
    font-size: 18px; /* フォントサイズを大きくする */
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s;
}

.share-button:hover,
.confirm-button:hover {
  background-color: #72ac70;
}

.detail-item {
  display: flex;
  margin-top: 20px;
}

.tagsA {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tagsA span {
    background-color: #7ed17e;
}

.tagsA span:hover {
  background-color: #5bb75b;
}

.tagsItems{
  padding: 1px 9px; /* 内側の余白を増やしてボタンを大きくする */
}

.heading {
  align-items: center; /* 横線を上下中央 */
  display: flex; /* 文字と横線を横並び */
  justify-content: center; /* 文字を中央寄せ */
}

.heading::before,
.heading::after {
  background-color: #3bc778; /* 横線の色 */
  border-radius: 5px; /* 横線の両端を丸く */
  content: "";
  height: 10px; /* 横線の高さ */
  width: 300px; /* 横線の長さ */
}

.heading::before {
  margin-right: 15px; /* 文字との余白 */
}
.heading::after {
  margin-left: 15px; /* 文字との余白 */
}

h2 {
  color: #333;
  font-size: 30px;
  font-weight: 700;
  margin-top: 60px;
}
.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #007bff;
}

.reviews {
  margin-top: 20px;
}

.review-user {
  font-weight: bold;
  color: #333;
}

.review-comment {
  color: #555;
}

.image-gallery {
  margin-top: 20px;
}

.image-grid {
  display: center; /* 子要素を横並びにする */
  gap: 100px; /* 画像間のスペースを設定 */
  /*grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));*/
}

.image-grid img {
  max-width: 30%;
  height: auto;
 }
</style>