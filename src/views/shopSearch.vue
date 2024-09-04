<template>
    <div class="container">
      <div class="header">お店検索</div>
  
      <div class="image-container">
        <img src="@/assets/your_image_path_here.jpg" alt="お店の写真">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShopSearch',
    data() {

    },
    methods: {
    }
    };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
  }
  
  .container {
    width: 90%;
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 1.5em;
    border-radius: 8px 8px 0 0;
  }
  
  .image-container img {
    width: 100%;
    border-radius: 8px;
  }
  
  </style>