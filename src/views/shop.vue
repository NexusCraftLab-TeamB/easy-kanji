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
          :src="this.shop.shop_items[0].Photo ? this.shop.shop_items[0].Photo : require('@/assets/yoshinoya.jpg')"
          :alt="this.shop.shop_items[0].Name"
          cover
        ></v-img>

        <v-card-item>
          <!-- 店名 -->
          <v-card-title class="pa-2">
            <h1 class="font-weight-bold mt-0 text-wrap text-h5">
              {{ this.shop.shop_items[0].Name }}
            </h1>
          </v-card-title>

          <!-- 評価 -->
          <v-row
           class="my-1 mx-0 justify-center align-center"
          >
            <v-rating
              :model-value="shop.shop_items[0].Rate"
              color="amber"
              density="compact"
              size="normal"
              class="pb-1"
              half-increments
              readonly
            ></v-rating>

            <div class="text-grey ms-2">
              {{ this.shop.shop_items[0].Rate }} ({{ shop.review_items.length === 0 ? '利用実績なし' : shop.review_items.length + '件' }})
            </div>
          </v-row>

          <!-- ジャンル -->
          <v-card-subtitle class="py-4" color="grey-darken-2">
            <v-icon
              icon="mdi-silverware-fork-knife"
              size="small"
              class="me-1 pb-1"
            ></v-icon>
            <span class="">{{ this.shop.shop_items[0].Genre }}</span>
          </v-card-subtitle>

          <!-- 店舗情報 -->
          <v-row align="center" justify="center" class="pt-1 pb-2">
            <!-- 住所 -->
            <v-card-subtitle class="mx-1">
              <v-icon
                icon="mdi-map-marker"
                size="small"
                class="me-1 pb-1"
              ></v-icon>
              <span class="me-1">{{ this.shop.shop_items[0].Adress }}</span>
            </v-card-subtitle>
            <!-- ホットペッパーリンク -->
            <v-card-subtitle class="mx-1">
               <v-icon
                icon="mdi-link"
                size="small"
                class="me-1 pb-1"
               ></v-icon>
              <a :href="this.shop.shop_items[0].urls" target="_blank" rel="noopener noreferrer" class="me-1">ホットペッパーグルメで見る</a>
            </v-card-subtitle>
          </v-row>
        </v-card-item>

        <v-divider class="mx-4 mb-1"></v-divider>

        <template v-if="shop.review_items.length !== 0">
          <!-- タグ一覧 -->
          <v-card-subtitle class="my-1">タグ</v-card-subtitle>
          <div class="px-4 mb-2">
            <v-chip-group
              :mandatory="false"
              :center-active="true"
            >
              <v-chip
                v-for="tag in this.shop.tag_items" :key="tag.TagName"
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
            <v-chip-group
              :mandatory="false"
              :center-active="true"
            >
              <v-chip
                v-for="(section, index) in uniqueSections" :key="index"
                class="ma-1"
                variant="outlined"
              >
                {{ section }}
              </v-chip>
            </v-chip-group>
          </div>
        </template>

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

    <!-- レビュー一覧 -->
    <div class="review-container w-100">
      <h2 class="heading">レビュー</h2>
      <v-row align="center" justify="center" dense class="reviews">
        <v-col cols="11" v-for="review in this.shop.review_items" :key="review.id">
          <ReviewCard
            :user="review.Role"
            :department="review.Section"
            :comment="review.Comment"
            :rating="review.Rate"
          />
        </v-col>
      </v-row>
    </div>

  </div>
  <div v-else>
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
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
      };
    },
    async beforeMount() {
      try {
        const response = await axios.get('https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/shop', {
          params: { shop_id: this.ShopId }
        });
        console.log('API Response:', response.data); // デバッグ用のコンソールログ
        this.shop = response.data;
        console.log('Shop Data:', this.shop);
      } catch (error) {
          console.error('Error fetching shop data:', error);
      } finally {
          this.loading = false;
      }
    },
    methods: {
      // 評価入力画面への遷移
      goToReview() {
        this.$router.push({ 
          path: "/review",
          query: { shop_id: this.ShopId } // shop_idをクエリパラメータとして渡す
        }); 
      },
      shareShop() {
        // 現在のURLをクリップボードにコピーする
        navigator.clipboard.writeText(window.location.href);
        // クリップボードにコピーしましたというアラートを表示する
        alert('URLをコピーしました!');
      },
    },
    computed: {
      // レビュー部署の一覧を取得
      uniqueSections() {
        const sections = this.shop.review_items.map(review => review.Section);
        return [...new Set(sections)];
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

  .reviews {
    margin-top: 10px;
  }

  .image-gallery {
    margin-top: 50px;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
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
</style>
