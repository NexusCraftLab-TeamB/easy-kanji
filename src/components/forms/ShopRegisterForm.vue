<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-upper">
          <h2>店舗登録</h2>
          <button class="close-button" @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: formProgress + '%' }"></div>
        </div>
        <div class="registration-notice">
          <v-icon icon="mdi-information" size="small" class="notice-icon"></v-icon>
          <span>登録後の情報変更はできません</span>
        </div>
      </div>
      
      
      <form @submit.prevent="handleSubmit" class="register-form">
        <!-- 店名 -->
        <div class="form-group" :class="{ 'focused': focusedField === 'name', 'filled': formData.name }">
          <label for="name">店名 <span class="required">*</span></label>
          <div class="input-group">
            <v-icon icon="mdi-storefront" size="small" class="input-icon"></v-icon>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              class="form-input" 
              placeholder="店名を入力してください" 
              required
              @focus="focusField('name')"
              @blur="blurField"
            >
            <span class="input-highlight"></span>
          </div>
          <div class="error-message" v-if="errors.name">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.name }}
          </div>
        </div>
        
        <!-- 住所 -->
        <div class="form-group" :class="{ 'focused': focusedField === 'address', 'filled': formData.address }">
          <label for="address">住所 <span class="required">*</span></label>
          <div class="input-group">
            <v-icon icon="mdi-map-marker" size="small" class="input-icon"></v-icon>
            <input 
              type="text" 
              id="address" 
              v-model="formData.address" 
              class="form-input" 
              placeholder="住所を入力してください" 
              required
              @focus="focusField('address')"
              @blur="blurField"
            >
            <span class="input-highlight"></span>
          </div>
          <div class="error-message" v-if="errors.address">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.address }}
          </div>
        </div>
        
        <!-- ジャンル -->
        <div class="form-group" :class="{ 'focused': focusedField === 'genre', 'filled': formData.genre }">
          <label for="genre">ジャンル <span class="required">*</span></label>
          <div class="input-group">
            <v-icon icon="mdi-silverware-fork-knife" size="small" class="input-icon"></v-icon>
            <select 
              id="genre" 
              v-model="formData.genre" 
              class="form-input" 
              required
              @focus="focusField('genre')"
              @blur="blurField"
            >
              <option value="" disabled selected>ジャンルを選択してください</option>
              <option v-for="genre in genres" :key="genre.code" :value="genre.code">
                {{ genre.name }}
              </option>
            </select>
            <span class="input-highlight"></span>
            <v-icon icon="mdi-chevron-down" size="small" class="select-icon"></v-icon>
          </div>
          <div class="error-message" v-if="errors.genre">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ errors.genre }}
          </div>
        </div>
        
        <!-- アクセス -->
        <div class="form-group" :class="{ 'focused': focusedField === 'access', 'filled': formData.access }">
          <label for="access">アクセス</label>
          <div class="input-group">
            <v-icon icon="mdi-train" size="small" class="input-icon"></v-icon>
            <input 
              type="text" 
              id="access" 
              v-model="formData.access" 
              class="form-input" 
              placeholder="最寄り駅からのアクセスを入力してください"
              @focus="focusField('access')"
              @blur="blurField"
            >
            <span class="input-highlight"></span>
          </div>
        </div>

        <!-- URL -->
        <div class="form-group" :class="{ 'focused': focusedField === 'shopUrl', 'filled': formData.shopUrl }">
          <label for="shopUrl">URL</label>
          <div class="input-group">
            <v-icon icon="mdi-web" size="small" class="input-icon"></v-icon>
            <input 
              type="text" 
              id="shopUrl" 
              v-model="formData.shopUrl" 
              class="form-input" 
              placeholder="お店のURLがあれば入力してください"
              @focus="focusField('shopUrl')"
              @blur="blurField"
            >
            <span class="input-highlight"></span>
          </div>
        </div>

        <!-- 画像 -->
        <div class="form-group">
          <label>画像</label>
          <div class="image-upload-container" :class="{ 'has-image': imagePreview, 'uploading': isUploading }">
            <div class="image-preview" v-if="imagePreview">
              <img :src="imagePreview" alt="プレビュー">
              <div class="image-overlay">
                <button type="button" class="remove-image" @click="removeImage">
                  <v-icon>mdi-delete</v-icon>
                  <span>削除</span>
                </button>
                <button type="button" class="change-image">
                  <label for="image">
                    <v-icon>mdi-image-edit</v-icon>
                    <span>変更</span>
                  </label>
                </button>
              </div>
            </div>
            <div class="upload-button-container" v-else>
              <label for="image" class="upload-button">
                <v-icon size="large">mdi-image-plus</v-icon>
                <span>画像をアップロード</span>
                <p class="upload-hint">クリックまたはドラッグ＆ドロップ</p>
              </label>
            </div>
            <div class="upload-progress-overlay" v-if="isUploading">
              <div class="upload-progress-container">
                <div class="upload-progress-bar" :style="{ width: uploadProgress + '%' }"></div>
              </div>
              <div class="upload-progress-text">{{ uploadProgress }}% アップロード中...</div>
            </div>
            <input 
              type="file" 
              id="image" 
              ref="imageInput"
              @change="handleImageUpload" 
              accept="image/*" 
              class="image-input"
            >
          </div>
          <div class="error-message" v-if="uploadError">
            <v-icon icon="mdi-alert-circle" size="small" class="error-icon"></v-icon>
            {{ uploadError }}
          </div>
        </div>
        
        <!-- 送信ボタン -->
        <div class="form-actions">
          <button type="button" class="cancel-button" @click="closeModal">
            <v-icon icon="mdi-close" size="small"></v-icon>
            キャンセル
          </button>
          <button type="submit" class="submit-button" :disabled="isSubmitting || isUploading">
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
</template>

