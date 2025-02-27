<template>
  <v-card class="review-card" elevation="2" rounded="lg">
    <v-card-item class="review-header">
      <div class="d-flex align-center">
        <v-avatar class="review-avatar" :color="user === '幹事' ? 'amber-lighten-4' : 'grey-lighten-4'" size="42">
          <v-icon size="24" :color="user === '幹事' ? 'amber-darken-2' : 'grey-darken-2'">
            {{ user === '幹事' ? 'mdi-account-tie' : 'mdi-account' }}
          </v-icon>
        </v-avatar>
        <div class="user-info">
          <div class="d-flex align-center">
            <span class="user-role">{{ user }}</span>
            <v-chip class="department-chip ml-2" size="x-small" :color="user === '幹事' ? 'amber-lighten-5' : 'grey-lighten-5'" variant="flat">
              <v-icon start size="x-small">mdi-office-building</v-icon>
              {{ department }}
            </v-chip>
          </div>
          <div class="review-meta">
            <v-icon size="x-small" class="mr-1">mdi-calendar</v-icon>
            <span class="date-text">{{ formattedDate ? formattedDate : '' }}</span>
            <v-icon size="x-small" class="ml-2 mr-1">mdi-account-group</v-icon>
            <span class="people-text">{{ peopleNum }}人で利用</span>
          </div>
        </div>
      </div>
      
      <div class="rating-container">
        <div class="d-flex align-center">
          <v-rating
            :model-value="rating"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>
          <span class="rating-value">{{ rating.toFixed(1) }}</span>
        </div>
      </div>
    </v-card-item>
    
    <v-divider></v-divider>
    
    <v-card-text class="review-content">
      <p class="review-text">{{ comment }}</p>
    </v-card-text>
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
  .review-card {
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.05);
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
  }
  
  .review-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08) !important;
  }
  
  .review-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
  
  .review-avatar {
    margin-right: 12px;
    border: 2px solid rgba(0, 0, 0, 0.05);
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-role {
    font-weight: 600;
    font-size: 15px;
    color: #424242;
  }
  
  .department-chip {
    font-size: 11px;
  }
  
  .review-meta {
    display: flex;
    align-items: center;
    margin-top: 4px;
    color: #757575;
    font-size: 12px;
  }
  
  .date-text, .people-text {
    font-size: 12px;
  }
  
  .rating-container {
    margin-top: 4px;
  }
  
  .rating-value {
    font-weight: 700;
    font-size: 16px;
    color: #FFC107;
    margin-left: 8px;
  }
  
  .review-content {
    flex: 1;
    padding: 16px;
    background-color: #fafafa;
  }
  
  .review-text {
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    margin: 0;
    white-space: pre-line;
  }
</style>