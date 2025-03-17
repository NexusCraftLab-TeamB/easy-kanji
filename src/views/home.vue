<template>
  <div>
    <div class="bg-home">
	<img
		:src="require('@/assets/easy-kanji-logo.png')"
		alt="logo"
		class="clickable-logo"
		@click="navigateToHome"
	>
      <ShopSearchForm @submit-data="handleFormData" class="centered-form"/>
    </div>

    <div class="content-container">
      <!-- 検索結果表示エリア -->
      <div v-if="submited" class="search-results-container">
        <div class="search-header">
          <h2>検索結果</h2>
          <span class="result-count">（{{ apiData.length }}件)</span>
        </div>
        <div class="search-conditions">
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
					<ShopList
						:apiData="apiData"
					/>
          <!-- 店舗登録ボタン -->
          <div class="register-shop-button-container">
            <button class="register-shop-button" @click="openRegisterForm">
              <v-icon>mdi-plus</v-icon>
              <span>検索結果にない店舗を登録する</span>
            </button>
          </div>

          <div v-if="searchError || apiData.length === 0" class="no-results">
            <v-icon size="large" color="grey">mdi-emoticon-sad-outline</v-icon>
            <p>検索結果がありません。条件を変更して再度お試しください。</p>
          </div>
        </div>
      </div>

      <!-- 検索していない場合のホーム画面 -->
      <div v-else class="home-content">
        <!-- おすすめセクション -->
        <RecommendedShops />

        <!-- 最近投稿されたレビューセクション -->
        <RecentReviews />

        <!-- 人気のエリアセクション -->
        <!-- <section class="section-container">
          <div class="section-header">
            <h2>人気のエリア</h2>
          </div>
          <div class="section-divider"></div>
          <div class="area-grid">
            <div v-for="(area, index) in popularAreas" :key="index" class="area-card" :style="`background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${area.image})`">
              <h3>{{ area.name }}</h3>
              <span>{{ area.count }}件</span>
            </div>
          </div>
        </section> -->

        <!-- 店舗登録ボタン -->
        <div class="register-shop-button-container">
          <button class="register-shop-button" @click="openRegisterForm">
            <v-icon>mdi-plus</v-icon>
            <span>検索結果にない店舗を登録する</span>
          </button>
        </div>

      </div>
    </div>
    
    <!-- 店舗登録フォームモーダル -->
    <ShopRegisterForm 
      :isOpen="isRegisterFormOpen" 
      @close="closeRegisterForm"
    />

	<!-- ✅ フッターの上にラインを追加 -->
	<div class="footer-separator"></div>

	<!-- ✅ 追加したフッター -->
	<footer class="footer">
		<ul class="footer-links">
			<li><router-link to="/about">Easy Kanji について</router-link></li>
		</ul>
		<p class="footer-right">&copy; 2024-2025 Easy Kanjii. All Rights Reserved.</p>
	</footer>
  </div>
</template>
  
<script>
	import axios from 'axios';
	import ShopList from '../components/ShopList.vue';
	import ShopSearchForm from '../components/forms/ShopSearchForm.vue';
	import ShopRegisterForm from '../components/forms/ShopRegisterForm.vue';
	import RecentReviews from '../components/RecentReviews.vue';
	import RecommendedShops from '../components/RecommendedShops.vue';
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
				submited: false,
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
				intervalId: null,
				// 人気エリアのモックデータ
				/*
				popularAreas: [
					{ name: '渋谷', count: 256, image: require('@/assets/home-image01.jpg') },
					{ name: '新宿', count: 312, image: require('@/assets/home-image02.jpg') },
					{ name: '池袋', count: 187, image: require('@/assets/home-image03.jpg') },
					{ name: '銀座', count: 203, image: require('@/assets/home-image04.jpg') },
					{ name: '六本木', count: 178, image: require('@/assets/home-image05.jpg') },
					{ name: '恵比寿', count: 165, image: require('@/assets/home-image06.jpg') }
				],
				// 店舗登録フォームの表示状態
				isRegisterFormOpen: false
				*/
			};
		},
		methods: {
			// ヘッダーのロゴを押すとホーム画面（'/'）へ遷移
			navigateToHome() {
				window.location.reload();
			},
			// 予算コードから予算名を取得するメソッド
			getBudgetName(budgetCode) {
				const budget = budgets.find(bud => bud.code === budgetCode);
				return budget ? budget.name : budgetCode;
			},
			// 店舗登録フォームを開く
			openRegisterForm() {
				this.isRegisterFormOpen = true;
			},
			// 店舗登録フォームを閉じる
			closeRegisterForm() {
				this.isRegisterFormOpen = false;
			},
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


				//  ジャンルが選択されていて、場所が未選択の場合にアラートを表示
				if (this.genre && !this.location) {
					alert("ジャンルを選択した場合は、場所も選択してください。");
					this.submited = false; //  検索結果画面を表示しない**
					return ; //  ここで処理終了**
				}

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
						const response = await axios.get('https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/home', { params });

						// レスポンスのデータを保存
						this.apiData = response.data;
						this.searchError = false;  // エラーフラグをリセット
						console.log("apiData",this.apiData);

				} catch (error) {
					// 404エラーの場合に「検索結果がありません」というフラグを設定
					if (error.response && error.response.status === 404) {
						this.searchError = true;
						this.apiData = [];  // 検索結果がないのでデータを空にする
					} else {
						console.error('Error fetching data:', error);
					}
				}
			},
			// 店舗詳細ページへ遷移
			navigateToShop(shopId) {
				if (shopId) {
					window.location.href = `/shop/${shopId}`;
				}
			}
		},
		mounted() {
			this.fetchData(); // ページが読み込まれた時にAPI呼び出し
			this.submited = false;
			this.changeBackgroundImage(); // 初期画像を設定
			this.intervalId = setInterval(this.changeBackgroundImage, 10000); // 10秒ごとに画像を変更
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
			ShopSearchForm,
			ShopRegisterForm,
			RecentReviews,
			RecommendedShops
		}
	};
