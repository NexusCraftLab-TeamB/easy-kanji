<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-4"
    max-width="700"
    max-height="180"
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

    <v-row no-gutters>
      <v-col cols="3">
        <v-img
          class="responsive-img"
          :src="image"
          :alt="name"
          cover
        ></v-img>
      </v-col>
      <v-col cols="9">
        <div class="d-flex flex-column justify-space-between py-2 pe-2 h-100">
          <v-card-item class="text-start py-0">
            <div class="my-0 my-md-2 font-weight-bold text-h6 text-clamp">
              {{ name }}
            </div>
            
            <v-card-subtitle class="py-1">
              <div class="d-none d-md-block">
                <!-- アクセス -->
                <v-icon
                  icon="mdi-train"
                  size="small"
                  class="me-1 pb-1"
                ></v-icon>
                <span class="">{{ access }}</span>
              </div>

              <div class="py-1">
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
    
          <div class="ps-5 ps-sm-6">
            <div v-if="reviewCount === 0" >
              <div class="text-grey ms-1 mt-0">
                <span>利用実績なし</span>
              </div>
            </div>
            <div v-else>
              <div class="text-h6 my-1 mt-sm-5">
                <v-row
                  align="center"
                  justify="start"
                  class=""
                >
                  <v-rating
                    :model-value="Rate"
                    color="amber"
                    density="compact"
                    size="normal"
                    class="mb-1"
                    half-increments
                    readonly
                  ></v-rating>
          
                  <div class="ms-1">
                    <span class="font-weight-bold text-orange-darken-4">{{ formattedRate }}</span>
                    <span class="ps-2 text-grey text-body-1">({{ reviewCount }})</span>
                  </div>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      localName: '',
      localAddress: '',
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
      address: {
        type: String,
        required: true
      },
      access: {
        type: String,
        required: false
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
        required: true,
        default: () => []  // デフォルト値として空の配列を設定
      },
      reviewCount: {
        type: Number,
        required: false,
        default: 0
      },
    },
    created() {
      this.localName = this.name;
      this.localAddress = this.address;
      this.localTags = this.tags;
      this.localRate = this.rate;
      console.log("props",this.props);
    },
    methods: {
      showDetail () {
        this.loading = true
        
        // 新しいタブでリンクを開く
        const newWindow = window.open(this.link, '_blank');
        // 新しいウィンドウにフォーカスを与える（ブラウザによってはブロックされる場合があります）
        if (newWindow) newWindow.focus();

        setTimeout(() => (this.loading = false), 100)
      },
    },
    computed: {
      formattedRate() {
        return (Math.round(this.Rate * 10) / 10).toFixed(2); // 四捨五入して表示
      }
    }
  }
</script>


<style scoped>
.responsive-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 画像を親要素にフィットさせる */
  aspect-ratio: 1 / 1; /* 正方形に保つ */
}

.v-card {
  height: 100%;
  border-radius: 10px;
}

.v-row {
  height: 100%;
}

.v-col {
  height: 100%;
}

.custom-active-class {
  background-color: #2E7D32 !important;
  color: white !important;
}

.text-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* 表示する行数を指定 */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* xs のときに高さを固定 */
@media (max-width: 600px) {
  .v-card {
    height: 90px;
  }

  .v-col {
    height: 90px;
  }
}
</style>
