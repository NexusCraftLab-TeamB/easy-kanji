<template>
  <div v-if="!loading" class="shop-container">
    <!-- 戻るボタン -->
    <div class="back-button-container">
      <v-btn
        color="white"
        icon
        variant="text"
        elevation="0"
        @click="goBack"
        class="back-btn"
      >
        <v-icon icon="mdi-arrow-left"></v-icon>
      </v-btn>
    </div>
    
    <!-- ヒーローセクション -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-img
        class="hero-image"
        :src="shop.shop_items[0]?.PicUrl || require('@/assets/nophoto.jpg')"
        :alt="shop.shop_items[0]?.Name || '店舗画像'"
        cover
        :gradient="'to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)'"
      ></v-img>
      
      <div class="hero-content">
        <div class="hero-content-inner">
          <div class="shop-badge">
            <v-icon icon="mdi-silverware-fork-knife" size="small" class="mr-1"></v-icon>
            <span>{{ shop.shop_items[0]?.Genre }}</span>
          </div>
          <h1 class="shop-title">{{ shop.shop_items[0]?.Name }}</h1>
          <div class="shop-rating-container">
            <div class="shop-rating">
              <v-rating
                :model-value="shop.shop_items[0]?.Rate"
                color="amber"
                density="compact"
                size="small"
                half-increments
                readonly
              ></v-rating>
              <span class="rating-value">{{ typeof shop.shop_items[0]?.Rate === 'string' ? shop.shop_items[0]?.Rate : shop.shop_items[0]?.Rate?.toFixed(2) }}</span>
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
    </div>

    <!-- コンテンツセクション -->
    <div class="content-section">
      <!-- 店舗情報と評価サマリーセクション -->
      <v-container class="content-container">
        <v-row>
          <!-- 店舗情報カード -->
          <v-col cols="12" md="6">
            <v-card class="info-card" elevation="2" rounded="xl">
              <v-card-title class="info-card-header d-flex align-center">
                <v-icon icon="mdi-store" color="green-darken-1" class="mr-2"></v-icon>
                <h2 class="section-title">店舗情報</h2>
              </v-card-title>
              
              <v-card-text class="pa-0">
                <v-list class="info-list">
                  <v-list-item class="info-list-item">
                    <template v-slot:prepend>
                      <v-avatar color="green-lighten-4" class="info-icon-avatar">
                        <v-icon icon="mdi-train" color="green-darken-1"></v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-subtitle class="info-text">{{ shop.shop_items[0]?.Access }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-divider class="mx-4"></v-divider>
                  
                  <v-list-item class="info-list-item">
                    <template v-slot:prepend>
                      <v-avatar color="green-lighten-4" class="info-icon-avatar">
                        <v-icon icon="mdi-map-marker" color="green-darken-1"></v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-subtitle class="info-text">{{ shop.shop_items[0]?.Address }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-divider class="mx-4"></v-divider>
                  
                  <v-list-item class="info-list-item">
                    <template v-slot:prepend>
                      <v-avatar color="green-lighten-4" class="info-icon-avatar">
                        <v-icon icon="mdi-link" color="green-darken-1"></v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-subtitle>
                      <div>
                        <a :href="shop.shop_items[0]?.ShopUrl" target="_blank" rel="noopener noreferrer" class="hotpepper-link">
                          {{ shop.shop_items[0]?.Flag === 0 ? 'ホットペッパーグルメでみる' : 'WEBサイトでみる' }}
                          <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
                        </a>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- 感情分析結果 -->
          <v-col cols="12" md="6">
            <v-card class="sentiment-card" elevation="2" rounded="xl">
              <v-card-title class="sentiment-card-header d-flex align-center">
                <v-icon icon="mdi-emoticon" color="green-darken-1" class="mr-2"></v-icon>
                <h2 class="section-title">みんなの評価</h2>
              </v-card-title>
              
              <!-- レビューがある場合 -->
              <v-card-text v-if="shop.review_items.length !== 0" class="sentiment-content">
                <div class="sentiment-emoji-container">
                  <span class="sentiment-emoji">{{ satisfactionEmojis[Math.min(Math.floor(positivePoint / 10), 9)] }}</span>
                  <h3 class="sentiment-title">{{ satisfactionComments[Math.min(Math.floor(positivePoint / 10), 9)] }}</h3>
                </div>
                
                <div class="sentiment-bar-container">
                  <div class="sentiment-score">
                    <span class="score-value">{{ positivePoint }}%</span>
                    <span class="score-label">満足度</span>
                  </div>
                  <v-progress-linear
                    class="sentiment-progress"
                    :model-value="positivePoint"
                    color="green-darken-1"
                    height="12"
                    rounded
                  ></v-progress-linear>
                  <div class="percentage-labels">
                    <span class="positive-label">ポジティブ {{ positivePoint }}%</span>
                    <span class="negative-label">ネガティブ {{ negativePoint }}%</span>
                  </div>
                </div>
              </v-card-text>
              
              <!-- レビューがない場合 -->
              <v-card-text v-else class="no-sentiment-content">
                <div class="no-sentiment-container">
                  <v-icon icon="mdi-emoticon-neutral-outline" size="x-large" color="grey-lighten-1"></v-icon>
                  <p>まだ評価がありません</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- タグと利用実績 (レビューがある場合のみ表示) -->
        <v-row v-if="shop.review_items.length !== 0" class="mt-4">
          <!-- タグ一覧 -->
          <v-col cols="12" md="6" v-if="shop.tag_items.length > 0">
            <v-card class="tags-card" elevation="2" rounded="xl">
              <v-card-title class="tags-card-header d-flex align-center">
                <v-icon icon="mdi-tag-multiple" color="green-darken-1" class="mr-2"></v-icon>
                <h2 class="section-title">タグ</h2>
              </v-card-title>
              <v-card-text class="tags-container">
                <v-chip
                  v-for="tag in shop.tag_items" 
                  :key="tag.TagName"
                  class="tag-chip"
                  color="amber-lighten-4"
                  variant="elevated"
                  size="small"
                  label
                >
                  <v-icon start icon="mdi-tag" size="x-small"></v-icon>
                  {{ tag.TagName }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
          
          <!-- 利用実績部署 -->
          <v-col cols="12" md="6">
            <v-card class="departments-card" elevation="2" rounded="xl">
              <v-card-title class="departments-card-header d-flex align-center">
                <v-icon icon="mdi-account-group" color="green-darken-1" class="mr-2"></v-icon>
                <h2 class="section-title">利用実績</h2>
              </v-card-title>
              <v-card-text class="departments-container">
                <v-chip
                  v-for="(section, index) in uniqueSections" 
                  :key="index"
                  class="department-chip"
                  color="green-lighten-3"
                  variant="elevated"
                  size="small"
                  label
                >
                  <v-icon start icon="mdi-office-building" size="x-small"></v-icon>
                  {{ section }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- レビューセクション (レビューがある場合のみ表示) -->
        <v-row class="mt-4">
          <v-col cols="12">
            <v-card v-if="shop.review_items.length !== 0" class="reviews-section" elevation="2" rounded="xl">
              <v-card-title class="reviews-header d-flex align-center">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-comment-multiple" color="green-darken-1" class="mr-2"></v-icon>
                  <h2 class="section-title">レビュー</h2>
                  <v-chip class="ml-3 review-count-chip" color="green-lighten-5" size="small">
                    <span>{{ shop.review_items.length }}件</span>
                  </v-chip>
                </div>
                <v-spacer></v-spacer>
                <v-btn
                  color="green-darken-1"
                  variant="elevated"
                  rounded="pill"
                  prepend-icon="mdi-star"
                  @click="goToReview"
                  class="review-action-btn"
                  size="small"
                >
                  評価する
                </v-btn>
              </v-card-title>
              
              <!-- フィルタ -->
              <v-card-text class="pa-0">
                <v-sheet class="filter-sheet mx-4 my-2">
                  <v-expand-transition>
                    <v-card class="filter-card" flat>
                      <v-expansion-panels variant="accordion" class="filter-panel">
                        <v-expansion-panel>
                          <v-expansion-panel-title>
                            <div class="filter-title">
                              <v-icon icon="mdi-filter-variant" color="green-darken-1" class="mr-2"></v-icon>
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
                    </v-card>
                  </v-expand-transition>
                </v-sheet>

                <!-- レビュー一覧 -->
                <div class="reviews-container">
                  <transition-group name="review-transition">
                    <div v-if="filteredReviews.length > 0" key="reviews">
                      <v-row class="reviews-grid">
                        <v-col v-for="review in filteredReviews" :key="review.id" cols="12" sm="6" md="6" lg="4" xl="4" class="review-grid-item">
                          <ReviewCard
                            :user="review.Role"
                            :department="review.Section"
                            :comment="review.Comment"
                            :rating="review.Rate"
                            :date="review.ReviewDate"
                            :peopleNum="review.PeopleNum"
                          />
                        </v-col>
                      </v-row>
                    </div>
                    <div v-else class="no-filtered-reviews" key="no-reviews">
                      <v-icon icon="mdi-filter-remove" size="large" color="grey-lighten-1"></v-icon>
                      <p>条件に一致するレビューがありません</p>
                      <v-btn
                        color="grey-darken-1"
                        variant="text"
                        size="small"
                        prepend-icon="mdi-filter-remove-outline"
                        @click="clearFilters"
                        class="mt-3"
                      >
                        フィルターをクリア
                      </v-btn>
                    </div>
                  </transition-group>
                </div>
              </v-card-text>
            </v-card>
            
            <!-- レビューがない場合 -->
            <v-card v-else class="no-reviews-card" elevation="2" rounded="xl">
              <v-card-text class="no-reviews-content">
                <v-icon icon="mdi-comment-alert-outline" size="x-large" color="grey-lighten-1"></v-icon>
                <p>レビューがありませんでした。最初のレビューを投稿してみませんか？</p>
                <v-btn
                  color="green-darken-1"
                  prepend-icon="mdi-star"
                  rounded="pill"
                  elevation="2"
                  @click="goToReview"
                  class="mt-4 review-cta-btn"
                >
                  評価する
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>

  <!-- ローディングインジケーター -->
  <div v-else class="loading-container">
    <div class="loading-content">
      <v-progress-circular indeterminate color="green-darken-1" size="64"></v-progress-circular>
      <p>店舗情報を読み込み中...</p>
    </div>
  </div>

  <!-- レビューモーダル -->
  <ReviewModal 
    :is-open="isReviewModalOpen" 
    :shop-id="ShopId"
    @close="closeReviewModal"
    @review-submitted="handleReviewSubmitted"
  />
</template>

<script>
import axios from 'axios';
import ReviewCard from '../components/data/ReviewCard.vue';
import ReviewModal from '../components/forms/ReviewModal.vue';

export default {
  name: 'ShopView',
  components: {
    ReviewCard,
    ReviewModal
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
      negativePoint: 0,
      isReviewModalOpen: false
    };
  },
  async created() {
    // ショップデータを取得
    try {
      const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/shop', {
        params: { shop_id: this.ShopId }
      });
      this.shop = response.data;
      document.title = `${this.shop.shop_items[0]?.Name} | Easy Kanji`; // ページタイトルを更新する
      this.positivePoint = Math.round(this.shop.shop_items[0].positive_percentage);
      this.negativePoint = Math.round(this.shop.shop_items[0].negative_percentage);

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
      const url = `https://main.d3svezmi1xi8mk.amplifyapp.com//shop/${this.ShopId}`;

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
      this.isReviewModalOpen = true;
    },
    // レビューモーダルを閉じるメソッド
    closeReviewModal() {
      this.isReviewModalOpen = false;
    },
    // レビュー登録完了時のハンドラ
    async handleReviewSubmitted() {
      // 店舗データを再取得して最新のレビューを表示
      try {
        const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/shop', {
          params: { shop_id: this.ShopId }
        });
        this.shop = response.data;
        this.positivePoint = Math.round(this.shop.shop_items[0].positive_percentage);
        this.negativePoint = Math.round(this.shop.shop_items[0].negative_percentage);
      } catch (error) {
        console.error('Error refreshing shop data:', error);
      }
    },
    clearFilters() {
      this.userFilter = null;
      this.departmentFilter = null;
      this.ratingFilter = 0;
    },
    goBack() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
  /* 戻るボタン */
  .back-button-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 10;
  }

  .back-btn {
    background-color: rgba(0, 0, 0, 0.3) !important;
    backdrop-filter: blur(5px);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
  }

  .back-btn:hover {
    background-color: rgba(0, 0, 0, 0.5) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
  }

  /* 全体のコンテナ */
  .shop-container {
    max-width: 100%;
    margin: 0 auto;
    background-color: #f8f9fa;
  }

  /* ローディングコンテナ */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f8f9fa;
    z-index: 999;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.5s ease-out;
  }

  .loading-content p {
    margin-top: 16px;
    color: #616161;
    font-size: 16px;
    font-weight: 500;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ヒーローセクション */
  .hero-section {
    position: relative;
    height: 60vh;
    min-height: 450px;
    max-height: 700px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
  }

  .hero-image {
    height: 100%;
    width: 100%;
    transform: scale(1.05);
    transition: transform 10s ease;
  }

  .hero-section:hover .hero-image {
    transform: scale(1);
  }

  .hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 60px 40px;
    z-index: 2;
    color: white;
    text-align: center;
  }

  .hero-content-inner {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .shop-badge {
    display: inline-flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 30px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .shop-title {
    font-size: 42px;
    font-weight: 800;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .shop-rating-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shop-rating {
    display: inline-flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 30px;
    margin-right: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .rating-value {
    font-weight: 700;
    font-size: 18px;
    margin-left: 8px;
    color: #FFC107;
  }

  .review-count {
    font-size: 15px;
    opacity: 0.9;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 6px 12px;
    border-radius: 20px;
  }

  .action-buttons {
    display: flex;
    gap: 20px;
    margin-top: 24px;
    max-width: 500px;
    margin: auto;
    justify-content: center;
    width: 100%;
  }

  .share-btn, .review-btn {
    flex: 1;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    height: 48px;
    max-width: 200px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .share-btn {
    background-color: rgba(255, 255, 255, 0.9) !important;
    color: #333 !important;
  }

  .share-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background-color: white !important;
  }

  .review-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  /* コンテンツセクション */
  .content-section {
    max-width: 1200px;
    margin: auto;
    padding: 0 20px;
    position: relative;
    z-index: 3;
  }

  .content-container {
    padding: 10px 0px;
  }

  /* 店舗情報と評価サマリーセクション */
  .shop-summary-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  /* タグと利用実績コンテナ */
  .tags-departments-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  /* 共通カードスタイル */
  .info-card, .tags-card, .departments-card, .sentiment-card, .reviews-section, .no-reviews-card {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
  }

  .info-card:hover, .tags-card:hover, .departments-card:hover, .sentiment-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1) !important;
  }

  /* カードヘッダー */
  .info-card-header, .tags-card-header, .departments-card-header, .sentiment-card-header, .reviews-header {
    background-color: #f8faf8;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  /* セクションタイトル */
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #2e7d32;
    margin: 0;
  }

  /* 店舗情報リスト */
  .info-list {
    padding: 0;
  }

  .info-list-item {
    padding: 16px 24px;
    min-height: auto;
    align-items: flex-start;
  }

  .info-icon-avatar {
    margin-right: 16px;
    flex-shrink: 0;
  }

  .info-title {
    font-size: 14px;
    font-weight: 600;
    color: #757575;
    margin-bottom: 6px;
  }

  .info-text {
    font-size: 14px;
    color: #212121;
    line-height: 1.6;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    white-space: normal;
    display: block;
    text-align: left;
  }

  /* 感情分析カード */
  .sentiment-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
  }

  /* レビューがない場合の感情分析カード */
  .no-sentiment-content {
    padding: 24px;
  }

  .no-sentiment-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px 0;
  }

  .no-sentiment-container p {
    margin-top: 16px;
    color: #757575;
    font-size: 15px;
  }

  .first-review-btn {
    margin-top: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .first-review-btn:hover {
    background-color: rgba(46, 125, 50, 0.1);
    transform: translateY(-1px);
  }

  .sentiment-emoji-container {
    text-align: center;
    margin-bottom: 12px;
  }

  .sentiment-emoji {
    font-size: 36px;
    display: block;
  }

  .sentiment-title {
    font-size: 18px;
    font-weight: 600;
    color: #424242;
  }

  .sentiment-bar-container {
    width: 100%;
  }

  .sentiment-score {
    text-align: center;
    margin-bottom: 12px;
  }

  .score-value {
    font-size: 32px;
    font-weight: 700;
    color: #2e7d32;
  }

  .score-label {
    font-size: 14px;
    color: #757575;
    margin-left: 8px;
  }

  .sentiment-progress {
    margin-bottom: 12px;
  }

  .percentage-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .positive-label {
    color: #4caf50;
    font-weight: 600;
    font-size: 12px;
  }

  .negative-label {
    color: #f44336;
    font-weight: 600;
    font-size: 12px;
  }

  /* タグとチップ */
  .tags-container, .departments-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 24px;
  }

  .tag-chip, .department-chip {
    font-size: 12px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }

  .tag-chip:hover, .department-chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* レビューセクション */
  .reviews-section {
    margin-bottom: 40px;
    overflow: hidden;
  }

  .reviews-header {
    padding: 16px 24px;
    background-color: #f8faf8;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .review-count-chip {
    font-weight: 600;
    font-size: 12px;
  }

  .review-action-btn {
    font-weight: 600;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .review-action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .filter-sheet {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .filter-card {
    margin: 0;
    background-color: #fafafa;
  }

  .filter-panel {
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
  }

  .filter-title {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #424242;
    font-size: 14px;
  }

  .filter-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px 0 8px;
  }

  .filter-select {
    width: 100%;
  }

  .reviews-container {
    padding: 16px 24px 24px;
  }

  .reviews-grid {
    margin: 0 -8px;
  }

  .review-grid-item {
    padding: 8px;
    transition: all 0.3s ease;
  }

  .review-transition-enter-active,
  .review-transition-leave-active {
    transition: all 0.5s ease;
  }

  .review-transition-enter-from,
  .review-transition-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .no-filtered-reviews {
    text-align: center;
    padding: 40px 0;
    color: #757575;
    background-color: #f5f5f5;
    border-radius: 12px;
    margin: 8px;
  }

  .no-filtered-reviews p {
    margin-top: 16px;
    font-size: 15px;
  }

  /* レビューなしカード */
  .no-reviews-content {
    text-align: center;
    padding: 40px;
  }

  .no-reviews-content p {
    margin: 16px 0;
    color: #616161;
    font-size: 16px;
  }

  .review-cta-btn {
    min-width: 160px;
    font-weight: 600;
    letter-spacing: 0.5px;
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
  @media (max-width: 960px) {
    .back-button-container {
      top: 16px;
      left: 16px;
    }

    .back-btn {
      width: 36px;
      height: 36px;
    }

    .content-container {
      padding: 30px 0px;
    }

    .content-section {
      margin-top: -20px;
    }
    
    .hero-section {
      height: 55vh;
    }
    
    .shop-title {
      font-size: 36px;
    }
  }

  @media (max-width: 768px) {
    .back-button-container {
      top: 12px;
      left: 12px;
    }
    
    .hero-section {
      height: 50vh;
      min-height: 350px;
    }
    
    .hero-content {
      padding: 40px 24px;
    }
    
    .shop-title {
      font-size: 32px;
    }
    
    .shop-badge {
      padding: 6px 14px;
      font-size: 13px;
    }
    
    .shop-rating {
      padding: 6px 14px;
    }
    
    .rating-value {
      font-size: 16px;
    }
    
    .review-count {
      font-size: 14px;
    }
    
    .action-buttons {
      gap: 16px;
    }
    
    .share-btn, .review-btn {
      height: 44px;
    }
    
    .info-list-item {
      padding: 12px 16px;
    }
    
    .info-icon-avatar {
      margin-right: 12px;
      width: 36px !important;
      height: 36px !important;
    }
    
    .info-text {
      font-size: 13px;
    }
    
    .sentiment-emoji {
      font-size: 32px;
    }
    
    .score-value {
      font-size: 28px;
    }
    
    .reviews-header {
      align-items: flex-start;
      gap: 12px;
    }
    
    .review-action-btn {
      align-self: flex-start;
    }
    
    .filter-content {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .reviews-grid {
      margin: 0 -4px;
    }
    
    .review-grid-item {
      padding: 4px;
    }
  }

  @media (max-width: 480px) {
    .back-button-container {
      top: 10px;
      left: 10px;
    }

    .back-btn {
      width: 32px;
      height: 32px;
    }

    .content-section {
      padding: 0 12px;
      /* margin-top: -20px; */
    }
    
    .hero-section {
      height: 45vh;
      min-height: 300px;
    }
    
    .hero-content {
      padding: 30px 16px;
    }
    
    .shop-title {
      font-size: 26px;
      margin-bottom: 16px;
    }
    
    .shop-badge {
      padding: 5px 12px;
      font-size: 12px;
      margin-bottom: 14px;
    }
    
    .shop-rating {
      padding: 5px 12px;
      margin-right: 10px;
    }
    
    .rating-value {
      font-size: 15px;
    }
    
    .review-count {
      font-size: 12px;
      padding: 4px 10px;
    }
    
    .action-buttons {
      gap: 12px;
      margin-top: 0px;
    }
    
    .share-btn, .review-btn {
      height: 42px;
      font-size: 14px;
    }
    
    .section-title {
      font-size: 16px;
    }
    
    .info-card-header, .tags-card-header, .departments-card-header, .sentiment-card-header,
    .info-list-item, .tags-container, .departments-container, .sentiment-content, .reviews-container {
      padding: 12px 16px;
    }
    
    .info-icon-avatar {
      width: 32px !important;
      height: 32px !important;
      min-width: 32px !important;
    }
    
    .info-text {
      font-size: 12px;
      line-height: 1.5;
    }
    
    .sentiment-emoji {
      font-size: 24px;
    }
    
    .score-value {
      font-size: 24px;
    }
    
    .filter-content {
      grid-template-columns: 1fr;
    }
    
    .reviews-container {
      padding: 12px 16px 16px;
    }
    
    .filter-sheet {
      margin: 0 8px 12px;
    }
    
    .filter-title {
      font-size: 13px;
    }
    
    .review-count-chip {
      font-size: 11px;
    }
    
    .reviews-grid {
      margin: 0;
    }
    
    .review-grid-item {
      padding: 4px 0;
    }
    
    .no-filtered-reviews {
      padding: 30px 0;
      margin: 4px 0;
    }
    
    .no-filtered-reviews p {
      font-size: 14px;
    }
  }
</style>