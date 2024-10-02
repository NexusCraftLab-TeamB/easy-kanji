<template>
  <div v-if="!loading" class="shop-container">
    
    <div class="w-100">
      <v-card
        :disabled="loading"
        :loading="loading"
        class="mx-auto my-12"
        max-width="800"
      >
        <v-img
          height="500"
          :src="require('@/assets/yoshinoya.jpg')"
          :alt="shop.name"
          cover
        ></v-img>

        <v-card-item>
          <!-- 店名 -->
          <v-card-title>
            <h1 class="mt-0 py-2">
              {{ this.shop.shop_items[0].Name }}
            </h1>
          </v-card-title>

          <!-- 評価 -->
          <v-row
          class="mx-0 justify-center"
          >
          <v-rating
            :model-value="shop.shop_items[0].Rate"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>

          <div class="text-grey ms-2">
            {{ this.shop.shop_items[0].Rate }} ({{ shop.review_items.length }})
          </div>
        </v-row>



          <!-- 店舗情報 -->
          <v-row align="center" justify="center" class="py-3">
            <v-card-subtitle>
              <v-icon
                icon="mdi-map-marker"
                size="small"
                class="me-1 pb-1"
              ></v-icon>
              <span class="me-1">{{ this.shop.shop_items[0].Adress }}</span>
  
            </v-card-subtitle>
            <v-card-subtitle>
              <v-icon
                icon="mdi-phone"
                size="small"
                class="me-1 pb-1"
              ></v-icon>
              <span class="me-1">{{ this.shop.shop_items[0].PhoneNumber }}</span>
  
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-row>
        </v-card-item>

        
        <!-- タグ一覧 -->
        <div class="px-4 mb-2">
          <v-chip-group
          column
          :mandatory="false"
          >
            <v-chip
              v-for="tag in this.shop.tag_items" :key="tag.id"
              class="ma-1 custom-active-class"
              color="green"
              variant="flat"
              text-color="green"
              >          
              {{ tag.TagName }}
            </v-chip>
          </v-chip-group>
        </div>

        <v-divider class="mx-4 mb-1"></v-divider>

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
    <div class="review-container">
      <h2 class="heading">レビュー</h2>
      <v-row align="center" justify="center" dense class="reviews">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="review in this.shop.review_items" :key="review.id">
          <ReviewCard
            :user="review.Role"
            :department="review.Section"
            :comment="review.Comment"
          />
        </v-col>
      </v-row>
    </div>

    <!-- 画像一覧 -->
    <div class="image-gallery">
      <h3>お店の雰囲気</h3>
      <div class="image-grid">
        <img src="../assets/yoshinoyaIn1.jpg" alt="Yoshinoya">
        <img src="../assets/yoshinoyaIn2.jpg" alt="Yoshinoya2">
        <img src="../assets/yoshinoyaIn3.jpg" alt="Yoshinoya3">
      </div>
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
      shop: {},
      loading: true,
     };
  },
  async beforeMount() {
    try {
      const response = await axios.get('https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/shop', {
        params: { shop_id: this.ShopId } // shop_idを適切に設定してください
      });
      console.log('API Response:', response.data); // デバッグ用のコンソールログ
      this.shop = response.data;
      console.log('Shop Rating:', this.shop.shop_items[0].Rate); // デバッグ用のコンソールログ
      console.log('Shop Usage Count:', this.shop.usageCount); // デバッグ用のコンソールログ
    } catch (error) {
        console.error('Error fetching shop data:', error);
    } finally {
        this.loading = false;
        console.log('Loading state:', this.loading); // デバッグ用のコンソールログ
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
    background-color: #5ebd5e;
  }

  .reviews {
    margin-top: 50px;
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
</style>
