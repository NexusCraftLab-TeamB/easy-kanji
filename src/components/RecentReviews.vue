<template>
  <section class="section-container">
    <div class="section-header">
      <h2>最近投稿されたレビュー</h2>
      <!--<a href="#" class="view-all">すべて見る <v-icon>mdi-chevron-right</v-icon></a> -->
    </div>
    <div class="section-divider"></div>
    
    <!-- エラーメッセージ表示 -->
    <div v-if="error" class="error-container">
      <v-icon color="error" size="large">mdi-alert-circle</v-icon>
      <p>{{ error }}</p>
      <v-btn color="primary" variant="text" @click="fetchRecentReviews">
        再試行
      </v-btn>
    </div>
    
    <!-- ローディング表示 -->
    <div v-else-if="isLoading" class="loading-container">
      <div class="scrollable-content">
        <div v-for="i in 3" :key="`skeleton-${i}`" class="review-card skeleton-card">
          <div class="review-header">
            <!-- アバタースケルトン -->
            <div class="skeleton-avatar"></div>
            <div class="review-meta">
              <!-- 名前スケルトン -->
              <div class="skeleton-text"></div>
              <!-- 日付スケルトン -->
              <div class="skeleton-text-sm"></div>
            </div>
            <!-- 評価スケルトン -->
            <div class="skeleton-rating">
              <div class="rating-placeholder"></div>
            </div>
          </div>
          <!-- 店舗名スケルトン -->
          <div class="skeleton-shop"></div>
          <!-- コメントスケルトン -->
          <div class="skeleton-paragraph">
            <div class="paragraph-line"></div>
            <div class="paragraph-line"></div>
            <div class="paragraph-line"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- レビュー表示 -->
    <div v-else class="scrollable-container">
      <div v-if="reviews.length === 0" class="no-content-message">
        <v-icon size="large" color="grey">mdi-comment-outline</v-icon>
        <p>まだレビューがありません</p>
      </div>
      <div v-else class="scrollable-content">
        <!-- レビューカード -->
        <div 
          v-for="(review, i) in reviews" 
          :key="`review-${i}`" 
          class="review-card"
          @click="navigateToShop(review.ShopId)"
          :class="{ 'clickable': review.ShopId }"
        >
          <div class="review-card-content">
            <div class="review-header">
              <div class="user-avatar" :style="`background-color: hsl(${i * 40}, 70%, 80%)`">
                <span>{{ review.Role ? review.Role.slice(0,1) : 'A' }}</span>
              </div>
              <div class="review-meta">
                <div class="user-name">{{ review.Role || 'NoName' }}</div>
                <div class="review-date">{{ formatReviewDate(review.ReviewDate) || new Date().toLocaleDateString('ja-JP') }}</div>
              </div>
              <div class="review-rating">
                <v-rating
                  :model-value="review.Rate || 3 + Math.random() * 2"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
              </div>
            </div>
            <div class="review-shop">
              <v-icon size="small" color="grey">mdi-storefront</v-icon>
              <span>{{ review.ShopName || `レビュー店舗 ${i}` }}</span>
            </div>
            <p class="review-text">
              {{ review.Comment || '' }}
            </p>
          </div>
          <div v-if="review.ShopId" class="shop-link">
            <v-icon size="small" color="">mdi-arrow-right</v-icon>
            <span>詳細</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecentReviews',
  data() {
    return {
      reviews: [],
      isLoading: false,
      error: null
    };
  },
  methods: {
    async fetchRecentReviews() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/home/RecentReviews');
        const parsedBody = JSON.parse(response.data.body);
        this.reviews = parsedBody;
      } catch (error) {
        console.error('最近のレビューの取得に失敗しました:', error);
        this.error = '最近のレビューを読み込めませんでした。';
      } finally {
        this.isLoading = false;
      }
    },
    formatReviewDate(dateString) {
      if (!dateString) return null;
      
      // dateStringが数値の場合は文字列に変換
      const dateStr = String(dateString);
      
      // yyyymmdd形式の文字列をyyyy/M/d形式に変換
      const year = dateStr.substring(0, 4);
      const month = parseInt(dateStr.substring(4, 6), 10); // 先頭の0を削除するために parseInt を使用
      const day = parseInt(dateStr.substring(6, 8), 10);
      
      return `${year}/${month}/${day}`;
    },
    navigateToShop(shopId) {
      if (!shopId) return;
      
      // Vue Routerを使用して店舗詳細ページに遷移
      this.$router.push(`/shop/${shopId}`);
    }
  },
  mounted() {
    // コンポーネントがマウントされたらレビューを取得
    this.fetchRecentReviews();
  }
};
</script>

