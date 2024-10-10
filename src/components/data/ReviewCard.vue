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
      </div>
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
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="py-1 text-start">
      <p class="pa-3">{{ comment }}</p>
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
      }
    }
  }
</script>

<style scoped>
  .review-rate {
    height: 30px;
  }
</style>