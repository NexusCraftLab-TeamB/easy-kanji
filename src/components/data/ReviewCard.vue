<template>
  <v-card
    class="mx-auto"
    :title= user
    :subtitle= department
  >
    <v-rating
      :model-value="4.5"
      color="amber"
      density="compact"
      size="small"
      half-increments
      readonly
      align="start"
    ></v-rating>

    <v-card-text>{{ comment }}</v-card-text>
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
      }
    }
  }
</script>

<style scoped>
  .v-card-item {
    padding-bottom: 0rem!important;
  }
  .v-card-text {
    padding: 0.5rem!important;
  }
</style>