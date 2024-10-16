<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    :variant="variant"
    class="mx-auto my-4 d-flex"
    max-width="800"
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
      :width="200"
      :height="200"
      :max-width="200"
      aspect-ratio="1/1"
      :src="image"
      :alt="name"
      cover
    ></v-img>

    <div class="d-flex flex-column justify-content-between flex-grow-1">
      <v-card-item>
        <v-card-title class="my-2 font-weight-bold">{{ name }}</v-card-title>
        
        <v-card-subtitle>
          <div>
            <!-- 住所 -->
            <v-icon
              icon="mdi-map-marker"
              size="small"
              class="me-1 pb-1"
            ></v-icon>
            <span class="me-1">{{ Adress }}</span>
          </div>

          <div class="py-2">
            <!-- ジャンル -->
            <v-icon
              icon="mdi-silverware-fork-knife"
              size="small"
              class="me-1 pb-1"
            ></v-icon>
            <span class="">{{ genre }}</span>
          </div>
        </v-card-subtitle>
        
      </v-card-item>

      <div v-if="Rate === '登録なしの店'" >
        <div class="text-grey ms-4">
          <span>利用実績なし</span>
        </div>
      </div>
      <div v-else>
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
              size="normal"
              half-increments
              readonly
            ></v-rating>
    
            <div class="text-black font-weight-bold ms-4">
              <span>{{ Rate }}</span>
            </div>
          </v-row>
        </v-card-text>
      </div>

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
    </div>
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
      genre: {
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
