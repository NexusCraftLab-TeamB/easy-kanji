<template>
    <ShopSearchForm @submit-data="handleFormData"/>

    <div class="search-conditions">
        <div v-if="submited">
            <h2>検索条件</h2>
            <div class="conditions">
                <div><strong>場所：</strong><span class="condition-item">{{ location }}</span></div>
                <div><strong>ジャンル :</strong><span class="condition-item">{{ genre }}</span></div>
                <div><strong>実績：</strong><span class="condition-item">{{ performance }}</span></div>
            </div>
            <h4>検索結果（全{{ apiData.length }}件）</h4>
        </div>
        <div v-else>
            <h2>おすすめ</h2>
        </div>
    </div>

    <ShopList :apiData="apiData"/>
    <div v-if="searchError">
        <p>検索結果がありません。</p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // mapGettersを削除
import ShopList from '../components/ShopList.vue';
import ShopSearchForm from '../components/forms/ShopSearchForm.vue';

export default {
    name: 'HomeView',
    computed: {
        ...mapState(['apiData', 'location', 'genre', 'budget', 'performance', 'submited', 'searchError']),
    },
    methods: {
        ...mapActions(['fetchData']), 
        handleFormData(data) {
            this.formData = data;
            this.$store.commit('setLocation', data.location);
            this.$store.commit('setGenre', data.genre);
            this.$store.commit('setBudget', data.budget);
            this.$store.commit('setPerformance', data.performance);
            this.$store.commit('setSubmited', true);
            this.fetchData(data); // APIを呼び出す
            console.log('Submitted data:', data); // 追加

        },
    },

    mounted() {

        // ストアの状態を使ってAPIを呼び出す
        const formData = {
            name: '', // 必要ならここに値を設定
            location: this.location,
            genre: this.genre,
            budget: this.budget,
            performance: this.performance,
        };
        
        // APIを呼び出し
        if (this.submited) {
            this.fetchData(formData);
        }
    
    },
    components: {
        ShopList,
        ShopSearchForm
    }
};
</script>


<style scoped>
/* スタイルをここに追加 */
.menu-button {
    position: absolute;
    left: 15px;
    top: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.search-container {
    padding: 20px;
    background-color: white;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #97e094;
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    height: 100px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

button {
    padding: 10px;
    background-color: #97e094;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}

button:hover {
    background-color: #7ed17e;
}

.recommendations {
    margin: 20px;
}

.recommendations h2 {
    margin-bottom: 20px;
    color: #3a6f3a;
}

.recommendation-item {
    display: flex;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
}

.recommendation-item img {
    width: 150px;
    height: auto;
}

.details {
    padding: 20px;
    width: 100%;
}

.details h3 {
    margin-top: 0;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.tags span, .tags a {
    background-color: #97e094;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    text-decoration: none;
}

.tags a {
    background-color: #7ed17e;
}

.tags a:hover {
    background-color: #5bb75b;
}
</style>