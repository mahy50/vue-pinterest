<template>
  <div class="stack-grid" ref="container" :style="{height: containerHeight + 'px'}">
      <div class="stack-grid-wrap"
        :style="getWrapStyles"
      >
      <slot></slot>
      </div>
  </div>
</template>

<script>
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
    },
    getWrapStyles () {
      let width = (this.columnNum * this.columnWidth) + ((this.columnNum - 1) * this.gutterX)
      let styles = {
        width: width + 'px',
        height: this.containerHeight + 'px'
      }
      return styles
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
    getItemHeight (child) {
      if (child.data.attrs) {
        return child.data.attrs.height
      } else {
        return 'auto'
      }
    },
    styleHelper (elm, styles) {
      let styleKeys = Object.keys(styles)
      styleKeys.forEach((key) => {
        elm.style.setProperty(key, styles[key])
      })
    },
    setRect (item, rect) {
      let styles = {
        height: rect.height + 'px',
        width: rect.width + 'px',
        transform: `translateX(${rect.left}px) translateY(${rect.top}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'block',
        opacity: 1
        // transition: 'all 480ms ease-out'
      }
      this.styleHelper(item.elm, styles)
    },
    fillColumn (child, heights, width, gutterX, gutterY) {
      const i = heights.indexOf(Math.min(...heights))
      const top = heights[i]
      const left = i * (width + gutterX)
      const height = this.getItemHeight(child)
      heights[i] += Math.round(height) + gutterY
      return { top, left, width, height }
    },
    genLayout (dataset = []) {
      let columnHeights = Array(this.columnNum).fill(0)
      dataset.forEach((child, index) => {
        let rect = this.fillColumn(child, columnHeights, this.columnWidth, this.gutterX, this.gutterY)
        this.setRect(child, rect)
      })
      this.containerHeight = Math.max(...columnHeights)
    },
    init () {
      this.containerWidth = this.getContainerWidth()
      this.genLayout(this.$slots.default)
    }
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
</script>

<style>
.stack-grid {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 24px;
}
.stack-grid-wrap {
  position: absolute;
  transition: height 480ms ease-out;
}
/* todo
 * render函数
 * 动画函数
 * 样式
 * requsetAnimate
 * 参数： flex-center .stack-grid-wrap = position: relative;
 */
</style>
