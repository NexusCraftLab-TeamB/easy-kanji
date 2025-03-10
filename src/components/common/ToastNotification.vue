<template>
  <div class="toast-container">
    <transition>
      <div v-if="show" class="toast-notification" :class="type">
        <v-icon :icon="icon" size="small" class="toast-icon"></v-icon>
        <span class="toast-message">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    icon() {
      const icons = {
        success: 'mdi-check-circle',
        error: 'mdi-alert-circle',
        warning: 'mdi-alert',
        info: 'mdi-information'
      }
      return icons[this.type]
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$emit('update:show', false)
        }, this.duration)
      }
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 350px;
}

.toast-notification {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.toast-notification.success {
  background-color: #e8f5e9;
  border-left: 2px solid #2e7d32;
  color: #2e7d32;
}

.toast-notification.error {
  background-color: #ffebee;
  border-left: 4px solid #e53935;
  color: #e53935;
}

.toast-notification.warning {
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
  color: #ff9800;
}

.toast-notification.info {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  color: #2196f3;
}

.toast-notification.v-enter-active {
  animation: toast-in 0.3s ease-in-out;
}

.toast-notification.v-leave-active {
  animation: toast-out 0.3s ease-in-out;
}

.toast-icon {
  margin-right: 12px;
  flex-shrink: 0;
}

.toast-message {
  font-weight: bold;
  font-size: 14px;
}

@keyframes toast-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* モバイル対応 */
@media (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style> 