<script>
import { genres } from '@/constants/genres.js';
import axios from 'axios';

export default {
  name: 'ShopRegisterForm',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        address: '',
        genre: '',
        access: '',
        shopUrl: '',
        image: null
      },
      errors: {
        name: '',
        address: '',
        genre: '',
      },
      imagePreview: null,
      genres: genres,
      focusedField: null,
      isSubmitting: false,
      formProgress: 0,
      uploadedImageUrl: null,
      uploadError: null,
      uploadProgress: 0,
      isUploading: false
    };
  },
  watch: {
    formData: {
      handler() {
        this.updateFormProgress();
      },
      deep: true
    },
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  methods: {
    focusField(fieldName) {
      this.focusedField = fieldName;
    },
    blurField() {
      this.focusedField = null;
    },
    updateFormProgress() {
      // 必須フィールドの数
      const requiredFields = 3;
      // 入力済みの必須フィールドの数
      let filledRequiredFields = 0;
      
      if (this.formData.name) filledRequiredFields++;
      if (this.formData.address) filledRequiredFields++;
      if (this.formData.genre) filledRequiredFields++;
      
      // オプションフィールドの数
      const optionalFields = 3; // access, shopUrl, image
      // 入力済みのオプションフィールドの数
      let filledOptionalFields = 0;
      
      if (this.formData.access) filledOptionalFields++;
      if (this.formData.shopUrl) filledOptionalFields++;
      if (this.formData.image) filledOptionalFields++;
      
      // 進捗率の計算（必須フィールドは重み付けを高くする）
      const requiredWeight = 0.7;
      const optionalWeight = 0.3;
      
      const requiredProgress = (filledRequiredFields / requiredFields) * requiredWeight * 100;
      const optionalProgress = (filledOptionalFields / optionalFields) * optionalWeight * 100;
      
      this.formProgress = Math.round(requiredProgress + optionalProgress);
    },
    // 画像ファイルをBase64に変換するメソッド
    convertImageToBase64() {
      return new Promise((resolve, reject) => {
        if (!this.formData.image) {
          reject(new Error('画像ファイルがありません'));
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsDataURL(this.formData.image);
      });
    },

    // 画像を圧縮するメソッド
    compressImage(base64Image, maxWidth = 1200, quality = 0.7) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64Image;
        img.onload = () => {
          // 元の画像が十分小さい場合は圧縮しない
          if (img.width <= maxWidth) {
            resolve(base64Image);
            return;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // アスペクト比を維持して幅を制限
          const ratio = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * ratio;
          
          // 画像を描画
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // 圧縮した画像をBase64で取得
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = (e) => {
          reject(e);
        };
      });
    },

    async handleSubmit() {
      // バリデーション
      this.validateForm();
      
      // エラーがなければ処理を続行
      if (!this.hasErrors()) {
        this.isSubmitting = true;
        this.uploadError = null;
        
        try {
          // 画像データの準備
          let imageData = null;
          
          if (this.formData.image) {
            try {
              
              // 画像ファイルのサイズチェック
              const maxSize = 10 * 1024 * 1024; // 10MB
              if (this.formData.image.size > maxSize) {
                this.uploadError = '画像サイズが大きすぎます（上限: 10MB）';
                throw new Error('画像サイズが大きすぎます');
              }
              
              // 進捗表示の開始
              this.isUploading = true;
              this.uploadProgress = 30;
              
              // 画像をBase64に変換
              const base64Image = await this.convertImageToBase64();
              
              // 画像を圧縮
              const compressedImage = await this.compressImage(base64Image, 1200, 0.7);
              
              // Base64データ部分のみ抽出
              imageData = compressedImage.split(',')[1];
              
              this.uploadProgress = 70;
            } catch (error) {
              console.error('画像処理エラー:', error);
              this.uploadError = '画像の処理に失敗しました';
              this.isUploading = false;
              throw error;
            }
          }
          
          // Lambda関数に送信するリクエストボディ
          const requestBody = {
            name: this.formData.name,
            address: this.formData.address,
            genre: this.getGenreName(this.formData.genre),
            access: this.formData.access || '',
            shopUrl: this.formData.shopUrl || '',
            // 画像データ
            imageData: imageData,
          };
          
          // リクエストサイズをログに出力
          const requestSize = JSON.stringify(requestBody).length;
          
          // APIリクエスト
          const response = await axios.post(
            'https://v2r53b54we.execute-api.ap-northeast-1.amazonaws.com/dev/shop',
            requestBody,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              timeout: 20000 // タイムアウトを長めに設定（画像処理があるため）
            }
          );
                    
          // 進捗表示の完了
          this.uploadProgress = 100;
          setTimeout(() => {
            this.isUploading = false;
          }, 500);
          
          if (response.status === 200) {
            alert('店舗登録が完了しました');
            this.resetForm();
            this.closeModal();
          } else {
            alert('店舗登録に失敗しました');
          }
        } catch (error) {
          console.error('送信エラー詳細:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: {
              url: error.config?.url,
              method: error.config?.method,
              timeout: error.config?.timeout
            }
          });
          
          alert('店舗登録に失敗しました');
        } finally {
          this.isSubmitting = false;
        }
      }
    },
    validateForm() {
      // エラーをリセット
      this.errors = {
        name: '',
        address: '',
        genre: ''
      };
      
      // 店名のバリデーション
      if (!this.formData.name.trim()) {
        this.errors.name = '店名を入力してください';
      }
      
      // 住所のバリデーション
      if (!this.formData.address.trim()) {
        this.errors.address = '住所を入力してください';
      }
      
      // ジャンルのバリデーション
      if (!this.formData.genre) {
        this.errors.genre = 'ジャンルを選択してください';
      }
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.image = file;
        this.createImagePreview(file);
      }
    },
    createImagePreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.formData.image = null;
      this.imagePreview = null;
      this.uploadedImageUrl = null;
      this.$refs.imageInput.value = '';
    },
    resetForm() {
      this.formData = {
        name: '',
        address: '',
        genre: '',
        access: '',
        shopUrl: '',
        image: null
      };
      this.imagePreview = null;
      this.uploadedImageUrl = null;
      this.formProgress = 0;
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = '';
      }
    },
    closeModal() {
      this.$emit('close');
    },
    getGenreName(code) {
      const genre = this.genres.find(g => g.code === code);
      return genre ? genre.name : '未選択';
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

.registration-notice {
  display: flex;
  align-items: center;
  padding: 8px 24px;
  background-color: #fff8e1;
  width: 100%;
  font-size: 14px;
  color: #ff8f00;
}

.notice-icon {
  color: #ff8f00;
  margin-right: 8px;
}

.register-form {
  padding: 24px;
}

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

.image-upload-container {
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

.image-upload-container:hover {
  border-color: #2e7d32;
  background-color: #f0f7f0;
}

.image-upload-container.has-image {
  border-style: solid;
  border-color: #2e7d32;
  background-color: white;
}

.image-input {
  display: none;
}

.upload-button-container {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.upload-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #666;
  transition: all 0.3s;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
}

.upload-button:hover {
  color: #2e7d32;
  background-color: rgba(46, 125, 50, 0.05);
}

.upload-hint {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.image-preview {
  position: relative;
  width: 100%;
  max-height: 250px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-preview img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px 10px 10px;
  display: flex;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.remove-image, .change-image {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.remove-image:hover {
  background: rgba(229, 57, 53, 0.8);
}

.change-image:hover {
  background: rgba(255, 255, 255, 0.4);
}

.change-image label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  color: white;
  font-weight: normal;
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