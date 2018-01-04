<template>
  <div class="msg__box">
    <div class="msg__mask"></div>
    <div class="msg__container">
      <div class="msg__header">
        <div class="msg__close">x</div>
        <h3 class="msg__title">{{title}}</h3>
      </div>
      <div class="msg__content">
        {{content}}
        <input class="msg__input" type="text" v-model="value" v-if="showInput" ref="input"
          @keyup.enter="confirm" placeholder="{placeholder}">
      </div>
      <div class="msg__btn-group">
        <button class="msg__btn--cancel" @click="cancel" v-show="showCancelBtn">{{cancelBtnText}}</button>
        <button class="msg__btn--confirm" @click="confirm" v-show="showConfirmBtn">{{confirmBtnText}}</button>
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
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.msg__box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 300;
  .msg__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.3)
  }
  .msg__container {
    position: relative;
    min-width: 50%;
    background-color: #fff;
    z-index: 301;
  }
  .msg__title {
     padding: 15px 0 0;
  }
  .msg__content {
    background-color: #fff;
    min-width: 50%;
    border: 1px solid #ddd;
    padding: 10px 20px 15px;
    min-height: 36px;
  }
  .msg__close {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    right: 10px;
  }
  .msg__input {

  }
}
</style>
