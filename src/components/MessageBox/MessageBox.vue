<template>
  <div class="pin-msg__box">
    <div class="pin-msg__mask"></div>
    <div class="pin-msg__container">
      <div class="pin-msg__header">
        <div class="pin-msg__close btn-icon--clear" @click="cancel">
          <svg class="pin-svg-icon" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><title></title><path d="M15.18,12.00 L22.34,4.84 C23.22,3.96 23.22,2.54 22.34,1.66 C21.46,0.78 20.04,0.78 19.16,1.66 L12.00,8.82 L4.84,1.66 C3.96,0.78 2.54,0.78 1.66,1.66 C0.78,2.54 0.78,3.96 1.66,4.84 L8.82,12.00 L1.66,19.16 C0.78,20.04 0.78,21.46 1.66,22.34 C2.10,22.78 2.67,23.00 3.25,23.00 C3.83,23.00 4.40,22.78 4.84,22.34 L12.00,15.18 L19.16,22.34 C19.60,22.78 20.17,23.00 20.75,23.00 C21.33,23.00 21.90,22.78 22.34,22.34 C23.22,21.46 23.22,20.04 22.34,19.16 L15.18,12.00 Z"></path></svg>
        </div>
        <h3 class="pin-msg__title">{{title}}</h3>
      </div>
      <div class="pin-msg__content">
        {{content}}
        <input class="pin-msg__input" type="text" v-model="value" v-if="showInput" ref="input"
          @keyup.enter="confirm" placeholder="{placeholder}">
      </div>
      <div class="pin-msg__btn-group">
        <button class="pin-msg__btn--cancel btn-icon btn-icon--rect" @click="cancel" v-show="showCancelBtn">{{cancelBtnText}}</button>
        <button class="pin-msg__btn--confirm btn-icon btn-icon--save" @click="confirm" v-show="showConfirmBtn">{{confirmBtnText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibled: false,
      value: '',
      promise: '',
      resolve: '',
      reject: ''
    }
  },
  props: {
    title: {type: String, default: 'Title'},
    content: {type: String, default: 'Are you sure do this ?'},
    showConfirmBtn: {type: Boolean, default: true},
    showCancelBtn: {type: Boolean, default: true},
    showInput: {type: Boolean, default: false},
    confirmBtnText: {type: String, default: '确认'},
    cancelBtnText: {type: String, default: '取消'},
    placeholder: {type: String}
  },
  methods: {
    show () {
      this.visibled = true
      this.stopBodyScroll(true)
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      return this.promise
    },
    stopBodyScroll (isFixed) {
      if (isFixed) {
        this.bodyTop = window.scrollY
        this.$el.style.top = this.bodyTop + 'px'
        document.body.style.position = 'fixed'
        document.body.style.top = -this.bodyTop + 'px'
        document.body.style.width = '100%'
      } else {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        window.scrollTo(0, this.bodyTop)
      }
    },
    cancel () {
      this.visibled = false
      this.stopBodyScroll(false)
      this.reject('cancel')
      this.remove()
    },
    confirm () {
      this.visibled = false
      this.stopBodyScroll(false)
      this.resolve('confirm')
      this.remove()
    },
    remove () {
      setTimeout(() => {
        this.$destroy()
        document.body.removeChild(this.$el)
      }, 20)
    }
  }
}
</script>
