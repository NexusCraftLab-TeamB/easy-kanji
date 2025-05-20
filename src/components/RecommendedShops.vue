<template>
  <section class="section-container">
    <div class="section-header">
      <h2>おすすめのお店</h2>
      <!--<a href="#" class="view-all">すべて見る <v-icon>mdi-chevron-right</v-icon></a>-->
    </div>
    <div class="section-divider"></div>
    
    <!-- エラーメッセージ表示 -->
    <div v-if="error" class="error-container">
      <v-icon color="error" size="large">mdi-alert-circle</v-icon>
      <p>{{ error }}</p>
      <v-btn color="primary" variant="text" @click="fetchRecommendedShops">
        再試行
      </v-btn>
    </div>
    
    <!-- ローディング表示 -->
    <div v-else-if="isLoading" class="loading-container">
      <div class="scrollable-content">
        <div v-for="i in 4" :key="`skeleton-${i}`" class="shop-card skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-info">
            <div class="skeleton-title"></div>
            <div class="skeleton-tags">
              <div class="skeleton-tag"></div>
              <div class="skeleton-tag"></div>
              <div class="skeleton-tag"></div>
            </div>
            <div class="skeleton-access"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 店舗表示 -->
    <div v-else class="scrollable-container">
      <div v-if="shops.length === 0" class="no-content-message">
        <v-icon size="large" color="grey">mdi-store-outline</v-icon>
        <p>おすすめ店舗がありません。レビューを投稿するとおすすめ店舗が表示されます。</p>
      </div>
      <div v-else class="scrollable-content">
        <div 
          v-for="(shop, index) in shops.slice(0, 10)" 
          :key="`recommended-${index}`" 
          class="shop-card" 
          @click="navigateToShop(shop.ShopId)"
        >
          <div class="shop-image" :style="`background-image: url(${shop.PicUrl ? shop.PicUrl : require('@/assets/nophoto.jpg')})`">
            <div class="shop-rating" v-if="shop.Rate">
              <v-icon color="amber" size="small">mdi-star</v-icon>
              <span>{{ shop.Rate.toFixed(1) }}</span>
            </div>
            <!-- 順位表示 -->
            <div :class="['shop-rank', index < 3 ? `rank-${index + 1}` : 'rank-other']">
              {{ index + 1 }}
            </div>
          </div>
          <div class="shop-info">
            <h3>{{ shop.Name || 'おすすめ店舗' }}</h3>
            <div class="shop-tags">
              <span>{{ shop.Genre || '-' }}</span>
              <span v-if="shop.Budget">{{ getBudgetName(shop.Budget) }}</span>
              <span v-else>¥{{ Math.floor(Math.random() * 3 + 2) }},000〜</span>
            </div>
            <p class="shop-access">{{ shop.Access || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { budgets } from '@/constants/budgets.js';

export default {
  name: 'RecommendedShops',
  data() {
    return {
      shops: [],
      isLoading: false,
      error: null
    };
  },
  methods: {
    async fetchRecommendedShops() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/home');
        this.shops = response.data;
      } catch (error) {
        console.error('おすすめ店舗の取得に失敗しました:', error);
        this.error = 'おすすめ店舗を読み込めませんでした。';
      } finally {
        this.isLoading = false;
      }
    },
    getBudgetName(budgetCode) {
      const budget = budgets.find(bud => bud.code === budgetCode);
      return budget ? budget.name : budgetCode;
    },
    navigateToShop(shopId) {
      if (!shopId) return;
      this.$router.push(`/shop/${shopId}`);
    }
  },
  mounted() {
    this.fetchRecommendedShops();
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
  background: linear-gradient(to right, #2e7d32, #81c784);
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
  scrollbar-width: thin;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-bottom: 8px;
  padding: 0 2px;
}

.scrollable-container::-webkit-scrollbar {
  height: 8px;
  background-color: #f5f5f5;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #2e7d32;
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-track {
  background-color: #e8f5e9;
  border-radius: 4px;
}

.scrollable-content {
  display: flex;
  gap: 16px;
  padding: 4px 0;
  min-width: max-content;
}

/* 店舗カード */
.shop-card {
  flex: 0 0 auto;
  width: 220px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.shop-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.shop-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

/* 順位表示のスタイル */
.shop-rank {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ffb700);
  border: 1px solid #e6c200;
}

.rank-2 {
  background: linear-gradient(135deg, #c0c0c0, #e0e0e0);
  border: 1px solid #a0a0a0;
}

.rank-3 {
  background: linear-gradient(135deg, #cd7f32, #e0955e);
  border: 1px solid #b06728;
}

.rank-other {
  background: linear-gradient(135deg, #607d8b, #90a4ae);
  border: 1px solid #546e7a;
}

.shop-rating {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.shop-info {
  padding: 16px;
}

.shop-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shop-tags {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.shop-tags span {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  margin-bottom: 4px;
}

.shop-access {
  color: #666;
  font-size: 12px;
  margin: 0;
}

/* スケルトンローディング */
.loading-container {
  overflow-x: auto;
  padding-bottom: 8px;
}

.skeleton-card {
  background-color: #f9f9f9;
}

.skeleton-image {
  height: 160px;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-info {
  padding: 16px;
}

.skeleton-title {
  height: 16px;
  width: 80%;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.skeleton-tag {
  height: 20px;
  width: 60px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-access {
  height: 12px;
  width: 90%;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
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
  .shop-card {
    width: 180px;
  }
  
  .shop-image {
    height: 140px;
  }
  
  .shop-info h3 {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .shop-card {
    width: 160px;
  }
  
  .shop-image {
    height: 120px;
  }
  
  .section-header h2 {
    font-size: 18px;
  }
}
</style> 