<style scoped>
/* セクションコンテナ */
.section-container {
  margin-bottom: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  position: relative;
  min-height: 200px;
}

/* セクション区切り線 */
.section-divider {
  height: 2px;
  background: linear-gradient(to right, #2e7d32, #81c784); /* 緑系のグラデーション */
  margin: 8px 0 20px 0;
  border-radius: 2px;
}

/* セクションヘッダー */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.section-header h2 {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.view-all {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: #666;
}

/* スクロール可能なコンテナ */
.scrollable-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin; /* Firefox */
  -ms-overflow-style: -ms-autohiding-scrollbar; /* IE and Edge */
  padding-bottom: 8px;
  padding: 0 2px; /* セクションのパディングを内側に追加 */
}

.scrollable-container::-webkit-scrollbar {
  height: 8px; /* スクロールバーの高さ */
  background-color: #f5f5f5;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #2e7d32; /* スクロールバーの色を緑に */
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-track {
  background-color: #e8f5e9; /* スクロールバーのトラックの色を薄緑に */
  border-radius: 4px;
}

.scrollable-content {
  display: flex;
  gap: 16px;
  padding: 4px 0;
  min-width: max-content; /* コンテンツが少ない場合でもスクロール可能に */
}

/* レビューカード */
.review-card {
  flex: 0 0 auto;
  width: 300px;
  min-height: 180px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.review-card-content {
  flex: 1;
}

.review-card.clickable {
  cursor: pointer;
}

.review-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #333;
  margin-right: 12px;
}

.review-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  text-align: left;
}

.review-date {
  font-size: 12px;
  color: #888;
  text-align: left;
}

.review-shop {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 10px;
  color: #666;
}

.review-shop span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.review-text {
  font-size: 12px;
  text-align: left;
  line-height: 1.5;
  color: #333;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shop-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-size: 12px;
  color: #2e7d32;
  margin-top: auto;
  padding-top: 4px;
}

/* ローディングスタイル */
.loading-container {
  overflow-x: auto;
  padding-bottom: 8px;
}

.skeleton-card {
  background-color: #f9f9f9;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 12px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-text {
  height: 14px;
  width: 80px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-text-sm {
  height: 12px;
  width: 60px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-rating {
  width: 100px;
}

.rating-placeholder {
  height: 16px;
  width: 100px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-shop {
  height: 10px;
  width: 120px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 8px 0;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-paragraph {
  margin-top: 8px;
}

.paragraph-line {
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 6px;
  animation: pulse 1.5s infinite ease-in-out;
}

.paragraph-line:nth-child(1) {
  width: 100%;
}

.paragraph-line:nth-child(2) {
  width: 90%;
}

.paragraph-line:nth-child(3) {
  width: 80%;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}

/* エラー表示スタイル */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  min-height: 150px;
}

.error-container p {
  margin: 12px 0;
  color: #d32f2f;
  font-size: 14px;
}

/* コンテンツなしメッセージ */
.no-content-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  min-height: 150px;
  color: #666;
}

.no-content-message p {
  margin: 12px 0;
  font-size: 14px;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .review-card {
    width: 260px;
  }
}

@media (max-width: 480px) {
  .review-card {
    width: 240px;
  }
  
  .section-header h2 {
    font-size: 18px;
  }
}
</style> 