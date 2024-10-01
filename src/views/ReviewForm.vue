<template>
  <div class="container">
    <div class="header">お店レビュー登録</div>

    <div class="image-container">
      <img src="@/assets/your_image_path_here.jpg" alt="お店の写真">
    </div>

    <!-- お店の名前を表示 -->
  
    <div class="shop-name" style="font-weight: bold; color: black;">
      {{ shopName }}  <strong>のレビューを登録</strong> <!-- ここでお店の名前を表示 -->
    </div>

    <div class="form-group">
      <label for="department">利用部門:</label>
      <select v-model="department" id="department">
        <option value="開発一部">開発一部</option>
        <option value="開発二部">開発二部</option>
        <option value="開発三部">開発三部</option>
      </select>
    </div>

    <div class="form-group">
      <label for="attribute">属性:</label>
      <select v-model="role" id="role">
        <option value="幹事">幹事</option>
        <option value="参加者">参加者</option>
      </select>
    </div>

    <div class="form-group">
      <label for="rating">評価:</label>
      <select v-model="rating" id="rating">
        <option value="1">★☆☆☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="3">★★★☆☆</option>
        <option value="4">★★★★☆</option>
        <option value="5">★★★★★</option>
      </select>
    </div>

    <div class="form-group">
      <label for="comment">コメント:</label>
      <textarea v-model="comment" id="comment" placeholder="自由記述"></textarea>
    </div>

    <div class="form-group">
      <label for="tag">タグの追加:</label>
      <input type="text" v-model="newTag" id="tag" placeholder="自由記述" @keyup.enter="addTag">
    </div>

    <div class="tags-container">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="tag"
        @click="removeTag(index)"
      >
        {{ tag }}
      </div>
    </div>

    <button class="submit-btn" @click="submitReview">登録</button>

    <div v-if="showMessage" class="message-box">
      <p>お店のレビューが登録されました。</p>
      <button @click="continueRegister">続けて登録する</button>
      <button @click="goToSearch">検索画面に戻る</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ReviewForm",
  data() {
    return {
      department: "開発一部",
      role: "幹事",
      rating: "5",
      comment: "",
      newTag: "",
      tags: [],
      showMessage: false,
      shopName: "",  // お店の名前を保存するプロパティを追加
    };
  },
  methods: {
    addTag() {
      if (this.newTag.trim() !== "") {
        this.tags.push(this.newTag.trim());
        this.newTag = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async fetchShopName() {
      const shopId = this.$route.query.shop_id;  // クエリパラメータからshop_idを取得
      try {
        const response = await axios.get(`https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/shop?shop_id=${shopId}`);
        
        // API レスポンスをログに出力
        console.log("Shop Items:", response.data.shop_items);
        
        // shop_itemsが空でないか確認
        if (response.data.shop_items.length > 0) {
          this.shopName = response.data.shop_items[0].Name;  // お店の名前を取得（プロパティ名を修正）
        } else {
          console.error('No shop items found for the provided shop_id');
        }
      } catch (error) {
        console.error('Error fetching shop name:', error);
      }
    },
    async submitReview() {
      try {
        const requestBody = {
          shop_id: this.$route.query.shop_id,  // shop_idをクエリパラメータから取得
          section: this.department,
          comment: this.comment,
          rate: this.rating,
          role: this.role,
        };

        const response = await axios.post('https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/review', requestBody);
        if (response.status === 200) {
          this.showMessage = true;
        }
      } catch (error) {
        console.error('Error registering the review:', error);
      }
    },
    continueRegister() {
      this.$forceUpdate();
      this.showMessage = false;
      this.department = "開発一部";
      this.role = "幹事";
      this.rating = "5";
      this.comment = "";
      this.newTag = "";
      this.tags = [];
    },
    goToSearch() {
      this.$router.push("shopSearch");
    }
  },
  mounted() {
    this.fetchShopName();  // コンポーネントがマウントされたときにお店の名前を取得
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

.header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.image-container {
  text-align: center;
  margin-bottom: 20px;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.shop-name {
  font-size: 18px;
  margin-bottom: 15px;
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
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-box button:first-of-type {
  background-color: #007bff;
  color: white;
}

.message-box button:last-of-type {
  background-color: #6c757d;
  color: white;
}
</style>
