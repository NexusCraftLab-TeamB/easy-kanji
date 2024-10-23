<template>
	<v-container>
		<v-row align="center" justify="center">
			<v-col cols="12">
				<div class="search-results">
					<!-- 店舗リストを表示 -->
					<div v-for="(shop, index) in apiData" :key="index">
						<ShopCard
							:link="`/shop/${shop.ShopId}`"
							:image="shop.Photo ? shop.Photo : require('@/assets/yoshinoya.jpg')"
							:name="shop.Name || '店名未設定'"
							:Adress="shop.Adress || '住所未設定'"
							:mobile_access="shop.mobile_access || '未登録'"
							:tags="shop.tags"
							:genre="shop.Genre"
							:Rate="shop.Rate"
							:reviewCount="shop.review_count"
						/>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ShopCard from './data/ShopCard.vue';
export default {
  props: {
    apiData: {
      type: Array,
      required: true
    },
  },
  methods: {
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