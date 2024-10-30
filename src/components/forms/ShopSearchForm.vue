<template>
  <div class="search-form-container">
    <!-- タブ -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'keyword' }" @click="activeTab = 'keyword'">
        キーワードから探す
      </button>
      <button :class="{ active: activeTab === 'category' }" @click="activeTab = 'category'">
        カテゴリから探す
      </button>
    </div>

    <!-- キーワード検索タブ -->
    <div v-if="activeTab === 'keyword'" class="tab-content">
      <form @submit.prevent="handleKeywordSubmit" class="search-form" id="keyword-form">
        <div class="input-group">
          <v-icon icon="mdi-magnify" size="small" class="input-icon"></v-icon>
          <input type="text" id="keyword" name="keyword" class="search-input" v-model="keyword" placeholder="銀座で飲み放題" ref="keywordSelect" :class="{'selected': keyword !== ''}">
          <button type="button" class="clear-icon" @click="clearSelection('keyword')">
            <v-icon icon="mdi-close-circle" size="small"></v-icon>
          </button>
        </div>
        <div class="input-group">
          <button type="submit" class="search-button" @click="handleSearch('keyword')" :disabled="loading">
            <template v-if="loading">
              <v-icon icon="mdi-loading" size="small" class="spinner"></v-icon>
              検索中...
            </template>
            <template v-else>
              <v-icon icon="mdi-magnify" size="small"></v-icon>
              検索
            </template>
          </button>
        </div>
      </form>
    </div>

    <!-- カテゴリ検索タブ -->
    <div v-if="activeTab === 'category'" class="tab-content">
      <form @submit.prevent="handleSubmit" class="search-form">
        <div class="upper-row">
          <!-- 店名 -->
          <div class="input-group">
            <v-icon icon="mdi-storefront" size="small" class="input-icon"></v-icon>
            <input type="text" id="shopName" name="shopName" class="search-input" v-model="shopName" placeholder="店名" ref="shopNameSelect" :class="{'selected' : shopName !== ''}">
            <button type="button" class="clear-icon" @click="clearSelection('shopName')">
              <v-icon icon="mdi-close-circle" size="small"></v-icon>
            </button>
          </div>

          <!-- エリア・駅 -->
          <div class="input-group">
            <v-icon icon="mdi-map-marker" size="small" class="input-icon"></v-icon>
            <select id="location" name="location" class="search-input" v-model="location" ref="locationSelect" :class="{'selected': location !== ''}">
              <option value="" disabled selected>エリア・駅</option>
              <option v-for="location in locations" :key="location.code" :value="location.code">
                {{ location.name }}
              </option>
            </select>
            <button type="button" class="clear-icon" @click="clearSelection('location')">
              <v-icon icon="mdi-close-circle" size="small"></v-icon>
            </button>
          </div>
        </div>

        <div class="lower-row">
          <!-- ジャンル -->
          <div class="input-group">
            <v-icon icon="mdi-silverware-fork-knife" size="small" class="input-icon"></v-icon>
            <select id="genre" name="genre" class="search-input" v-model="genre" ref="genreSelect" :class="{'selected': genre !== ''}">
              <option value="" disabled selected>ジャンル</option>
              <option v-for="genre in genres" :key="genre.code" :value="genre.code">
                {{ genre.name }}
              </option>
            </select>
            <button type="button" class="clear-icon" @click="clearSelection('genre')">
              <v-icon icon="mdi-close-circle" size="small"></v-icon>
            </button>
          </div>

          <!-- 予算 -->
          <div class="input-group">
            <v-icon icon="mdi-currency-jpy" size="small" class="input-icon"></v-icon>
            <select id="budget" name="budget" class="search-input" v-model="budget" ref="budgetSelect" :class="{'selected': budget !== ''}">
              <option value="" disabled selected>予算</option>
              <option v-for="budget in budgets" :key="budget.code" :value="budget.code">
                {{ budget.name }}
              </option>
            </select>
            <button type="button" class="clear-icon" @click="clearSelection('budget')">
              <v-icon icon="mdi-close-circle" size="small"></v-icon>
            </button>
          </div>

          <!-- 実績 -->
          <div class="input-group">
            <v-icon icon="mdi-star" size="small" class="input-icon"></v-icon>
            <select id="performance" name="performance" class="search-input" v-model="performance" ref="performanceSelect" :class="{'selected': performance !== ''}">
              <option value="" disabled selected>実績</option>
              <option v-for="performance in performances" :key="performance">
                {{ performance }}
              </option>
            </select>
            <button type="button" class="clear-icon" @click="clearSelection('performance')">
              <v-icon icon="mdi-close-circle" size="small"></v-icon>
            </button>
          </div>

          <!-- 人数 -->
          <div class="input-group">
            <v-icon icon="mdi-account-multiple" size="small" class="input-icon"></v-icon>
            <select id="peopleNum" name="peopleNum" class="search-input" v-model="peopleNum" ref="peopleNumSelect" :class="{'selected': peopleNum !== ''}">
              <option value="" disabled selected>人数</option>
              <option v-for="peopleNum in peopleNums" :key="peopleNum" :value="peopleNum">
                {{ `${peopleNum}人以上` }}
              </option>
            </select>
            <button type="button" class="clear-icon" @click="clearSelection('peopleNum')">
              <v-icon icon="mdi-close-circle" size="small"></v-icon>
            </button>
          </div>
        </div>

        <!-- 検索ボタン -->
        <div class="input-group">
          <button type="submit" class="search-button" @click="handleSearch('category')" :disabled="loading">
            <template v-if="loading">
              <v-icon icon="mdi-loading" size="small" class="spinner"></v-icon>
              検索中...
            </template>
            <template v-else>
              <v-icon icon="mdi-magnify" size="small"></v-icon>
              検索
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { locations } from '@/constants/locations';
import { genres } from '@/constants/genres';
import { budgets } from '@/constants/budgets';
import { performances } from '@/constants/performances';

