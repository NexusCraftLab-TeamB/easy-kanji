<template>
  <footer class="footer">
    <div class="footer-left">
      <ul class="footer-links">
        <li><router-link to="/about">Easy Kanji について</router-link></li>
      </ul>
      <img src="@/assets/qr-code.png" alt="qr-code" class="footer-qr-code">
    </div>
    <p class="footer-right">&copy; 2024-2025 Easy Kanjii. All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
/* フッター */
.footer {
  color: darkolivegreen;
  padding: 16px 24px;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid;
  border-image: linear-gradient(to right, #e0e0e0, #c8e6c9, #e0e0e0) 1;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-qr-code {
  width: 50px;
  height: 50px;
}

/* フッターのリンク */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: underline;
}

.footer-links li {
  display: inline;
  margin-right: 20px;
}

.footer-links a {
  color: darkolivegreen;
  font-weight: bold;
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

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 12px;
    padding: 20px 24px;
  }

  .footer-links li {
    margin-right: 0;
  }

  .footer-right {
    margin-left: 0;
  }
}
</style> 