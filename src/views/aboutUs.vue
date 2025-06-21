<template>
  <div class="about-us-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="">Easy Kanji</span>について
        </h1>
        <p class="hero-subtitle">
          社内飲み会の店舗選びを、もっと簡単に、もっとスマートに
        </p>
        <p class="hero-description">
          <span class="emphasis">"お店選びで、もう迷わない！"</span><br>
          「イージー幹事ぃ（EASY KANJii）」は、社内のローカル飲み会実績共有WEBサイトとして、<br>
          NIC社内の各部・各班で利用実績がある確かなお店を数クリックで検索できます。
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2>主な機能</h2>
        <p>Easy Kanjiの便利な機能をご紹介します</p>
      </div>

      <div class="features-grid">
                 <!-- Feature 1 -->
        <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
          <div class="feature-header">
            <div class="feature-icon">
              <v-icon size="24" color="#2e7d32">mdi-home</v-icon>
            </div>
            <h3>トップへ戻る</h3>
          </div>
          <p>画面上部のロゴをクリックすると、いつでもホーム（トップ）にリロードして戻ることができます。</p>
        </div>

        <!-- Feature 2 -->
        <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
          <div class="feature-header">
            <div class="feature-icon">
              <v-icon size="24" color="#2e7d32">mdi-magnify</v-icon>
            </div>
            <h3>キーワード検索</h3>
          </div>
          <div class="feature-list">
            <ul>
              <li>テキストボックスに入力されたキーワードをもとに絞り込み</li>
              <li>過去の利用実績やレビューを優先して表示</li>
              <li>入力後、ボタン一つで結果がカード形式で即時表示</li>
            </ul>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
          <div class="feature-header">
            <div class="feature-icon">
              <v-icon size="24" color="#2e7d32">mdi-filter-variant</v-icon>
            </div>
            <h3>カテゴリ検索</h3>
          </div>
          <div class="feature-list">
            <ul>
              <li>「場所」「ジャンル」「予算」「実績」「人数」など複数条件で絞り込み</li>
              <li>選択中の条件は画面上部にチップとして表示</li>
              <li>条件を選択・変更すると自動的に結果が更新</li>
            </ul>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
          <div class="feature-header">
            <div class="feature-icon">
              <v-icon size="24" color="#2e7d32">mdi-star</v-icon>
            </div>
            <h3>おすすめ＆レビュー</h3>
          </div>
          <div class="feature-list">
            <ul>
              <li>検索未実行時は「おすすめ店舗」と「最新レビュー」を表示</li>
              <li>評価スコアや利用実績をもとに自動ピックアップ</li>
              <li>最新レビューは投稿日時の新しい順に一覧化</li>
            </ul>
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="feature-card feature-card-wide" data-aos="fade-up" data-aos-delay="500">
          <div class="feature-header">
            <div class="feature-icon">
              <v-icon size="24" color="#2e7d32">mdi-store-plus</v-icon>
            </div>
            <h3>店舗登録</h3>
          </div>
          <div class="feature-content-wide">
            <p>検索結果にない店舗は「検索結果にない店舗を登録する」ボタンから追加登録可能。登録後はカテゴリ検索や名前検索で見つかりやすくなります。</p>
            <div class="notice-box">
              <v-icon class="notice-icon" color="#ff9800">mdi-alert-circle</v-icon>
              <div class="notice-content">
                <p><strong>注意事項：</strong></p>
                <ul>
                  <li>登録内容は後で修正できないため、慎重に入力してください。</li>
                  <li>店舗登録で登録した店舗の画像は、「仮想ブラウザ環境」からは表示されないのでご留意ください（ネットワークのフィルタリングの仕様）。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>今すぐ使ってみませんか？</h2>
        <p>社内飲み会の店舗選びを、Easy Kanjiでもっと簡単に</p>
        <div class="cta-actions">
          <router-link to="/" class="cta-button">
            <v-icon left>mdi-home</v-icon>
            ホームに戻る
          </router-link>
          <div class="qr-code-section">
            <img src="@/assets/qr-code.png" alt="QR Code" class="qr-code">
            <p class="qr-label">スマホでアクセス</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- フッター -->
  <AppFooter />
