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
        <a href="detailpage.html" class="result-link">
            <div class="result-item">
                <img src="yoshinoya.jpg" alt="Yoshinoya">
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
        <a href="detailpage.html" class="result-link">
            <div class="result-item">
                <img src="oshare.jpg" alt="Oshare">
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
        <a href="detailpage.html" class="result-link">
            <div class="result-item">
                <img src="oshare2.jpg" alt="Oshare 2">
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
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>