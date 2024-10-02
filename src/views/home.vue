<template>
		<ShopSearchForm @submit-data="handleFormData"/>

		<div class="search-conditions">
			<div v-if="submited">
				<h2>検索条件</h2>
				<div class="conditions">
					<div><strong>場所：</strong><span class="condition-item">{{ locationName }}</span></div>
					<div><strong>ジャンル :</strong><span class="condition-item">{{ genreName }}</span></div>
					<div><strong>実績：</strong><span class="condition-item">{{ performance }}</span></div>
				</div>
				<h4>検索結果（全{{ apiData.length }}件）</h4>
			</div>
			<div v-else>
				<h2>おすすめ</h2>
			</div>
		</div>

		<ShopList
			:apiData="apiData"
		/>
		<div v-if="searchError || apiData.length === 0">
			<p>検索結果がありません。</p>
    </div>

  </template>
  
<script>
	import axios from 'axios';
	import ShopList from '../components/ShopList.vue';
	import ShopSearchForm from '../components/forms/ShopSearchForm.vue';
	import { locations } from '@/constants/locations.js';
	import { genres } from '@/constants/genres.js';

	export default {
		name: 'HomeView',
		data() {
			return {
				apiData: [],
				location: '',
				genre: '',
				budget: '',
				performance: '',
				formData: {},
			};
		},
		methods: {
			goToLogin() {
				this.$router.push('/login');
			},
			// フォームデータを受け取り、APIを呼び出す
			handleFormData(data) {
				this.formData = data; // 子コンポーネントから受け取ったデータをセット
				this.name = data.name; // 店名をセット
				this.location = data.location; // 場所をセット
				this.genre = data.genre; // ジャンルをセット
				this.budget = data.budget; // 予算をセット
				this.performance = data.performance; // 実績をセット
				this.submited = true; // データが送信されたことを示すフラグ
				this.fetchData(); // APIを呼び出す
			},
			// APIを呼び出す
			async fetchData() {
				try {
						// クエリパラメータを作成、空の場合は undefined に設定
						const params = {
							name: this.formData.name || undefined,
							location: this.formData.location || undefined,
							genre: this.formData.genre || undefined,
							budget: this.formData.budget || undefined,
							performance: this.formData.performance || undefined
						};

						// APIリクエストを送信
						const response = await axios.get('https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/home', { params });

						// レスポンスのデータを保存
						this.apiData = response.data;
						this.searchError = false;  // エラーフラグをリセット
						console.log(this.apiData);
				} catch (error) {
					// 404エラーの場合に「検索結果がありません」というフラグを設定
					if (error.response && error.response.status === 404) {
						this.searchError = true;
						this.apiData = [];  // 検索結果がないのでデータを空にする
					} else {
						console.error('Error fetching data:', error);
					}
				}
			}
		},
		mounted() {
			this.fetchData(); // ページが読み込まれた時にAPI呼び出し
			this.submited = false;
		},
		computed: {
			// 検索値（areaコード）から場所の名前へ変換する
			locationName() {
				const location = locations.find(loc => loc.code === this.location);
				return location ? location.name : '-';
			},
			// 検索値（ジャンルコード）から場所の名前へ変換する
			genreName() {
				const genre = genres.find(gen => gen.code === this.genre);
				return genre ? genre.name : '-';
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