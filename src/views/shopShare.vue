<template>
    <div class="container">
      <button @click="sendData" class="send-button">データを送信</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      async sendData() {
        const params = new URLSearchParams();
        params.append('key1', 'value1');
        params.append('key2', 'value2');
  
        try {
          const response = await axios.get('https://example.com/api', { params });
          console.log('データが送信されました:', response.data);
        } catch (error) {
          console.error('データの送信に失敗しました:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .send-button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  </style>
  