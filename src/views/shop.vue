<template>
  <div v-if="!loading" class="shop-container">
    <!-- ヒーローセクション -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-img
        class="hero-image"
        :src="shop.shop_items[0]?.Photo || require('@/assets/nophoto.jpg')"
        :alt="shop.shop_items[0]?.Name || '店舗画像'"
        cover
      ></v-img>
      
      <div class="hero-content">
        <div class="shop-badge">
          <span>{{ shop.shop_items[0].Genre }}</span>
        </div>
        <h1 class="shop-title">{{ shop.shop_items[0].Name }}</h1>
        <div class="shop-rating-container">
          <div class="shop-rating">
            <v-rating
              :model-value="shop.shop_items[0].Rate"
              color="amber"
              density="compact"
              size="small"
              half-increments
              readonly
            ></v-rating>
            <span class="rating-value">{{ shop.shop_items[0].Rate }}</span>
          </div>
          <span class="review-count">{{ shop.review_items.length === 0 ? '利用実績なし' : shop.review_items.length + '件のレビュー' }}</span>
        </div>
        
        <div class="action-buttons">
          <v-btn
            color="white"
            prepend-icon="mdi-share-variant"
            rounded="pill"
            elevation="3"
            variant="flat"
            @click="shareShop"
            class="share-btn"
          >
            シェア
          </v-btn>
          <v-btn
            color="green-darken-1"
            prepend-icon="mdi-star"
            rounded="pill"
            elevation="3"
            @click="goToReview"
            class="review-btn"
          >
            評価する
          </v-btn>
        </div>
      </div>
    </div>

    <!-- コンテンツセクション -->
    <div class="content-section">
      <!-- 店舗情報カード -->
      <v-card class="info-card" elevation="0">
        <h2 class="card-title">店舗情報</h2>
        
        <div class="info-grid">
          <div class="info-item">
            <v-icon icon="mdi-train" color="green-darken-1"></v-icon>
            <div>
              <h3>アクセス</h3>
              <p>{{ shop.shop_items[0].mobile_access }}</p>
            </div>
          </div>
          
          <div class="info-item">
            <v-icon icon="mdi-map-marker" color="green-darken-1"></v-icon>
            <div>
              <h3>住所</h3>
              <p>{{ shop.shop_items[0].Adress }}</p>
            </div>
          </div>
          
          <div class="info-item">
            <v-icon icon="mdi-link" color="green-darken-1"></v-icon>
            <div>
              <h3>公式サイト</h3>
              <a :href="shop.shop_items[0].urls" target="_blank" rel="noopener noreferrer" class="hotpepper-link">
                ホットペッパーグルメで見る
                <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
              </a>
            </div>
          </div>
        </div>
      </v-card>

      <!-- タグと利用実績 -->
      <template v-if="shop.review_items.length !== 0">
        <div class="tags-and-departments">
          <!-- タグ一覧 -->
          <v-card class="tags-card" elevation="0" v-if="shop.tag_items.length > 0">
            <h2 class="card-title">タグ</h2>
            <div class="tags-container">
              <v-chip
                v-for="tag in shop.tag_items" 
                :key="tag.TagName"
                class="tag-chip"
                color="amber-lighten-4"
                variant="flat"
                size="small"
              >
                {{ tag.TagName }}
              </v-chip>
            </div>
          </v-card>
          
          <!-- 利用実績部署 -->
          <v-card class="departments-card" elevation="0">
            <h2 class="card-title">利用実績</h2>
            <div class="departments-container">
              <v-chip
                v-for="(section, index) in uniqueSections" 
                :key="index"
                class="department-chip"
                color="green-lighten-3"
                variant="elevated"
                size="small"
              >
                {{ section }}
              </v-chip>
            </div>
          </v-card>
        </div>

        <!-- 感情分析結果 -->
        <v-card class="sentiment-card" elevation="0">
          <h2 class="card-title">みんなの評価</h2>
          
          <div class="sentiment-content">
            <div class="sentiment-emoji-container">
              <span class="sentiment-emoji">{{ satisfactionEmojis[Math.min(Math.floor(positivePoint / 10), 9)] }}</span>
              <h3 class="sentiment-title">{{ satisfactionComments[Math.min(Math.floor(positivePoint / 10), 9)] }}</h3>
            </div>
            
            <div class="sentiment-bar-container">
              <div class="sentiment-bar">
                <div class="positive-bar" :style="{ width: positivePoint + '%' }"></div>
                <div class="negative-bar" :style="{ width: negativePoint + '%' }"></div>
              </div>
              <div class="percentage-labels">
                <span class="positive-label">{{ positivePoint }}% ポジティブ</span>
                <span class="negative-label">{{ negativePoint }}% ネガティブ</span>
              </div>
            </div>
          </div>
        </v-card>

        <!-- レビューセクション -->
        <div class="reviews-section">
          <div class="reviews-header">
            <h2 class="card-title">レビュー</h2>
            
            <!-- フィルタ -->
            <v-expansion-panels variant="accordion" class="filter-panel">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="filter-title">
                    <v-icon icon="mdi-filter-variant" color="grey-darken-1" class="mr-2"></v-icon>
                    フィルター
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="filter-content">
                    <v-select
                      v-model="userFilter"
                      :items="['幹事', '参加者']"
                      label="ユーザータイプ"
                      clearable
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="filter-select"
                    ></v-select>

                    <v-select
                      v-model="departmentFilter"
                      :items="uniqueSections"
                      label="部署"
                      clearable
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="filter-select"
                    ></v-select>

                    <v-select
                      v-model="ratingFilter"
                      :items="ratingOptions"
                      item-title="title"
                      item-value="value"
                      label="評価（以上）"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="filter-select"
                    ></v-select>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!-- レビュー一覧 -->
          <div class="reviews-container">
            <div v-if="filteredReviews.length > 0">
              <div v-for="review in filteredReviews" :key="review.id" class="review-item">
                <ReviewCard
                  :user="review.Role"
                  :department="review.Section"
                  :comment="review.Comment"
                  :rating="review.Rate"
                  :date="review.ReviewDate"
                  :peopleNum="review.PeopleNum"
                />
              </div>
            </div>
            <div v-else class="no-filtered-reviews">
              <v-icon icon="mdi-filter-remove" size="large" color="grey-lighten-1"></v-icon>
              <p>条件に一致するレビューがありません</p>
            </div>
          </div>
        </div>
      </template>
      
      <template v-else>
        <v-card class="no-reviews-card" elevation="0">
          <v-icon icon="mdi-comment-alert-outline" size="large" color="grey-lighten-1"></v-icon>
          <p>レビューがありませんでした。最初のレビューを投稿してみませんか？</p>
          <v-btn
            color="green-darken-1"
            prepend-icon="mdi-star"
            rounded="pill"
            @click="goToReview"
            class="mt-4"
          >
            評価する
          </v-btn>
        </v-card>
      </template>
    </div>
  </div>

  <!-- ローディングインジケーター -->
  <div v-else class="loading-container">
    <div class="loading-content">
      <v-progress-circular indeterminate color="green-darken-1" size="64"></v-progress-circular>
      <p>店舗情報を読み込み中...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ReviewCard from '../components/data/ReviewCard.vue';