</script>

<style scoped>
	.clickable-logo {
		cursor: pointer;
	}

	/* 全体のコンテナスタイル */
	.content-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 16px;
	}

	/* 店舗登録ボタン */
	.register-shop-button-container {
		display: flex;
		justify-content: center;
		margin-bottom: 16px;
	}

	.register-shop-button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		background-color: #2e7d32;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.3s, transform 0.2s;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.register-shop-button:hover {
		background-color: #1b5e20;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	/* 検索結果コンテナ */
	.search-results-container {
		background-color: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		padding: 24px;
		margin-bottom: 32px;
	}

	/* 検索ヘッダー */
	.search-header {
		display: flex;
		align-items: flex-end;
		margin-bottom: 16px;
	}

	.search-header h2 {
		font-size: 24px;
		font-weight: 700;
		margin: 0;
		margin-right: 8px;
		color: #333;
	}

	.result-count {
		color: #666;
		font-size: 16px;
		margin-bottom: 4px;
	}

	/* 検索条件チップ */
	.search-conditions {
		margin-bottom: 24px;
	}

	.chip-group {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding-bottom: 16px;
		border-bottom: 1px solid #e8f5e9; /* 薄い緑色に変更 */
	}

	.chip {
		display: flex;
		align-items: center;
		padding: 6px 12px;
		border-radius: 100px;
		background-color: #e8f5e9; /* 薄い緑色に変更 */
		font-size: 14px;
		transition: all 0.2s ease;
	}

	.chip:hover {
		background-color: #c8e6c9; /* ホバー時の色を緑系に変更 */
		transform: translateY(-1px);
	}

	.chip-icon {
		margin-right: 6px;
	}

	.chip strong {
		font-weight: 600;
		color: #2e7d32; /* 緑色に変更 */
	}

	/* 検索結果なしの表示 */
	.no-results {
		text-align: center;
		padding: 48px 0;
		color: #666;
	}

	.no-results p {
		margin-top: 16px;
		font-size: 16px;
	}

	/* ホームコンテンツ */
	.home-content {
		padding: 16px 0;
	}

	/* セクションコンテナ */
	.section-container {
		margin-bottom: 24px;
		background-color: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		padding: 24px;
		position: relative;
	}

	/* セクション区切り線 */
	.section-divider {
		height: 2px;
		background: linear-gradient(to right, #2e7d32, #81c784); /* 緑系のグラデーションに変更 */
		margin: 8px 0 20px 0;
		border-radius: 2px;
	}

	/* セクションヘッダー */
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.section-header h2 {
		font-size: 22px;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.view-all {
		display: flex;
		align-items: center;
		color: #333;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.view-all:hover {
		color: #666
	}

	/* スクロール可能なコンテナ */
	.scrollable-container {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin; /* Firefox */
		-ms-overflow-style: -ms-autohiding-scrollbar; /* IE and Edge */
		padding-bottom: 8px;
		padding: 0 2px; /* セクションのパディングを内側に追加 */
	}

	.scrollable-container::-webkit-scrollbar {
		height: 8px; /* スクロールバーの高さ */
		background-color: #f5f5f5;
	}

	.scrollable-container::-webkit-scrollbar-thumb {
		background-color: #2e7d32; /* スクロールバーの色を緑に */
		border-radius: 4px;
	}

	.scrollable-container::-webkit-scrollbar-track {
		background-color: #e8f5e9; /* スクロールバーのトラックの色を薄緑に */
		border-radius: 4px;
	}

	.scrollable-content {
		display: flex;
		gap: 16px;
		padding: 4px 0;
		min-width: max-content; /* コンテンツが少ない場合でもスクロール可能に */
	}

	/* 店舗カード */
	.shop-card {
		flex: 0 0 auto;
		width: 220px;
		border-radius: 12px;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		cursor: pointer; /* カーソルをポインターに変更 */
	}

	.shop-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
	}

	.shop-image {
		height: 160px;
		background-size: cover;
		background-position: center;
		position: relative;
		overflow: hidden;
	}

	/* 順位表示のスタイル */
	.shop-rank {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		font-weight: bold;
		font-size: 14px;
		color: white;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rank-1 {
		background: linear-gradient(135deg, #ffd700, #ffb700); /* 金色 */
		border: 1px solid #e6c200;
	}

	.rank-2 {
		background: linear-gradient(135deg, #c0c0c0, #e0e0e0); /* 銀色 */
		border: 1px solid #a0a0a0;
	}

	.rank-3 {
		background: linear-gradient(135deg, #cd7f32, #e0955e); /* 銅色 */
		border: 1px solid #b06728;
	}

	.rank-other {
		background: linear-gradient(135deg, #607d8b, #90a4ae); /* ブルーグレー */
		border: 1px solid #546e7a;
	}

	.shop-rating {
		position: absolute;
		bottom: 8px;
		right: 8px;
		background-color: rgba(0, 0, 0, 0.7);
			color: white;
		padding: 4px 8px;
		border-radius: 100px;
		font-size: 12px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.shop-info {
		padding: 16px;
	}

	.shop-info h3 {
		margin: 0 0 8px 0;
		font-size: 16px;
		font-weight: 600;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.shop-tags {
		display: flex;
		justify-content: center;
		gap: 2px;
		margin-bottom: 8px;
		flex-wrap: wrap; /* タグを折り返し可能に */
	}

	.shop-tags span {
		background-color: #e8f5e9; /* 薄い緑色に変更 */
		color: #2e7d32; /* 緑色に変更 */
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 10px;
		margin-bottom: 4px; /* 縦並びになった時の間隔 */
	}

	.shop-access {
		color: #666;
		font-size: 12px;
		margin: 0;
	}

	/* エリアグリッド */
	.area-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 16px;
	}

	.area-card {
		height: 120px;
		border-radius: 12px;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		text-align: center;
		padding: 16px;
		transition: transform 0.3s ease;
		cursor: pointer;
	}

	.area-card:hover {
		transform: scale(1.03);
	}

	.area-card h3 {
		margin: 0 0 4px 0;
		font-size: 18px;
		font-weight: 700;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.area-card span {
		font-size: 14px;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
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

	/* ************************************************** */
	/* レスポンシブデザイン */
	/* ************************************************** */
	@media (max-width: 768px) {
		.shop-card {
			width: 180px;
		}
		
		.area-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		}

		.shop-info h3 {
			font-size: 12px;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			white-space: normal;
			height: 3rem;
		}
		
		.shop-tags span {
			margin-right: 0;
			margin-bottom: 4px;
		}
	}

	@media (max-width: 480px) {
		.section-header h2 {
			font-size: 18px;
		}
		
		.shop-card {
			width: 160px;
		}
		
		.shop-image {
			height: 120px;
		}
		
		.area-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		
		.area-card {
			height: 100px;
		}
		
		.shop-tags {
			flex-direction: column; /* タグを縦並びに */
		}
		
		.shop-tags span {
			width: 100%;
			box-sizing: border-box;
		}
	}
		/* フッター上部の区切り線 */
		.footer-separator {
			width: 100%;
			height: 2px;
			background: linear-gradient(to right, #e0e0e0, #c8e6c9, #e0e0e0); /* 両端がグレー、中央が薄い緑 */
			margin-top: 32px;
		}

		/* フッター */
		.footer {
			background-color: #2e7d32;
			color: darkolivegreen;
			padding: 16px 24px;
			text-align: center;
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		/* フッターのリンク */
		.footer-links {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		.footer-links li {
			display: inline;
			margin-right: 20px; /* 間隔を空ける */
		}

		.footer-links a {
			color: darkolivegreen;
			font-weight:bold;
			text-decoration: none;
			font-size: 14px;
		}

		.footer-links a:hover {
			text-decoration: underline;
		}

		/* コピーライト */
			.footer-right {
			margin-left: auto;
			font-size: 14px;
		}
</style>