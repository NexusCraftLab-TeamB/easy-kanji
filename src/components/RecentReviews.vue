<template>
  <section class="section-container">
    <div class="section-header">
      <h2>最近投稿されたレビュー</h2>
      <a href="#" class="view-all">すべて見る <v-icon>mdi-chevron-right</v-icon></a>
    </div>
    <div class="section-divider"></div>
    <div class="scrollable-container">
      <div class="scrollable-content">
        <!-- レビューカード -->
        <div v-for="(review, i) in reviews" :key="`review-${i}`" class="review-card">
          <div class="review-header">
            <div class="user-avatar" :style="`background-color: hsl(${i * 40}, 70%, 80%)`">
              <span>{{ review.userInitial || String.fromCharCode(64 + i) }}</span>
            </div>
            <div class="review-meta">
              <div class="user-name">{{ review.userName || '幹事さん' }}</div>
              <div class="review-date">{{ review.date || new Date().toLocaleDateString('ja-JP') }}</div>
            </div>
            <div class="review-rating">
              <v-rating
                :model-value="review.rating || 3 + Math.random() * 2"
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
            <span>{{ review.shopName || `レビュー店舗 ${i}` }}</span>
          </div>
          <p class="review-text">
            {{ review.text || `とても美味しかったです！接客も丁寧で、また行きたいと思います。${i % 2 === 0 ? '雰囲気も良く、デートにもおすすめです。' : '値段もリーズナブルで、コスパ最高でした！'}` }}
          </p>
          <div class="review-photos" v-if="review.photos && review.photos.length > 0">
            <div 
              v-for="(photo, index) in review.photos" 
              :key="`photo-${index}`" 
              class="review-photo" 
              :style="`background-image: url(${photo})`"
            ></div>
          </div>
          <!-- モックデータの場合の写真表示 -->
          <div class="review-photos" v-else-if="i % 3 !== 0">
            <div class="review-photo" :style="`background-image: url(${require('@/assets/home-image0' + (i % 9 + 1) + '.jpg')})`"></div>
            <div class="review-photo" v-if="i % 2 === 0" :style="`background-image: url(${require('@/assets/home-image0' + ((i + 2) % 9 + 1) + '.jpg')})`"></div>
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
      try {
        // 仮のエンドポイント - 実際の実装時に変更してください
        const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/home/RecentReviews');
        this.reviews = response.data;
        console.log("response",response);
      } catch (error) {
        console.error('最近のレビューの取得に失敗しました:', error);
        this.error = '最近のレビューを読み込めませんでした。';
        // エラー時はモックデータを使用
        this.useMockData();
      } finally {
        this.isLoading = false;
      }
    },
    useMockData() {
      // APIが失敗した場合や開発中に使用するモックデータ
      this.reviews = Array(6).fill().map((_, i) => ({
        userInitial: String.fromCharCode(65 + i),
        userName: '幹事さん',
        date: new Date().toLocaleDateString('ja-JP'),
        rating: 3 + Math.random() * 2,
        shopName: `レビュー店舗 ${i + 1}`,
        text: `とても美味しかったです！接客も丁寧で、また行きたいと思います。${i % 2 === 0 ? '雰囲気も良く、デートにもおすすめです。' : '値段もリーズナブルで、コスパ最高でした！'}`,
        photos: i % 3 !== 0 ? [
          require('@/assets/home-image0' + (i % 9 + 1) + '.jpg'),
          ...(i % 2 === 0 ? [require('@/assets/home-image0' + ((i + 2) % 9 + 1) + '.jpg')] : [])
        ] : []
      }));
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
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-4px);
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
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.review-date {
  font-size: 12px;
  color: #888;
}

.review-shop {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.review-text {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.review-photos {
  display: flex;
  gap: 8px;
}

.review-photo {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
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