export default {
  name: 'ShopView',
  components: {
    ReviewCard,
  },
  props: {
    ShopId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      shop: {
        shop_items: [],
        review_items: [],
        tag_items: []
      },
      loading: true,
      satisfactionEmojis: ['😈','😡','😒','😅','😐','🙂','😀','😊','🥰','😍'],
      satisfactionComments: ['...','怒','う〜ん','微妙','普通かな','良いかも','良いね！','おすすめ！','また行きたい！','最高！！'],
      emoPoint: 0,
      userFilter: null,
      departmentFilter: null,
      ratingFilter: 0,
      ratingOptions: [
        { title: 'すべて', value: 0 },
        { title: '★1以上', value: 1 },
        { title: '★2以上', value: 2 },
        { title: '★3以上', value: 3 },
        { title: '★4以上', value: 4 },
        { title: '★5のみ', value: 5 }
      ],
      positivePoint: 0,
      negativePoint: 0
    };
  },
  async created() {
    // ショップデータを取得
    try {
      const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/shop', {
        params: { shop_id: this.ShopId }
      });
      this.shop = response.data;
      this.positivePoint = Math.round(this.shop.shop_items[0].positive_percentage);
      this.negativePoint = Math.round(this.shop.shop_items[0].negative_percentage);
      document.title = `${this.shop.shop_items[0].Name} | Easy Kanji`; // ページタイトルを更新する

      console.log("shop",this.shop);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    } finally {
      this.loading = false; // ローディング状態を更新
    }
  },
  computed: {
    // ユニークな部署を取得
    uniqueSections() {
      const sections = this.shop.review_items.map(review => review.Section);
        return [...new Set(sections)];
      },
    // フィルタリングされたレビューを取得
    filteredReviews() {
      return this.shop.review_items.filter(review => {
        const userMatch = !this.userFilter || review.Role === this.userFilter;
        const departmentMatch = !this.departmentFilter || review.Section === this.departmentFilter;
        const ratingMatch = review.Rate >= this.ratingFilter;
        return userMatch && departmentMatch && ratingMatch;
      });
    }
  },
  methods: {
    // ショップをシェアするメソッド
    shareShop() {
      const url = `https://main.d2tcvdo7qdeeoh.amplifyapp.com/shop/${this.ShopId}`;

      // Clipboard APIのサポートを確認
      if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
          alert('URLをコピーしました！');
        }).catch(err => {
          console.error('Failed to copy: ', err);
          alert('URLのコピーに失敗しました。');
        });
      } else {
      // 代替手段: テキストボックスを使って手動コピーを促す
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('URLをコピーしました！');
      }
    },
    // レビュー登録画面へ遷移するメソッド
    goToReview() {
      this.$router.push({
        path: "/review",
        query: { shop_id: this.ShopId } // shop_idをクエリパラメータとして渡す
      });
    }
  },
};
</script>

