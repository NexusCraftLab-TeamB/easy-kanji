<template>
    <div class="container">
      <div class="header">お店レビュー登録</div>
  
      <div class="image-container">
        <img src="@/assets/your_image_path_here.jpg" alt="お店の写真">
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
        <select v-model="attribute" id="attribute">
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
  export default {
    name: "ReviewForm",
    data() {
      return {
        department: "開発一部",
        attribute: "幹事",
        rating: "5",
        comment: "",
        newTag: "",
        tags: [],
        showMessage: false,
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
      submitReview() {
        // ここにデータベース登録のコードを追加する
  
        // 登録完了メッセージを表示
        this.showMessage = true;
      },
      continueRegister() {
        // ページをリロードして新しいレビューを入力できるようにする
        this.$forceUpdate(); // Vueでの手動の再レンダリング
        this.showMessage = false;
        this.department = "開発一部";
        this.attribute = "幹事";
        this.rating = "5";
        this.comment = "";
        this.newTag = "";
        this.tags = [];
      },
      goToSearch() {
        // 検索ページにリダイレクトする
        this.$router.push("/search"); // Vue Routerを使ってページ遷移
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
  }
  
  .container {
    width: 90%;
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 1.5em;
    border-radius: 8px 8px 0 0;
  }
  
  .image-container img {
    width: 100%;
    border-radius: 8px;
  }
  
  .form-group {
    margin: 15px 0;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  select,
  textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    resize: vertical;
    height: 80px;
  }
  
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .tag {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 3px;
    font-size: 0.9em;
    cursor: pointer;
  }
  
  .submit-btn {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 4px;
    font-size: 1.2em;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  .message-box {
    display: none;
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    margin-top: 20px;
    border-radius: 4px;
    text-align: center;
  }
  
  .message-box button {
    background-color: white;
    color: #4CAF50;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    font-size: 1em;
    border-radius: 4px;
  }
  
  .message-box button:hover {
    background-color: #ddd;
  }
  
  .message-box {
    display: block;
  }
  </style>
  