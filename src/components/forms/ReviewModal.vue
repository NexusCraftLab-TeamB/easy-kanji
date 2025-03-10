<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-upper">
          <h2>レビュー登録</h2>
          <button class="close-button" @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: formProgress + '%' }"></div>
        </div>
      </div>
      
      <form @submit.prevent="submitReview" class="register-form">
        <!-- 店舗情報 -->
        <div class="shop-info">
          <div class="shop-image">
            <img :src="shopImage || require('@/assets/nophoto.jpg')" :alt="shopName" />
          </div>
          <div class="shop-name">{{ shopName }}</div>
        </div>

        <!-- 評価 -->
        <div class="form-group">
          <label>評価</label>
          <div class="rating-container">
            <v-rating
              v-model="rating"
              half-increments
              hover
              :length="5"
              color="amber"
              class="rating-stars"
              size="large"
            />
            <div class="rating-value">{{ rating }}</div>
          </div>
        </div>
        
        <!-- 利用部門 -->
        <div class="form-group" :class="{ 'focused': focusedField === 'performance', 'filled': performance }">
          <label for="performance">利用部門 <span class="required">*</span></label>
          <div class="input-group">
            <v-icon icon="mdi-office-building" size="small" class="input-icon"></v-icon>
            <select 
              id="performance" 
              v-model="performance" 
              class="form-input" 
              required
              @focus="focusField('performance')"
              @blur="blurField"
            >
              <option value="" disabled>部門を選択してください</option>
              <option v-for="item in performances" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            <span class="input-highlight"></span>
            <v-icon icon="mdi-chevron-down" size="small" class="select-icon"></v-icon>
          </div>
          <div class="error-message" v-if="errors.performance">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.performance }}
          </div>
        </div>
        
        <!-- 属性 -->
        <div class="form-group" :class="{ 'focused': focusedField === 'role', 'filled': role }">
          <label for="role">属性 <span class="required">*</span></label>
          <div class="input-group">
            <v-icon icon="mdi-account" size="small" class="input-icon"></v-icon>
            <select 
              id="role" 
              v-model="role" 
              class="form-input" 
              required
              @focus="focusField('role')"
              @blur="blurField"
            >
              <option value="" disabled>属性を選択してください</option>
              <option v-for="item in roles" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            <span class="input-highlight"></span>
            <v-icon icon="mdi-chevron-down" size="small" class="select-icon"></v-icon>
          </div>
          <div class="error-message" v-if="errors.role">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.role }}
          </div>
        </div>
        
        <!-- 参加人数 -->
        <div class="form-group" :class="{ 'focused': focusedField === 'peopleNum', 'filled': peopleNum }">
          <label for="peopleNum">参加人数 <span class="required">*</span></label>
          <div class="input-group">
            <v-icon icon="mdi-account-group" size="small" class="input-icon"></v-icon>
            <input 
              type="number" 
              id="peopleNum" 
              v-model="peopleNum" 
              class="form-input" 
              placeholder="参加人数を入力してください" 
              required
              min="1"
              @focus="focusField('peopleNum')"
              @blur="blurField"
            >
            <span class="input-highlight"></span>
          </div>
          <div class="error-message" v-if="errors.peopleNum">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.peopleNum }}
          </div>
        </div>
        
        <!-- コメント -->
        <div class="form-group" :class="{ 'focused': focusedField === 'comment', 'filled': comment }">
          <label for="comment">コメント <span class="required">*</span></label>
          <div class="input-group textarea-group">
            <v-icon icon="mdi-comment-text" size="small" class="input-icon textarea-icon"></v-icon>
            <textarea 
              id="comment" 
              v-model="comment" 
              class="form-input textarea-input" 
              placeholder="忘年会にぴったりのお店でした！" 
              required
              rows="3"
              maxlength="300"
              @focus="focusField('comment')"
              @blur="blurField"
            ></textarea>
            <span class="input-highlight"></span>
          </div>
          <div class="comment-counter" :class="{ 'warning': comment.length > 250 }">
            {{ comment.length }}/300
          </div>
          <div class="error-message" v-if="errors.comment">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.comment }}
          </div>
        </div>
        
        <!-- 送信ボタン -->
        <div class="form-actions">
          <button type="button" class="cancel-button" @click="closeModal">
            <v-icon icon="mdi-close" size="small"></v-icon>
            キャンセル
          </button>
          <button type="submit" class="submit-button" :disabled="!isFormValid || isSubmitting">
            <template v-if="isSubmitting">
              <div class="spinner"></div>
              <span>登録中...</span>
            </template>
            <template v-else>
              <v-icon icon="mdi-check" size="small"></v-icon>
              <span>登録する</span>
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <!-- トースト通知 -->
  <ToastNotification
    v-model:show="showToast"
    :message="toastMessage"
    :type="toastType"
  />
