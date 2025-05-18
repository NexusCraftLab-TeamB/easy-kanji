<template>
  <div class="home-overview-container">
    <!-- Hero image or illustration -->
    <div class="hero-image-container">
      <img src="@/assets/AboutUs.png" alt="Easy Kanji Home Overview" class="hero-image" />
      <div class="overlay-text">
        <p>
          <span class="highlight-text">“お店選びで、もう迷わない！”</span>
          「イージー幹事ぃ（EASY KANJii）」は、<br>
          社内のローカル飲み会実績共有WEBサイトとして、<br>
          NIC社内の各部・各班で利用実績がある確かなお店を数クリックで検索できます。
        </p>
      </div>
    </div>

    <div class="overview-content">
      <h1>Easy Kanjii(ver1.0) 機能説明</h1>

      <section>
        <h2>トップへ戻る</h2>
        <p>画面上部のロゴをクリックすると、いつでもホーム（トップ）にリロードして戻ることができます。</p>
      </section>

      <section>
        <h2>キーワード検索</h2>
        <ul>
          <li>テキストボックスに入力されたキーワードをもとに、過去の利用実績やレビューを優先して絞り込み</li>
          <li>入力後、ボタン一つで結果がカード形式で即時表示されます</li>
        </ul>
      </section>

      <section>
        <h2>カテゴリ（条件）検索</h2>
        <ul>
          <li>「場所」「ジャンル」「予算」「実績」「人数」など、複数の条件を組み合わせて絞り込み可能</li>
          <li>選択中の条件は画面上部にチップとして並び、クリックで解除できます</li>
          <li>条件を選択・変更すると、自動的に結果が更新されます</li>
        </ul>
      </section>

      <section>
        <h2>おすすめ＆最新レビュー</h2>
        <ul>
          <li>検索を行っていないときは「おすすめ店舗」セクションと「最近投稿されたレビュー」を表示</li>
          <li>おすすめは評価スコアや利用実績をもとに自動ピックアップ</li>
          <li>最新レビューは投稿日時の新しい順に一覧化</li>
        </ul>
      </section>

      <section>
        <h2>店舗登録</h2>
        <li>検索結果にない店舗は「検索結果にない店舗を登録する」ボタンから追加登録可能。登録後はカテゴリ検索や名前検索で見つかりやすくなります。</li>
        <li>※登録内容は後で修正できないため、慎重に入力してください。</li>
      </section>

      <router-link to="/" class="back-button">戻る</router-link>
    </div>

    <!-- ✅ フッターの上にラインを追加 -->
    <div class="footer-separator"></div>

    <!-- ✅ 追加したフッター -->
    <footer class="footer">
      <p class="footer-right">&copy; 2024-2025 Easy Kanjii. All Rights Reserved.</p>
    </footer>

  </div>
</template>

<script>
export default {
  name: "HomeOverview",
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.home-overview-container {
  font-family: 'ヒラギノ角ゴ Pro','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
}

.hero-image-container {
  position: relative;
  width: 100%;
}
.overlay-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-shadow: 0 0 6px rgba(0,0,0,0.7);
  font-size: 18px;
  line-height: 1.6;
  max-width: 80%;
  text-align: center;
}

.overlay-text p {
  font-size: 1.2rem;
}

.highlight-text {
  font-family: inherit;
  font-size: 2.5rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.hero-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 24px;
}

.overview-content {
  max-width: 800px;
}

.overview-content h1 {
  font-size: 32px;
  margin-bottom: 16px;
  color: #1b5e20;
}

.overview-content h2 {
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: #2e7d32;
}

.overview-content p,
.overview-content li {
  font-size: 16px;
  margin-bottom: 8px;
  text-align: left;
}

.overview-content ul {
  list-style: disc;
  padding-left: 20px;
}

.back-button {
  display: inline-block;
  margin-top: 24px;
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #1b5e20;
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
			justify-content: flex-end;
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
			font-size: 14px;
		}
</style>