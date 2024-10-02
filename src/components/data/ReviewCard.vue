<template>
  <v-card>
    <v-card-title>
      <div>
        <span>{{ user }}</span>
        <span>{{ department }}</span>
      </div>
    </v-card-title>
    <v-card-subtitle>
      <v-rating
        :model-value="rating"
        color="amber"
        density="compact"
        size="small"
        half-increments
        readonly
      ></v-rating>
    </v-card-subtitle>
    <v-card-text>
      <p>{{ comment }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    user: String,
    department: String,
    comment: String,
    rating: Number
  }
};
</script>
