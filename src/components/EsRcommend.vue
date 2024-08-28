<template>
    <div class="search-conditions">
        <h2>検索条件</h2>
        <div class="conditions">
            <div><strong>場所：</strong><span class="condition-item">有楽町</span><span class="condition-item">銀座</span></div>
            <div><strong>人数：</strong><span class="condition-item">少人数</span></div>
            <div><strong>実績：</strong><span class="condition-item">開発一部</span><span class="condition-item">開発三部</span><span class="condition-item">JASTEM開発2部</span></div>
        </div>
    </div>

    <div class="search-results">
        <h2>検索結果（全10件）</h2>

        <!-- 店舗 1 -->
        <a href="/shop" class="result-link">
            <div class="result-item">
                <img src="../assets/yoshinoya.jpg" alt="Yoshinoya">
                <div class="details">
                    <h3>XX家</h3>
                    <p>XX区XXXXXXXXXXXXXXXX</p>
                    <div class="tags">
                        <span>駅から近い</span>
                        <span>有楽町</span>
                        <span>五人以上</span>
                        <span>和食</span>
                        <span>開発一部</span>
                        <span>2024.3実績</span>
                        <span>開発三部</span>
                        <a href="#" class="more-link">more</a>
                    </div>
                </div>
            </div>
        </a>

        <!-- 店舗 2 -->
        <a href="/shop" class="result-link">
            <div class="result-item">
                <img src="../assets/oshare.png" alt="Oshare">
                <div class="details">
                    <h3>おしゃ</h3>
                    <p>XX区XXXXXXXXXXXXXXXX</p>
                    <div class="tags">
                        <span>駅から近い</span>
                        <span>銀座</span>
                        <span>4人</span>
                        <span>常務参加あり</span>
                        <span>開発一部</span>
                        <span>2024.3実績</span>
                        <span>JASTEM開発2部</span>
                        <span>少人数</span>
                        <a href="#" class="more-link">more</a>
                    </div>
                </div>
            </div>
        </a>

        <!-- 店舗 3 -->
        <a href="/shop" class="result-link">
            <div class="result-item">
                <img src="../assets/oshare.png" alt="Oshare 2">
                <div class="details">
                    <h3>おしゃ2</h3>
                    <p>XX区XXXXXXXXXXXXXXXX</p>
                    <div class="tags">
                        <span>駅から近い</span>
                        <span>銀座</span>
                        <span>10人</span>
                        <a href="#" class="more-link">more</a>
                    </div>
                </div>
            </div>
        </a>

    </div>
  </template>
  
  <script>

  export default {
    name: 'EasyRecomends',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
    }

    header {
        background-color: #3a6f3a;
        color: white;
        padding: 15px;
        text-align: center;
        position: relative;
    }

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