<style scoped>
  /* 全体のコンテナ */
  .shop-container {
    max-width: 100%;
    margin: 0 auto;
    background-color: #f8f9fa;
  }

  /* ヒーローセクション */
  .hero-section {
    position: relative;
    height: 50vh;
    min-height: 400px;
    max-height: 600px;
    width: 100%;
    overflow: hidden;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
    z-index: 1;
  }

  .hero-image {
    height: 100%;
    width: 100%;
  }

  .hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40px;
    z-index: 2;
    color: white;
  }

  .shop-badge {
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 6px 12px;
    border-radius: 20px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
  }

  .shop-title {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 16px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
  }

  .shop-rating-container {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .shop-rating {
    display: inline-flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 6px 12px;
    border-radius: 20px;
    margin-right: 12px;
  }

  .rating-value {
    font-weight: 700;
    font-size: 16px;
    margin-left: 8px;
    color: #FFC107;
  }

  .review-count {
    font-size: 14px;
    opacity: 0.9;
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    margin-top: 24px;
    max-width: 500px;
    margin: auto;
    justify-content: center;
  }

  .share-btn, .review-btn {
    flex: 1;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 40px;
  }

  .share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .review-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* コンテンツセクション */
  .content-section {
    max-width: 1000px;
    margin: auto;
    padding: 10px 20px;
    position: relative;
    z-index: 3;
  }

  /* 共通カードスタイル */
  .info-card, .tags-card, .departments-card, .sentiment-card, .no-reviews-card {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .card-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #2e7d32;
    position: relative;
    padding-bottom: 10px;
    text-align: center;
  }

  .card-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background-color: #2e7d32;
    border-radius: 3px;
  }

  /* 店舗情報グリッド */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .info-item h3 {
    font-size: 14px;
    font-weight: 600;
    color: #757575;
    margin-bottom: 4px;
  }

  .info-item p {
    font-size: 16px;
    color: #212121;
    line-height: 1.5;
  }

  /* タグと部署カード */
  .tags-and-departments {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 12px;
  }

  .tags-container, .departments-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-chip {
    font-size: 12px;
    font-weight: 500;
  }

  .department-chip {
    font-size: 12px;
    font-weight: 500;
    color: #2e7d32;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* 感情分析カード */
  .sentiment-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sentiment-emoji-container {
    text-align: center;
    margin-bottom: 20px;
  }

  .sentiment-emoji {
    font-size: 48px;
    display: block;
    margin-bottom: 8px;
  }

  .sentiment-title {
    font-size: 18px;
    font-weight: 600;
    color: #424242;
  }

  .sentiment-bar-container {
    width: 100%;
    max-width: 500px;
  }

  .sentiment-bar {
    display: flex;
    height: 24px;
    background-color: #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .positive-bar {
    background-color: #4caf50;
    height: 100%;
    transition: width 0.5s ease-in-out;
  }

  .negative-bar {
    background-color: #f44336;
    height: 100%;
    transition: width 0.5s ease-in-out;
  }

  .percentage-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .positive-label {
    color: #4caf50;
    font-weight: 600;
    font-size: 14px;
  }

  .negative-label {
    color: #f44336;
    font-weight: 600;
    font-size: 14px;
  }

  /* レビューセクション */
  .reviews-section {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .reviews-header {
    margin-bottom: 24px;
  }

  .filter-panel {
    margin-top: 16px;
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }

  .filter-title {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #424242;
  }

  .filter-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 8px 0;
  }

  .filter-select {
    width: 100%;
  }

  .reviews-container {
    margin-top: 16px;
  }

  .review-item {
    margin-bottom: 16px;
  }

  .no-filtered-reviews {
    text-align: center;
    padding: 40px 0;
    color: #757575;
  }

  .no-filtered-reviews p {
    margin-top: 16px;
  }

  /* レビューなしカード */
  .no-reviews-card {
    text-align: center;
    padding: 40px;
  }

  .no-reviews-card p {
    margin: 16px 0;
    color: #616161;
    font-size: 16px;
  }

  /* ローディング */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
  }

  .loading-content {
    text-align: center;
  }

  .loading-content p {
    margin-top: 16px;
    color: #616161;
  }

  /* ホットペッパーリンク */
  .hotpepper-link {
    color: #ff5722;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .hotpepper-link:hover {
    color: #e64a19;
    text-decoration: underline;
  }

  /* レスポンシブ対応 */
  @media (max-width: 768px) {
    .hero-section {
      height: 40vh;
      min-height: 300px;
    }
    
    .hero-content {
      padding: 24px;
    }
    
    .shop-title {
      font-size: 28px;
    }
    
    .content-section {
      /* margin-top: -40px; */
    }
    
    .info-grid {
      grid-template-columns: 1fr;
    }
    
    .tags-and-departments {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      gap: 12px;
    }
    
    .share-btn, .review-btn {
      height: 48px;
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    .hero-content {
      padding: 16px;
    }
    
    .shop-title {
      font-size: 24px;
    }
    
    .shop-badge, .shop-rating {
      padding: 4px 10px;
      font-size: 12px;
    }
    
    .card-title {
      font-size: 18px;
    }
    
    .info-card, .tags-card, .departments-card, .sentiment-card, .reviews-section, .no-reviews-card {
      padding: 16px;
    }
    
    .action-buttons {
      margin-top: 20px;
    }
    
    .share-btn, .review-btn {
      width: 100%;
      height: 52px;
      padding: 12px 16px;
      font-size: 16px;
    }
  }
</style>