</template>

<script>
import axios from 'axios';
import { performances } from '@/constants/performances';
import ToastNotification from '@/components/common/ToastNotification.vue';

export default {
  name: 'ReviewModal',
  components: {
    ToastNotification
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      performance: "",
      performances: performances,
      role: "",
      roles: ['幹事', '参加者'],
      rating: 5,
      comment: "",
      peopleNum: "",
      date: new Date().toISOString().substr(0, 10),
      isSubmitting: false,
      shopName: "",
      shopImage: "",
      focusedField: null,
      formProgress: 0,
      errors: {
        performance: '',
        role: '',
        peopleNum: '',
        comment: ''
      },
      // トースト通知用の状態
      showToast: false,
      toastMessage: "",
      toastType: "success"
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
        this.fetchShopInfo();
      } else {
        document.body.style.overflow = '';
      }
    },
    performance() {
      this.updateFormProgress();
    },
    role() {
      this.updateFormProgress();
    },
    peopleNum() {
      this.updateFormProgress();
    },
    comment() {
      this.updateFormProgress();
    }
  },
  computed: {
    isFormValid() {
      return (
        this.performance &&
        this.role &&
        this.rating &&
        this.comment.length > 0 &&
        this.peopleNum > 0 &&
        !this.hasErrors()
      );
    }
  },
  methods: {
    focusField(fieldName) {
      this.focusedField = fieldName;
    },
    blurField() {
      this.focusedField = null;
      this.validateForm();
    },
    updateFormProgress() {
      // 必須フィールドの数
      const requiredFields = 4;
      // 入力済みの必須フィールドの数
      let filledRequiredFields = 0;
      
      if (this.performance) filledRequiredFields++;
      if (this.role) filledRequiredFields++;
      if (this.peopleNum > 0) filledRequiredFields++;
      if (this.comment.length > 0) filledRequiredFields++;
      
      this.formProgress = Math.round((filledRequiredFields / requiredFields) * 100);
    },
    validateForm() {
      // エラーをリセット
      this.errors = {
        performance: '',
        role: '',
        peopleNum: '',
        comment: ''
      };
      
      // 利用部門のバリデーション
      if (!this.performance) {
        this.errors.performance = '利用部門を選択してください';
      }
      
      // 属性のバリデーション
      if (!this.role) {
        this.errors.role = '属性を選択してください';
      }
      
      // 参加人数のバリデーション
      if (!this.peopleNum) {
        this.errors.peopleNum = '参加人数を入力してください';
      } else if (this.peopleNum <= 0) {
        this.errors.peopleNum = '参加人数は1人以上で入力してください';
      }
      
      // コメントのバリデーション
      if (!this.comment.trim()) {
        this.errors.comment = 'コメントを入力してください';
      }
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    },
    async fetchShopInfo() {
      try {
        const response = await axios.get(`https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/shop?shop_id=${this.shopId}`);
        if (response.data.shop_items.length > 0) {
          this.shopName = response.data.shop_items[0].Name;
          this.shopImage = response.data.shop_items[0].PicUrl;
        } else {
          console.error('No shop items found for the provided shop_id');
        }
      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    },
    async submitReview() {
      this.validateForm();
      
      if (this.isFormValid && !this.isSubmitting) {
        this.isSubmitting = true;
        
        try {
          const requestBody = {
            shop_id: this.shopId,
            section: this.performance,
            comment: this.comment,
            rate: this.rating,
            role: this.role,
            date: this.date,
            peopleNum: Number(this.peopleNum)
          };

          const response = await axios.post(
            'https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/review',
            requestBody
          );

          if (response.status === 200) {
            // 成功時の処理
            this.$emit('review-submitted');
            this.resetForm();
            this.closeModal();
            
            // トースト通知を表示
            this.showToast = true;
            this.toastMessage = 'レビューを登録しました！';
          }
        } catch (error) {
          console.error('Error registering the review:', error);
          // エラー時のトースト通知
          this.showToast = true;
          this.toastMessage = 'レビューの登録に失敗しました。';
          this.toastType = 'error';
        } finally {
          this.isSubmitting = false;
        }
      }
    },
    resetForm() {
      this.performance = "";
      this.role = "";
      this.rating = 5;
      this.comment = "";
      this.peopleNum = "";
      this.formProgress = 0;
      this.errors = {
        performance: '',
        role: '',
        peopleNum: '',
        comment: ''
      };
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modal-appear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8f5e9;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.modal-header-upper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 24px 10px 24px;
}

.modal-header h2 {
  margin: 0;
  color: #2e7d32;
  font-size: 24px;
  font-weight: 700;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.close-button:hover {
  color: #2e7d32;
  background-color: rgba(46, 125, 50, 0.1);
}

.progress-bar-container {
  height: 4px;
  background-color: #e8e8e8;
  width: 100%;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #2e7d32, #81c784);
  transition: width 0.5s ease;
}

.register-form {
  padding: 24px;
}

/* 店舗情報 */
.shop-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8f5e9;
}

.shop-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.shop-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-name {
  font-size: 18px;
  font-weight: 600;
  color: #2e7d32;
  text-align: center;
}

/* 評価スター */
.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.rating-stars {
  margin-right: 12px;
}

.rating-value {
  font-size: 20px;
  font-weight: 600;
  color: #ff9800;
}

/* フォームグループ */
.form-group {
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.form-group.focused {
  transform: translateY(-2px);
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
  transition: color 0.3s;
}

.form-group.focused label {
  color: #2e7d32;
}

.required {
  color: #e53935;
  margin-left: 4px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #666;
  transition: color 0.3s;
  z-index: 1;
}

.textarea-icon {
  top: 14px;
}

.form-group.focused .input-icon {
  color: #2e7d32;
}

.select-icon {
  position: absolute;
  right: 12px;
  color: #666;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 14px 14px 14px 40px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s;
  background-color: #f9f9f9;
  position: relative;
  z-index: 0;
}

.textarea-input {
  padding-top: 14px;
  min-height: 100px;
  resize: vertical;
}

.form-input:focus {
  border-color: #2e7d32;
  background-color: white;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.1);
  outline: none;
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #2e7d32;
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

.comment-counter {
  text-align: right;
  font-size: 12px;
  color: #757575;
  margin-top: 4px;
}

.comment-counter.warning {
  color: #ff9800;
}

.error-message {
  display: flex;
  align-items: center;
  color: #e53935;
  font-size: 12px;
  margin-top: 6px;
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.error-icon {
  margin-right: 4px;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-2px, 0, 0); }
  40%, 60% { transform: translate3d(2px, 0, 0); }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 32px;
}

.cancel-button {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: white;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cancel-button:hover {
  background-color: #f5f5f5;
  color: #333;
  border-color: #ccc;
}

.submit-button {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background-color: #2e7d32;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
}

.submit-button:hover:not(:disabled) {
  background-color: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(46, 125, 50, 0.3);
}

.submit-button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* モバイル対応 */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 85vh;
    border-radius: 12px;
  }
  
  .register-form {
    padding: 16px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0px;
    margin-top: 24px;
  }
  
  .cancel-button, .submit-button {
    width: 100%;
    justify-content: center;
    padding: 14px 20px;
  }
  
  .submit-button {
    order: -1;
    margin-bottom: 12px;
  }
}
</style> 