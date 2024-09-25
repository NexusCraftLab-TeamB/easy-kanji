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
            v-model="localLocation"
            :items="locations"
            label="場所"
            outlined
            clearable
          ></v-select>
  
          <v-select
            v-model="localGenre"
            :items="genres"
            label="ジャンル"
            outlined
            clearable
          ></v-select>

          <v-slider
            v-model="localBudget"
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
            v-model="localPerformance"
            :items="performances"
            label="実績"
            outlined
            clearable
          ></v-select>
  
          <v-btn size="x-large" color="green" type="submit">
            検索
          </v-btn>
  
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
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: "",
      name: "",
      localLocation: "",
      localGenre: "",
      localBudget: 0,
      localPerformance: "",
      locations: ["東京", "有楽町", "豊洲"],
      genres: ["和食", "洋食", "中華"],
      performances: ["開発一部", "開発二部", "開発三部"],
      errorMessage: "",
      tickLabels: {
          0: '指定なし',
          5000: '5000円',
          10000: '10000円',
      },
    };
  },
  computed: {
    ...mapState(['location', 'genre', 'budget', 'performance']),
  },
  methods: {
    ...mapMutations(['setLocation', 'setGenre', 'setBudget', 'setPerformance']),
    ...mapActions(['fetchData']),
    handleSubmit() {
      if (!this.searchQuery && !this.name && !this.localLocation && !this.localGenre && !this.localBudget && !this.localPerformance) {
        this.errorMessage = "検索条件を指定してください";
      } else {
        this.errorMessage = "";
        this.setLocation(this.localLocation);
        this.setGenre(this.localGenre);
        this.setBudget(this.localBudget);
        this.setPerformance(this.localPerformance);
        
        this.$emit("submit-data", {
          searchQuery: this.searchQuery,
          name: this.name,
          location: this.localLocation,
          genre: this.localGenre,
          budget: this.localBudget,
          performance: this.localPerformance,
        });
      }
    },
  },
  mounted() {
    // Vuexからの状態をローカルデータに設定
    this.localLocation = this.location;
    this.localGenre = this.genre;
    this.localBudget = this.budget;
    this.localPerformance = this.performance;

    // APIを呼び出すためのデータを準備
    const formData = {
      name: this.name,
      location: this.localLocation,
      genre: this.localGenre,
      budget: this.localBudget,
      performance: this.localPerformance,
    };
    
    // fetchDataアクションを呼び出す
    if (this.localLocation || this.localGenre || this.localBudget || this.localPerformance) {
      this.fetchData(formData);
    }
  }
};
</script>
