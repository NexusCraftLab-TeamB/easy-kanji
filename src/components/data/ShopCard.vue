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
        <span class="me-1">{{ Adress }}</span>

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
          :model-value="Rate"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          {{ Rate }}
        </div>
      </v-row>
    </v-card-text>

    <div class="px-4 mb-2">
      <v-chip-group
        column
        :mandatory="false"
      >
        <v-chip
            v-for="(tag, index) in localTags"
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
      localName: '',
      localAdress: '',
      localTags: [],
      localRate: 0,
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
      Adress: {
        type: String,
        required: true
      },
      Rate: {
        type: Number,
        required: true
      },
      tags: {
        type: Array,
        required: true
      }
      },
    created() {
      this.localName = this.name;
      this.localAdress = this.Adress;
      this.localTags = this.tags;
      this.localRate = this.Rate;
    },
    methods: {
      showDetail () {
        this.loading = true

    // /shopへ遷移
    setTimeout(() => {
      window.open(this.link, '_blank');
    }, 1000);


        setTimeout(() => (this.loading = false), 2000)
      },
      updateShopData(data){
        console.log(data);
        this.localName = data.Name || this.localName;
        this.localAdress = data.Adress || this.localAdress;
        this.localTags = data.Genre ? [data.Genre] : this.localTags;
        this.localRate = data.Rate || this.localRate;
      }
    },
  }
</script>


<style scoped>
  .custom-active-class {
    background-color: #2E7D32 !important;
    color: white !important;
  }
</style>
