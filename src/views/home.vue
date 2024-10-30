<template>
  <div class="bg-home">
		<img :src="require('@/assets/easy-kanji-logo.png')" alt="logo">
		<ShopSearchForm @submit-data="handleFormData" class="centered-form"/>
  </div>

	<div class="search-conditions">
		<div v-if="submited" class="mx-5">
			<div class="d-flex align-end justify-center ps-3">
				<h2 class="mt-3">検索結果</h2>
				<span class="mb-1">（{{ apiData.length }}件)</span>
			</div>
			<div class="conditions">
				<div class="chip-group">
					<div class="chip" v-if="keyword">
						<v-icon class="chip-icon" color="black">mdi-magnify</v-icon>
						<strong>{{ keyword }}</strong>
					</div>
					<div class="chip" v-if="name">
						<v-icon class="chip-icon" color="black">mdi-storefront</v-icon>
						<span>店名：</span><strong>{{ name }}</strong>
					</div>
					<div class="chip" v-if="locationName">
						<v-icon class="chip-icon" color="black">mdi-map-marker</v-icon>
						<span>場所：</span><strong>{{ locationName }}</strong>
					</div>
					<div class="chip" v-if="genreName">
						<v-icon class="chip-icon" color="black">mdi-silverware-fork-knife</v-icon>
						<span>ジャンル：</span><strong>{{ genreName }}</strong>
					</div>
					<div class="chip" v-if="budgetName">
						<v-icon class="chip-icon" color="black">mdi-cash</v-icon>
						<span>予算：</span><strong>{{ budgetName }}</strong>
					</div>
					<div class="chip" v-if="performance">
						<v-icon class="chip-icon" color="black">mdi-star</v-icon>
						<span>実績：</span><strong>{{ performance }}</strong>
					</div>
					<div class="chip" v-if="peopleNum">
						<v-icon class="chip-icon" color="black">mdi-account-multiple</v-icon>
						<span>人数：</span><strong>{{ `${peopleNum}人以上` }} </strong>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h2>おすすめ</h2>
		</div>
	</div>

	<ShopList
		:apiData="apiData"
	/>
	<div v-if="searchError || apiData.length === 0">
		<p class="mt-5">検索結果がありません。</p>
	</div>

</template>
  
<script>
	import axios from 'axios';
	import ShopList from '../components/ShopList.vue';
	import ShopSearchForm from '../components/forms/ShopSearchForm.vue';
	import { locations } from '@/constants/locations.js';
	import { genres } from '@/constants/genres.js';
	import { budgets } from '@/constants/budgets.js';

	export default {
		name: 'HomeView',
		data() {
			return {
				apiData: [],
				keyword: '',
				name: '',
				location: '',
				genre: '',
				budget: '',
				performance: '',
				peopleNum: '',
				formData: {},
				currentImageIndex: 0,
				backgroundImages: [
					require('@/assets/home-image01.jpg'),
					require('@/assets/home-image02.jpg'),
					require('@/assets/home-image03.jpg'),
					require('@/assets/home-image04.jpg'),
					require('@/assets/home-image05.jpg'),
					require('@/assets/home-image06.jpg'),
					require('@/assets/home-image07.jpg'),
					require('@/assets/home-image08.jpg'),
					require('@/assets/home-image09.jpg')
				],
				intervalId: null
			};
		},
		methods: {
			// バックグラウンド画像を変更
			changeBackgroundImage() {
				// ランダムなインデックスを生成
				const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
				this.currentImageIndex = randomIndex;
				const newImageUrl = this.backgroundImages[this.currentImageIndex];
				document.querySelector('.bg-home').style.backgroundImage = `url(${newImageUrl})`;
			},
			// フォームデータを受け取り、APIを呼び出す
			handleFormData(data) {
				this.formData = data; // 子コンポーネントから受け取ったデータをセット
				this.keyword = data.keyword; // キーワードをセット
				this.name = data.name; // 店名をセット
				this.location = data.location; // 場所をセット
				this.genre = data.genre; // ジャンルをセット
				this.budget = data.budget; // 予算をセット
				this.performance = data.performance; // 実績をセット
				this.peopleNum = data.peopleNum; // 人数をセット
				this.submited = true; // データが送信されたことを示すフラグ
				this.fetchData(); // APIを呼び出す
			},
			// APIを呼び出す
			async fetchData() {
				try {
						// クエリパラメータを作成、空の場合は undefined に設定
						const params = {
							keyword: this.formData.keyword || undefined,
							name: this.formData.name || undefined,
							location: this.formData.location || undefined,
							genre: this.formData.genre || undefined,
							budget: this.formData.budget || undefined,
							performance: this.formData.performance || undefined,
							PeopleNum: this.formData.peopleNum || undefined
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
			this.changeBackgroundImage(); // 初期画像を設定
			this.intervalId = setInterval(this.changeBackgroundImage, 5000); // 5秒ごとに画像を変更
			document.title = 'Easy Kanji'; // タイトルを設定
		},
		beforeUnmount() {
			clearInterval(this.intervalId); // コンポーネントが破棄される前にインターバルをクリア
		},
		computed: {
			// 検索値（areaコード）から場所の名前へ変換する
			locationName() {
				const location = locations.find(loc => loc.code === this.location);
				return location ? location.name : null;
			},
			// 検索値（ジャンルコード）から場所の名前へ変換する
			genreName() {
				const genre = genres.find(gen => gen.code === this.genre);
				return genre ? genre.name : null;
			},
			// 検索値（予算）から予算の名前へ	変換する
			budgetName() {
				const budget = budgets.find(bud => bud.code === this.budget);
				return budget ? budget.name : null;
			},
		},
		components: {
			ShopList,
			ShopSearchForm
		}
	};
</script>

<style scoped>

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

	/* 背景画像 */
	.bg-home {
		background-size: cover;
		background-position: center;
		transition: background-image 2s ease-in-out;
		margin-bottom: 30px;
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* オーバーレイ */
	.bg-home::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4); /* 背景を薄暗くする */
		z-index: 1;
	}

	.bg-home > * {
		position: relative;
		z-index: 2; /* オーバーレイの上に表示 */
	}

	.bg-home img {
		z-index: 10;
		position: absolute; /* 位置を絶対配置に設定 */
		top: 0; /* ヘッダーの位置に配置 */
		height: auto; /* 高さを自動調整 */
		max-height: 50px;
		margin-top: 15px;
	}

	/* 検索フォーム */
	.centered-form {
		position: absolute;
		z-index: 10;
		width: 95%; /* 必要に応じて調整 */
	}

	/* 検索結果のチップ */
	.chip-group {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 5px; /* チップ間の間隔を指定 */
		margin: 0.5rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid #ccc;
	}

	.chip {
		display: flex;
		align-items: center;
		padding: 5px 10px;
		border-radius: 24px; /* 丸みを帯びた角にする */
		background-color: #e0e0e0; /* 薄いグレー背景 */
		font-size: 0.9rem;
	}

	.chip-icon {
		margin-right: 4px;
		font-size: 0.9rem;
	}

	.chip strong {
		margin-right: 5px;
	}

</style>