<template>
  <div class="container">
    <h2 class="py-2">レビュー登録</h2>

    <div class="image-container">
      <img :src="this.shopImage" alt="shop image" />
    </div>

    <div class="shop-name" style="font-weight: bold; color: black;">
      {{ shopName }}
    </div>

    <v-form @submit.prevent>
      <v-rating
        v-model="rating"
        half-increments
        hover
        :length="5"
        :size="50"
        color="amber"
        class="text-h4 my-2"
      />
      <div class="mb-2">評価 : {{ rating }}</div>

      <v-select
        v-model="performance"
        :items="performances"
        label="利用部門"
        outlined
        :rules="performanceRules"
      ></v-select>

      <v-select
        v-model="role"
        :items="roles"
        label="属性"
        outlined
        :rules="roleRules"
      ></v-select>

      <!-- 参加人数入力ボックス -->
      <v-text-field
        v-model="peopleNum"
        label="参加人数"
        type="number"
        outlined
        :rules="peopleNumRules"
      ></v-text-field>

      <v-textarea
        v-model="comment"
        label="コメント"
        placeholder="忘年会にぴったりのお店でした！"
        outlined
        clearable
        rows="3"
        maxlength="300"
        :rules="commentRules"
      ></v-textarea>

      <v-snackbar
        v-model="showSnackbar"
        :timeout="1500"
        color="green-darken-4"
        rounded="pill"
      >
        <div class="d-flex justify-space-between align-center">
          <p class="ms-4 font-weight-bold">レビューを登録しました!</p>
          <v-btn
            color="white"
            variant="text"
            @click="showSnackbar = false"
            class="mr-2 font-weight-bold"
          >
            ×
          </v-btn>
        </div>
      </v-snackbar>

      <v-btn
        class="mt-2 submit-btn"
        type="submit"
        @click="submitReview"
        block
        :disabled="!isFormValid"
        :loading="loading"
      >
        登録する
      </v-btn>
    </v-form>

    <div v-if="showMessage" class="message-box">
      <p>お店のレビューが登録されました。</p>
      <button @click="continueRegister">続けて登録する</button>
      <button @click="goToSearch">検索画面に戻る</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { performances } from '@/constants/performances';

export default {
  name: "ReviewForm",
  data() {
    return {
      performance: "開発一部",
      performances: performances,
      role: '幹事',
      roles: ['幹事', '参加者'],
      rating: "5",
      comment: "",
      peopleNum: "",  // 参加人数を保存するプロパティを追加
      date: new Date().toISOString().substr(0, 10),
      showMessage: false,
      showSnackbar: false,
      loading: false,
      submitted: false,  // ⭐ 登録済みかどうかのフラグ
      shopName: "",
      shopImage: "",
      performanceRules: [(v) => !!v || '利用部門を選択してください'],
      roleRules: [(v) => !!v || '属性を選択してください'],
      commentRules: [(v) => !!v || 'コメントを入力してください'],
      peopleNumRules: [(v) => !!v || '参加人数を入力してください'], // 参加人数のバリデーションルール
    };
  },
  methods: {
    async fetchShopName() {
      const shopId = this.$route.query.shop_id;
      try {
        const response = await axios.get(`https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/shop?shop_id=${shopId}`);
        if (response.data.shop_items.length > 0) {
          this.shopName = response.data.shop_items[0].Name;
          this.shopImage = response.data.shop_items[0].Photo;
        } else {
          console.error('No shop items found for the provided shop_id');
        }
      } catch (error) {
        console.error('Error fetching shop name:', error);
      }
    },
    async submitReview() {
      if (this.isFormValid && !this.loading && !this.submitted) {  // ⭐ `submitted` をチェック
       try {
        this.loading = true;  // ボタンを押した瞬間に無効化

       const requestBody = {
        shop_id: this.$route.query.shop_id,
        section: this.performance,
        comment: this.comment,
        rate: this.rating,
        role: this.role,
        date: this.date,
        peopleNum: Number(this.peopleNum),  // 入力された人数を数値に変換して送信
        };

      const response = await axios.post(
        'https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/review',
        requestBody
      );

      if (response.status === 200) {
        this.showSnackbar = true;
        this.showMessage = true;
        this.submitted = true;  // ⭐ 登録後にフラグを立てる

         // ⭐ フォームをリセットする処理
         this.performance = "開発一部";
        this.role = "幹事";
        this.rating = "5";
        this.comment = "";
        this.peopleNum = "";
        
      }
    } catch (error) {
      console.error('Error registering the review:', error);
    } finally {
      this.loading = false;  // リクエスト完了後に解除
    }
  } else {
    console.log('フォームが無効です or すでに処理中');
  }
},
    continueRegister() {
      this.$forceUpdate();
      this.showMessage = false;
      this.department = "開発一部";
      this.role = "幹事";
      this.rating = "5";
      this.comment = "";
      this.peopleNum = ""; // 参加人数をリセット
      this.submitted = false;  // ⭐ `submitted` をリセットして再登録できるようにする
    },
    goToSearch() {
      this.$router.push("/");
    },
  },
  computed: {
    isFormValid() {
      return (
        this.performance &&
        this.role &&
        this.rating &&
        this.comment.length > 0 &&
        this.peopleNum > 0  // 参加人数が正の数であることを確認
      );
    },
  },
  mounted() {
    this.fetchShopName();
  }
};
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    text-align: center;
  }

  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .shop-name {
    font-size: 18px;
    margin: 5px 0px;
    text-align: center;
    color: #007bff;  /* お店の名前を強調 */
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-group select, .form-group textarea, .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .tags-container {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .tag {
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .submit-btn {
    width: 100%;
    background-color: #28a745;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }

  .submit-btn:hover {
    background-color: #218838;
  }

  .message-box {
    text-align: center;
    margin-top: 20px;
    padding: 10px;
    background-color: #e9f7ef;
    border: 1px solid #d4edda;
    border-radius: 4px;
  }

  .message-box p {
    margin-bottom: 10px;
  }

  .message-box button {
    margin: 5px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .message-box button:hover {
    background-color: #0069d9;
  }
</style>