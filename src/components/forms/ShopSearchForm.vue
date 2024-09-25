<template>
  <div>

    <h1>お店検索</h1>
    <v-container>
      <v-sheet
        :elevation="2"
        width="100%"
        max-width="600px"
        padding="20px"
        class="mx-auto pa-2"
        rounded
      >
        <v-form @submit.prevent="handleSubmit">
          <v-textarea
            v-model="searchQuery"
            label="お店の希望を記載してください。（有楽町で和食、５人で部長も参加できる……など）"
            outlined
            clearable
          ></v-textarea>
          
          <v-text-field
            v-model="name"
            label="店名"
            outlined
            clearable
          ></v-text-field>

          <v-select
            v-model="location"
            :items="locations"
            label="場所"
            outlined
            clearable
          ></v-select>
  
          <v-select
            v-model="genre"
            :items="genres"
            label="ジャンル"
            outlined
            clearable
          ></v-select>

          <v-slider
            v-model="budgets"
            color="green-darken-1"
            track-color="green"
            :min="0"
            :max="10000"
            step="1000"
            :ticks="tickLabels"
            show-ticks="always"
            thumb-label="always"
            tick-size="3"
            label="予算"
          ></v-slider>
  
          <v-select
            v-model="performance"
            :items="performances"
            label="実績"
            outlined
            clearable
          ></v-select>
  
          <v-btn size="x-large" color="green" type="submit">
            検索
          </v-btn>
  
          <!-- エラーメッセージ表示 -->
          <v-alert
            v-if="errorMessage"
            variant="outlined"
            type="error"
            class="mt-4"
            closable
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // テキストエリアのデータバインディング
      name: "", // 店名
      location: "", // 場所の選択
      genre: "", // ジャンルの選択
      budget: "", // 予算の選択
      performance: "", // 実績の選択
      locations: ["東京", "有楽町", "豊洲"], // 場所の選択肢
      genres: ["和食", "洋食", "中華"], // ジャンルの選択肢
      performances: ["開発一部", "開発二部", "開発三部"], // 実績の選択肢
      errorMessage: "", // エラーメッセージ
      budgets: [1000, 3000],
      tickLabels: {
          0: '指定なし',
          5000: '5000円',
          10000: '10000円',
        },
    };
  },
  methods: {
    handleSubmit() {
      // すべての項目が空の場合のバリデーション
      if (!this.searchQuery && !this.name && !this.location && !this.genre && !this.budget && !this.performance) {
        this.errorMessage = "検索条件を指定してください";
      } else {
        this.errorMessage = ""; // エラーメッセージをリセット
        // フォームデータを親コンポーネントに渡す
        this.$emit("submit-data", {
          searchQuery: this.searchQuery,
          name: this.name,
          location: this.location,
          genre: this.genre,
          budget: this.budget,
          performance: this.performance,
        });
      }
    },
  },
};
</script>