</template>

<script>
import AppFooter from '../components/layout/Footer.vue';

export default {
  name: "AboutUs",
  components: {
    AppFooter
  },
  mounted() {
    window.scrollTo(0, 0);
    // Simple scroll animation trigger
    this.initScrollAnimation();
  },
  methods: {
    initScrollAnimation() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe all feature cards
      document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
      });
    }
  }
};
</script>

<style scoped>
/* ================================================ */
/* Base Styles */
/* ================================================ */
.about-us-container {
  font-family: 'Segoe UI', 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
}

/* ================================================ */
/* Hero Section */
/* ================================================ */
.hero-section {
  background: url('@/assets/AboutUs.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 60px 24px;
  text-align: center;
  position: relative;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.highlight {
  color: #a5d6a7;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 24px;
  opacity: 0.9;
  font-weight: 400;
}

.hero-description {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.6;
  opacity: 0.8;
}

.emphasis {
  font-size: 1.1em;
  font-weight: 600;
  color: #ffffff;
  display: block;
  margin-bottom: 8px;
}

/* ================================================ */
/* Features Section */
/* ================================================ */
.features-section {
  padding: 100px 24px;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1b5e20;
  margin-bottom: 16px;
  position: relative;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #2e7d32, #4caf50);
  border-radius: 2px;
}

.section-header p {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

/* ================================================ */
/* Feature Cards */
/* ================================================ */
.feature-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2e7d32, #4caf50, #81c784);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card-wide {
  grid-column: 1 / -1;
  max-width: 800px;
  margin: 0 auto;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
}

.feature-header h3 {
  text-align: left;
  margin-left: 10px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1b5e20;
  margin: 0;
  flex-grow: 1;
}

.feature-card p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 16px;
  text-align: left;
}

.feature-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.feature-list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #555;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #2e7d32;
  font-weight: bold;
}


.feature-content-wide {
  display: grid;
  gap: 24px;
}

.notice-box {
  background: #fff3e0;
  border: 1px solid #ffcc02;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
}

.notice-icon {
  flex-shrink: 0;
  margin-top: 4px;
}

.notice-content p {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #e65100;
}

.notice-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.notice-content li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #bf360c;
}

.notice-content li::before {
  content: '⚠️';
  position: absolute;
  left: 0;
  font-size: 0.8rem;
}

/* ================================================ */
/* CTA Section */
/* ================================================ */
.cta-section {
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  color: white;
  padding: 80px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: float 20s linear infinite;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(-30px, -30px) rotate(360deg); }
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 32px;
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: white;
  color: #2e7d32;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  background: #f8f9fa;
}

.qr-code-section {
  text-align: center;
}

.qr-label {
  color: white;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0px!important;
}

.qr-code {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: white;
  padding: 8px;
}
/* ================================================ */
/* Responsive Design */
/* ================================================ */
@media (max-width: 768px) {
  .hero-section {
    padding: 40px 16px;
  }

  .features-section {
    padding: 60px 16px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .feature-card {
    padding: 24px;
  }

  .feature-card-wide {
    grid-column: 1;
  }

  .cta-section {
    padding: 60px 16px;
  }

  .cta-actions {
    flex-direction: column;
    gap: 24px;
  }

  .feature-header {
    flex-wrap: wrap;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 20px;
  }

  .hero-description {
    padding: 20px;
  }

  .section-header {
    margin-bottom: 40px;
  }
}

/* ================================================ */
/* Animation delays for staggered effect */
/* ================================================ */
.feature-card:nth-child(1) {
  transition-delay: 0.1s;
}

.feature-card:nth-child(2) {
  transition-delay: 0.2s;
}

.feature-card:nth-child(3) {
  transition-delay: 0.3s;
}

.feature-card:nth-child(4) {
  transition-delay: 0.4s;
}

.feature-card:nth-child(5) {
  transition-delay: 0.5s;
}
</style>