<template>
	<div class="search-conditions">
		<h1>{{ msg }}</h1>
		<h2>検索条件</h2>
		<div class="conditions">
				<div><strong>場所：</strong><span class="condition-item">有楽町</span><span class="condition-item">銀座</span></div>
				<div><strong>人数：</strong><span class="condition-item">少人数</span></div>
				<div><strong>実績：</strong><span class="condition-item">開発一部</span><span class="condition-item">開発三部</span><span class="condition-item">JASTEM開発2部</span></div>
		</div>
	</div>

	<div class="search-results">
		<h2>検索結果（全{{ apiData.length }}件）</h2>

		<!-- 店舗リストを表示 -->
		<div v-for="(shop, index) in apiData" :key="index">
			<ShopCard
				:link="`/shop`"
				:image="require('@/assets/yoshinoya.jpg')"
				:name="shop.Name || '店名未設定'"
				:Adress="shop.Adress || '住所設定'"
				:tags="[shop.Genre]"
			/>
		</div>
	</div>
</template>

<script>
	import ShopCard from './data/ShopCard.vue';

	export default {
		props: {
			apiData: {
				type: Array,
				required: true
			},
			msg: {
				type: String,
				default: "おすすめ"
			}
		},
		components: {
			ShopCard,
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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