<template>
    <div>
      <h1>お店検索</h1>
      <!--
      <button @click="goToLogin">login</button>
      -->
      <div class="search-container">
          <textarea id="searchBox" placeholder="お店の希望を記載してください。（有楽町で和食、５人で部長も参加できる……など）"></textarea>
          <form id="searchForm" @submit.prevent ="handleSubmit">
              <div class="form-group">
                  <label for="location">場所</label>
                  <select v-model="location" id="location">
                      <option value="">選択してください</option>
                      <option value="東京">東京</option>
                      <option value="有楽町">有楽町</option>
                      <option value="豊洲">豊洲</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="genre">ジャンル</label>
                  <select v-model="genre" id="genre">
                      <option value="">選択してください</option>
                      <option value="和食">和食</option>
                      <option value="洋食">洋食</option>
                      <option value="中華">中華</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="budget">予算</label>
                  <select v-model="budget" id="budget">
                      <option value="">選択してください</option>
                      <option value="〜3000">~3000円</option>
                      <option value="〜5000">~5000円</option>
                      <option value="〜10000">~10000円</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="performance">実績</label>
                  <select v-model="performance" id="performance">
                      <option value="">選択してください</option>
                      <option value="開発一部">開発一部</option>
                      <option value="開発二部">開発二部</option>
                      <option value="開発三部">開発三部</option>
                  </select>
              </div>
              <button type="submit">検索</button>
          </form>
      </div>
    </div>
  
    <div>
      <!--
      コンポーネントの呼び出し？
      -->
      
      <EasyRecomends  v-if="!showResults" msg="おすすめ"/>
  
    </div>
    <div>
      <EasySearchResults v-if="showResults" 
        :location="location" 
        :genre="genre" 
        :budget="budget" 
        :performance="performance" 
        Resultmsg="検索結果"/>
   </div>
    
  </template>
  
  <script>
  
  import EasyRecomends from '../components/EsRcommend.vue';
  import EasySearchResults from '../components/Searchresult.vue';
  
  export default {
    name: 'HomeView',
    data() {
      return {
        location: '',
        genre: '',
        budget: '',
        performance: '',
        showResults: false
      };
    },
    methods: {
      goToLogin() {
        this.$router.push('/login');
      },
      handleSubmit() {
        event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
        alert('フォームが送信されました！');
        this.showResults = true;
      }
      
    },
    components:{
      EasyRecomends,
      EasySearchResults
  
    } 
  
  }
  </script>

<style scoped>
/* スタイルをここに追加 */
.menu-button {
    position: absolute;
    left: 15px;
    top: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.search-container {
    padding: 20px;
    background-color: white;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #97e094;
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    height: 100px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

button {
    padding: 10px;
    background-color: #97e094;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}

button:hover {
    background-color: #7ed17e;
}

.recommendations {
    margin: 20px;
}

.recommendations h2 {
    margin-bottom: 20px;
    color: #3a6f3a;
}

.recommendation-item {
    display: flex;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
}

.recommendation-item img {
    width: 150px;
    height: auto;
}

.details {
    padding: 20px;
    width: 100%;
}

.details h3 {
    margin-top: 0;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.tags span, .tags a {
    background-color: #97e094;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    text-decoration: none;
}

.tags a {
    background-color: #7ed17e;
}

.tags a:hover {
    background-color: #5bb75b;
}
</style>