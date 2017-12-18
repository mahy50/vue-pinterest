export default {
  name: 'stack-grid',
  data () {
    return {
      containerWidth: 0,
      containerHeight: 0,
      columnHeights: [], // 存储每列的高度,
      grid: [], // 存储每个格子的定位，宽，高
      fade: false
    }
  },
  props: {
    columnWidth: {
      type: [Number],
      default: 200
    },
    gutterX: {
      type: Number,
      default: 20
    },
    gutterY: {
      type: Number,
      default: 20
    }
  },
  computed: {
    columnNum () {
      return Math.floor((this.containerWidth + this.gutterX) / (this.columnWidth + this.gutterX))
    }
  },
  methods: {
    getContainerWidth () {
      if (this.$parent.$el) {
        return this.$parent.$el.clientWidth
      } else {
        return window ? window.document.clientWidth : 'auto'
      }
    },
    getWrapStyles () {
      let width = (this.columnNum * this.columnWidth) + ((this.columnNum - 1) * this.gutterX)
      let styles = {
        width: width + 'px',
        height: Math.max(...this.columnHeights) + 'px'
      }
      return styles
    },
    getItemHeight (child) {
      if (child.data.attrs) {
        return child.data.attrs.height
      } else {
        return 'auto'
      }
    },
    styleHelper (elm, rect) {
      elm.data.class = 'pin-card-item'
      elm.elm.setAttribute('style',
        `height: ${rect.height}px;
          width: ${rect.width}px;
          transform: translateX(${rect.left}px) translateY(${rect.top}px)`
      )
    },
    setRect (item, rect) {
      this.styleHelper(item, rect)
    },
    fillColumn (child, heights, width, gutterX, gutterY) {
      const i = heights.indexOf(Math.min(...heights))
      const top = heights[i]
      const left = i * (width + gutterX)
      const height = this.getItemHeight(child)
      heights[i] += Math.round(height) + gutterY
      return { top, left, width, height }
    },
    genLayout (dataset) {
      let columnHeights = Array(this.columnNum).fill(0)
      // console.log(this.columnNum)
      dataset.forEach((child, index) => {
        let rect = this.fillColumn(child, columnHeights, this.columnWidth, this.gutterX, this.gutterY)
        // console.log(rect)
        // this.setRect(child, rect)
      })
      return dataset
    },
    init () {
      this.containerWidth = this.getContainerWidth()
      this.genLayout(this.$slots.default)
    }
  },
  render (h) {
    const children = this.genLayout(this.$slots.default)
    console.log(children)
  },
  updated () {
    this.$nextTick(() => {
      if (this.$slots.default) {
        this.genLayout(this.$slots.default)
      }
    })
  },
  mounted () {
    this.containerWidth = this.getContainerWidth()
    window.addEventListener('resize', () => { this.init() })
  },
  destroyed () {
    window.removeEventListener('resize', () => { this.init() })
  }
}
/**
   * 数据驱动布局
   * containerWidth => layout
   * dataset => layout item
   * 更新
   * resize 更新 width
   * slot 更新 => updated => init
   *
   */
/* todo
 * render函数
 * 动画函数
 * 样式
 * requsetAnimate
 * 参数： flex-center .stack-grid-wrap = position: relative;
 */
