<!-- <template>
  <div class="container">
    <h1>イージー 幹事い</h1>
    <div class="logo">
      <img src="@/assets/logo.png" alt="Easy" />
    </div>
    <form @submit.prevent="goToLogin">
      <input type="text" id="userId" v-model="userId" placeholder="ユーザID">
      <input type="password" id="password" v-model="password" placeholder="PASSWORD">
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      userId: '',
      password: ''
    };
  },
  methods: {
    goToLogin() {
      if (this.userId && this.password) {
        this.$router.push({ path: '/home' });
      } else {
        alert("ユーザIDとパスワードを入力してください。");
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
}

.container {
  text-align: center;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto; 
}

h1 {
  margin-bottom: 20px;
  color: #3a6f3a;
}

.logo img {
  width: 100px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="text"], input[type="password"] {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
}

button:hover {
  background-color: #7ed17e;
}
</style> -->

<template>
  <div class="container">
    <h1>イージー 幹事い</h1>
    <div class="logo">
      <img src="@/assets/logo.png" alt="Easy" />
    </div>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="ユーザー名" required />
      <input type="password" v-model="password" placeholder="パスワード" required />
      <button type="submit">ログイン</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        await Auth.signIn(this.username, this.password);
        this.$router.push('/Home'); // 認証後のリダイレクト
      } catch (error) {
        console.error('ログインエラー:', error);
        this.errorMessage = 'ユーザー名またはパスワードが間違っています。';
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h1 {
  margin-bottom: 20px;
  color: #3a6f3a;
}

.logo img {
  width: 100px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="text"], input[type="password"] {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus, input[type="password"]:focus {
  border-color: #3a6f3a; /* フォーカス時のボーダーカラー */
}

button {
  padding: 10px;
  background-color: #97e094;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #7ed17e;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
