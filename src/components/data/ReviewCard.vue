<template>
  <v-card class="mx-auto my-1" max-width="500" elevation="2">
    <v-card-title class="d-flex align-end justify-space-between">
      <div class="d-flex align-end">
        <v-avatar class="me-3" :color="user === '幹事' ? 'amber-lighten-5' : 'grey-lighten-5'">
          <v-icon size="36">
            {{ user === '幹事' ? 'mdi-account-tie' : 'mdi-account' }}
          </v-icon>
        </v-avatar>
        <p>{{ user }}</p>
        <span class="text-subtitle-2 text--secondary ps-2 pb-1 text-grey">{{ department }}</span>
        <span class="text-subtitle-2 text--secondary ps-2 pb-1 text-grey">{{ formattedDate ? formattedDate : '' }}</span>
        <span class="text-subtitle-2 text--secondary ps-2 pb-1 text-grey">（{{ peopleNum }}人で利用）</span>
      </div>
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text class="py-1 text-start">
      <div class="d-flex align-center">
        <div class="review-rate">
          <v-rating
            :model-value="rating"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
            align="start"
          ></v-rating>
        </div>
        <span class="ps-1 mt-1 font-weight-bold">{{ rating.toFixed(1) }}</span>
      </div>
      <p class="pb-3 ">{{ comment }}</p>
    </v-card-text>

    <v-divider></v-divider>

  </v-card>
</template>

<script>
  export default{
    name: 'ReviewCard',
    props: {
      user: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      date : {
        type: Number,
        required: true,
        default: 0
      },
      peopleNum: {
        type: Number,
        required: true
      }
    },
    computed: {
      formattedDate() {
        const dateStr = String(this.date); // 数値の場合に文字列に変換
        if (dateStr.length !== 8) {
          return '2024/10/01'; // レビュー登録日が設定されていないレビューは仮で2024/10/1とする
        }

        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);

        return `${year}/${month}/${day}`;
      }
    }
  }
</script>

<style scoped>
  .review-rate {
    margin-top: 0.5rem;
  }
</style>