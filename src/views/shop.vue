<template>
  <div v-if="!loading" class="shop-container">
    <div class="w-100 pt-3">
      <v-card
        :disabled="loading"
        :loading="loading"
        class="mx-auto mb-6"
        max-width="600"
      >
        <v-img
          max-height="600"
          max-width="600"
          :src="shop.shop_items[0].Photo || require('@/assets/nophoto.jpg')"
          :alt="shop.shop_items[0].Name"
          cover
        ></v-img>

        <v-card-item>
          <!-- 店名 -->
          <v-card-title class="pa-2">
            <h1 class="font-weight-bold mt-0 text-wrap text-h5">
              {{ shop.shop_items[0].Name }}
            </h1>
          </v-card-title>

          <v-row class="my-1 mx-0 justify-center align-center">
            <v-rating
              :model-value="shop.shop_items[0].Rate"
              color="amber"
              density="compact"
              size="normal"
              class="pb-1"
              half-increments
              readonly
            ></v-rating>

            <p class="ms-2 mb-1 text-h6 font-weight-bold text-orange-darken-4">{{ shop.shop_items[0].Rate }}</p>
            <span class="text-grey ms-1">
              ({{ shop.review_items.length === 0 ? '利用実績なし' : shop.review_items.length + '件' }})
            </span>
          </v-row>

          <!-- ジャンル -->
          <v-card-subtitle class="py-1" color="grey-darken-2">
            <v-icon icon="mdi-silverware-fork-knife" size="small" class="me-1 pb-1"></v-icon>
            <span>{{ shop.shop_items[0].Genre }}</span>
          </v-card-subtitle>

          <!-- アクセス -->
           <v-card-subtitle class="py-1" color="grey-darken-2">
            <v-icon icon="mdi-train" size="small" class="me-1 pb-1"></v-icon>
            <span>{{ shop.shop_items[0].mobile_access }}</span>
          </v-card-subtitle>

          <!-- 店舗情報 -->
            <!-- 住所 -->
            <v-card-subtitle class="mx-1">
              <v-icon icon="mdi-map-marker" size="small" class="me-1 pb-1"></v-icon>
              <span class="me-1">{{ shop.shop_items[0].Adress }}</span>
            </v-card-subtitle>
            <!-- ホットペッパーリンク -->
            <v-card-subtitle class="mx-1">
              <v-icon icon="mdi-link" size="small" class="me-1 pb-1"></v-icon>
              <a :href="shop.shop_items[0].urls" target="_blank" rel="noopener noreferrer" class="me-1">ホットペッパーグルメで見る</a>
            </v-card-subtitle>
        </v-card-item>

        <v-divider class="mx-4 mb-1"></v-divider>

        <!-- レビューセクション -->
        <template v-if="shop.review_items.length !== 0">
          <!-- タグ一覧 -->
          <v-card-subtitle class="my-1">タグ</v-card-subtitle>
          <div class="px-4 mb-2">
            <v-chip-group :mandatory="false" :center-active="true">
              <v-chip
                v-for="tag in shop.tag_items" 
                :key="tag.TagName"
                class="ma-1 custom-active-class"
                variant="flat"
              >
                {{ tag.TagName }}
              </v-chip>
            </v-chip-group>
          </div>

          <!-- 実績部署一覧 -->
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-subtitle class="my-1">利用実績</v-card-subtitle>
          <div class="px-4 mb-2">
            <v-chip-group :mandatory="false" :center-active="true">
              <v-chip
                v-for="(section, index) in uniqueSections" 
                :key="index"
                class="ma-1"
                variant="outlined"
              >
                {{ section }}
              </v-chip>
            </v-chip-group>
          </div>
        </template>

        <!-- ボタンセクション -->
        <div class="py-5">
          <v-row justify="center">
            <v-col cols="10" md="8">
              <v-row>
                <v-col cols="6">
                  <v-btn
                    color="light-green-lighten-5"
                    prepend-icon="mdi-share"
                    rounded="lg"
                    elevation="1"
                    size="x-large"
                    text="シェア"
                    block
                    @click="shareShop"
                  ></v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    color="green-darken-1"
                    prepend-icon="mdi-check"
                    rounded="lg"
                    elevation="1"
                    size="x-large"
                    text="評価する"
                    block
                    @click="goToReview"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>

    <!-- レビュー表示 -->
    <template v-if="shop.review_items.length !== 0">
      <div class="review-container w-100">
        <h2 class="heading">レビュー</h2>

        <!-- 感情分析結果 -->
        <div class="mb-2 mx-auto pt-0 emotion-results">
          <v-card-subtitle class="mt-1">＼  <span class="font-weight-bold">{{ satisfactionComments[Math.min(Math.floor(positivePoint / 10), 9)] }}</span>  ／</v-card-subtitle>
          <span class="large-emoji">{{ satisfactionEmojis[Math.min(Math.floor(positivePoint / 10), 9)] }}</span>
          <div class="sentiment-bar">
            <div class="positive-bar" :style="{ width: positivePoint + '%' }"></div>
            <div class="negative-bar" :style="{ width: negativePoint + '%' }"></div>
          </div>
          <div class="percentage-labels">
            <span class="positive-label">{{ positivePoint }}% ポジティブ</span>
            <span class="negative-label">{{ negativePoint }}% ネガティブ</span>
          </div>
        </div>

        <!-- フィルタ -->
        <v-container fluid>
          <v-row justify="space-between" align="center" gutter="16">
            <!-- ユーザーフィルタ -->
            <v-select
              v-model="userFilter"
              :items="['幹事', '参加者']"
              label="ユーザータイプ"
              clearable
              class="tight-spacing"
              style="width: 150px;"
            ></v-select>

            <!-- 部署フィルタ -->
            <v-select
              v-model="departmentFilter"
              :items="uniqueSections"
              label="部署"
              clearable
              class="tight-spacing"
              style="width: 150px;"
            ></v-select>

            <!-- 評価フィルタ -->
            <v-slider
              v-model="ratingFilter"
              :min="0"
              :max="5"
              step="0.5"
              ticks
              class="tight-spacing"
              label="評価"
              thumb-label
              style="max-width: 300px;"
            ></v-slider>
          </v-row>
        </v-container>

        <!-- フィルタリングされたレビュー一覧 -->
        <v-row align="center" justify="center" dense class="reviews">
          <v-col cols="11" v-for="review in filteredReviews" :key="review.id">
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
    </template>
    <template v-else>
      <p class="no-reviews-message">レビューがありませんでした。</p>
    </template>
  </div>

  <!-- ローディングインジケーター -->
  <div v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
      positivePoint: 0,
      negativePoint: 0
    };
  },
  async created() {
    // ショップデータを取得
    try {
      const response = await axios.get('https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/shop', {
        params: { shop_id: this.ShopId }
      });
      this.shop = response.data;
      this.positivePoint = Math.round(this.shop.shop_items[0].positive_percentage);
      this.negativePoint = Math.round(this.shop.shop_items[0].negative_percentage);
      document.title = `${this.shop.shop_items[0].Name} | Easy Kanji`; // ページタイトルを更新する
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
  .filter-container {
    background-color: #f7f7f7; /* ここを全体の背景色に合わせて変更 */
    padding: 20px;
    border-radius: 10px;
  }

  .shop-container {
    max-width: 800px;
    margin: auto;
  }
  
  .review-container {
    margin-top: 20px;
  }

  .heading {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 8px;
  }

  .no-reviews-message {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    color: grey; 
  }

  .image-gallery {
    margin: 40px 0;
    text-align: center;
  }

  .image-grid {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .image-grid img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .custom-active-class {
    background-color: #FFC107 !important;
    color: black !important;
  }

  .large-emoji {
    font-size: 1.5em; /* 必要に応じてサイズを調整 */
    padding: 5px; /* パディングを追加 */
    margin-bottom: 0.3rem;
    border-radius: 5px; /* 角を丸くする */
  }

  /* 感情分析グラフ */
  .emotion-results {
    max-width: 800px;
  }
  .sentiment-bar {
    display: flex;
    width: 80%;
    height: 30px;
    margin: 0 auto;
    background-color: #e0e0e0;
    border-radius: 15px;
    overflow: hidden;
  }

  .positive-bar {
    background-color: #4caf50; /* 緑色 */
    height: 100%;
  }

  .negative-bar {
    background-color: #f44336; /* 赤色 */
    height: 100%;
  }

  .percentage-labels {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 10px auto 0px auto;
  }

  .v-select, .v-slider {
    margin-bottom: 0; /* 各フィルタの下の余白を取り除く */
  }
  
  .custom-active-class {
      background-color: #FFC107 !important;
      color: black !important;
  }

  .positive-label {
    color: #4caf50;
    font-weight: bold;
    font-size: 0.8em;
  }

  .negative-label {
    color: #f44336;
    font-weight: bold;
    font-size: 0.8em;
  }
</style>