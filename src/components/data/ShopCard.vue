<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    :variant="variant"
    class="mx-auto my-8"
    max-width="600"
    hover
    @click="showDetail"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-green"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height= "250"
      :src= "image"
      :alt= "name"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>{{ name }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ address }}</span>

        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        justify="center"
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>
    </v-card-text>

    <div class="px-4 mb-2">
      <v-chip-group
        column
        :mandatory="false"
      >
        <v-chip
            v-for="(tag, index) in tags"
            :key="index"
            class="ma-1 custom-active-class"
            color="green" 
            variant="flat"
            text-color="green"
          >
            {{ tag }}
        </v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="green"
        text="詳細を見る"
        block
        border
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    props: {
      link: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      tags: {
        type: Array,
        required: true
      }
    },

    methods: {
      showDetail () {
        this.loading = true

        // /shopへ遷移
        setTimeout(() => {
          this.$router.push(this.link)
        }, 1000)

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>

<style scoped>
  .custom-active-class {
    background-color: #2E7D32 !important;
    color: white !important;
  }
</style>