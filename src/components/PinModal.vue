<script>
export default {
  data () {
    return {
      bodyTop: 0,
      opened: false
    }
  },
  props: {
    isActive: Boolean,
    hasClose: {
      type: Boolean,
      default: true
    }
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
      this.$emit('update:isActive', false)
    }
  },
  watch: {
    isActive (val) {
      if (val) {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  beforeDestroy () {
    this.$emit('update:isActive', false)
  }
}
</script>