export default {
  data() {
    return {
      activeTab: 'keyword',
      keyword: "",
      searchQuery: "",
      shopName: "",
      genre: "",
      budget: "",
      performance: "",
      peopleNum: "",
      location: "",
      locations: locations,
      genres: genres,
      performances: performances,
      peopleNums: [5, 10, 15, 20, 25, 30],
      errorMessage: "",
      budgets: budgets,
      loading: false,
      formType: 'keyword',
    };
  },
  methods: {
    // キーワード検索フォームが送信されたときの処理
    handleKeywordSubmit() {
      if (!this.keyword) {
        this.errorMessage = "キーワードを入力してください";
      } else {
        this.errorMessage = "";
        this.$emit("submit-data", {
          keyword: this.keyword,
        });
      }
    },
    // カテゴリ検索フォームが送信されたときの処理
    handleSubmit() {
      if ( !this.shopName && !this.location && !this.genre && !this.budget && !this.performance && !this.peopleNum) {
        this.errorMessage = "検索条件を指定してください";
      } else {
        this.errorMessage = "";
        this.$emit("submit-data", {
          name: this.shopName,
          location: this.location,
          genre: this.genre,
          budget: this.budget,
          performance: this.performance,
          peopleNum: this.peopleNum,
        });
      }
    },
    // 検索ボタンがクリックされたときの処理
    handleSearch(formType) {
      this.loading = true;
      // 検索処理を実行
      if (formType === 'keyword') {
        this.handleKeywordSubmit();
      } else {
        this.handleSubmit();
      }
      // 検索処理が完了したらローディング状態を解除
      setTimeout(() => {
        this.loading = false;
        // 特定のクラスまでスクロール
        const targetElement = document.querySelector('.search-conditions');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000); // ここでは例として2秒後にローディングを解除
    },
    // 選択された項目をクリア
    clearSelection(field) {
      this[field] = '';
    }
  },
  watch: {
    keyword(newVal) {
      if (newVal !== '') {
        this.$refs.keywordSelect.classList.add('selected');
      } else {
        this.$refs.keywordSelect.classList.remove('selected');
      }
    },
    shopName(newVal) {
      if (newVal !== '') {
        this.$refs.shopNameSelect.classList.add('selected');
      } else {
        this.$refs.shopNameSelect.classList.remove('selected');
      }
    },
    location(newVal) {
      if (newVal !== '') {
        this.$refs.locationSelect.classList.add('selected');
      } else {
        this.$refs.locationSelect.classList.remove('selected');
      }
    },
    genre(newVal) {
      if (newVal !== '') {
        this.$refs.genreSelect.classList.add('selected');
      } else {
        this.$refs.genreSelect.classList.remove('selected');
      }
    },
    budget(newVal) {
      if (newVal !== '') {
        this.$refs.budgetSelect.classList.add('selected');
      } else {
        this.$refs.budgetSelect.classList.remove('selected');
      }
    },
    performance(newVal) {
      if (newVal !== '') {
        this.$refs.performanceSelect.classList.add('selected');
      } else {
        this.$refs.performanceSelect.classList.remove('selected');
      }
    },
    peopleNum(newVal) {
      if (newVal !== '') {
        this.$refs.peopleNumSelect.classList.add('selected');
      } else {
        this.$refs.peopleNumSelect.classList.remove('selected');
      }
    },
  },
};
</script>

<style>
:root {
  --primary-color: #146a3d;
  --secondary-color: #6c757d;
  --background-color: #f8f9fa;
  --text-color: #212529;
  --border-radius: 2rem;
}

.search-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: var(--border-radius);
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1.4rem;
  width: 90%;
  max-width: 350px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.tab-content {
  width: 100%;
  max-width: 800px;
  height: 400px; /* 固定の高さを設定 */
  overflow-y: auto; /* スクロール可能にする */
}

.tabs button {
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--primary-color);
  border-radius: 20px 0 0 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  width: 90%;
}

.tabs button:last-child {
  border-radius: 0 20px 20px 0;
}

.tabs button.active {
  background-color: var(--primary-color);
  color: white;
}

.tab-icon {
  margin-right: 8px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

#keyword-form {
  display: flex;
  flex-direction: column;
}

.upper-row,
.lower-row {
  display: flex;
  width: 100%;
  gap: 15px;
}

.input-group {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px 35px;
  border: 1px solid #ced4da;
  border-radius: var(--border-radius);
  background-color: #fff;
  color: #b4b5b6;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

/* 選択されたときのスタイル */
.search-input.selected {
  color: var(--text-color)!important; /* 選択されたときの色を変更 */
}

.search-input:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 0.01rem rgba(7, 66, 24, 0.326);
}

.input-icon {
  position: absolute;
  left: 12px;
  color: var(--secondary-color);
}

.clear-icon {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  color: var(--secondary-color);
  cursor: pointer;
}

.search-button {
  background-color: var(--primary-color);
  color: #fff;
  font-weight: bold;
  padding: 12px 20px;
  min-width: 120px;
  max-width: 170px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.search-button:hover {
  background-color: #0f5635;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.search-button .v-icon {
  margin-right: 0.3rem!important;
}

.search-input::placeholder {
  color: #b4b5b6;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
  .upper-row,
  .lower-row {
    flex-direction: column;
  }
}

</style>