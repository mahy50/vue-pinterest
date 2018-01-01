<template>
  <div class="pin-create" v-show="opened" @click.self="handleClose">
    <div class="pin-create__container">
      <header class="pin-create__header">
        <slot name="header"></slot>
      </header>
      <div class="pin-create__content">
        <slot name="content"></slot>
      </div>
      <div class="pin-create__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import * as types from './../store/types'
export default {
  data () {
    return {
      bodyTop: 0,
      opened: false
    }
  },
  props: {
    isModal: Boolean
  },
  methods: {
    // 创建Pin弹窗
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
    show () {
      this.opened = true
      this.stopBodyScroll(true)
    },
    hide () {
      this.opened = false
      this.stopBodyScroll(false)
    },
    handleClose () {
      this.$emit('update:isModal', false)
    }
  },
  watch: {
    isModal (val) {
      if (val) {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  beforeDestroy () {
    this.$emit('update:isModal', false)
  }
}
</script>
