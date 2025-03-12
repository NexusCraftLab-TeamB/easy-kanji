import { createApp } from 'vue'
import ToastNotification from '@/components/common/ToastNotification.vue'

export const toast = {
  install(app) {
    const toastSymbol = Symbol()
    
    // トーストコンポーネントのインスタンスを作成
    const mountPoint = document.createElement('div')
    document.body.appendChild(mountPoint)
    const toastApp = createApp(ToastNotification)
    const toastInstance = toastApp.mount(mountPoint)
    
    // グローバルメソッドを追加
    app.config.globalProperties.$toast = {
      show(message, type = 'success', duration = 3000) {
        toastInstance.show(message, type, duration)
      },
      success(message, duration) {
        this.show(message, 'success', duration)
      },
      error(message, duration) {
        this.show(message, 'error', duration)
      },
      warning(message, duration) {
        this.show(message, 'warning', duration)
      },
      info(message, duration) {
        this.show(message, 'info', duration)
      }
    }
    
    // Composition API用のプロバイダー
    app.provide(toastSymbol, app.config.globalProperties.$toast)
  }
} 