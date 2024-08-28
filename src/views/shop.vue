<template>
    <div class="shop-container">
      <h1>店舗詳細</h1>
  
      <!-- 店舗の詳細情報を表示 -->
      <div class="shop-details">
        <h2>{{ shop.name }}</h2>
        <p>住所: {{ shop.address }}</p>
        <img :src="shop.photoUrl" alt="店舗の写真" />
  
        <!-- シェアとこれで決定ボタン -->
        <div class="action-buttons">
          <button class="share-button">シェア</button>
          <button class="confirm-button">これで決定</button>
        </div>
  
        <div class="detail-item">
          <span class="label">利用実績:</span>
          <span class="value">{{ shop.usageCount }}回</span>
        </div>
        <div class="detail-item">
          <span class="label">総合評価:</span>
          <span class="value">{{ shop.rating }}/5</span>
        </div>
  
        <!-- タグ一覧 -->
        <div class="tags">
          <h3>タグ一覧</h3>
          <ul>
            <li>カフェ</li>
            <li>ランチ</li>
            <li>和食</li>
            <!-- 他のタグもここに追加できます -->
          </ul>
        </div>
  
        <!-- レビュー一覧 -->
        <div class="reviews">
          <h3>レビュー一覧</h3>
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
            <img v-for="image in shop.images" :key="image.id" :src="image.url" alt="店内の写真" />
          </div>
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
          name: 'カフェA',
          address: '東京都渋谷区',
          photoUrl: 'https://example.com/cafe-a-photo.jpg',
          usageCount: 15,
          rating: 4.5,
          reviews: [
            { id: 1, user: 'ユーザーA', comment: '美味しい料理でした！' },
            { id: 2, user: 'ユーザーB', comment: 'あまり満足できませんでした。' }
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
      // ログイン画面への遷移処理はここに追加
    }
  };
  </script>
  
  <style scoped>
  /* カラフルなスタイルをここに追加 */
  .shop-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .shop-details {
    background-color: #f2f9e9; /* 背景色をカラフルな緑に変更 */
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center; /* ボタンを中央に寄せる */
    margin-top: 20px;
  }
  
  .share-button,
.confirm-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.share-button:hover,
.confirm-button:hover {
  background-color: #0056b3;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.image-grid img {
  max-width: 100%;
  border-radius: 5px;
}
</style>