<template>
  <div class="pin-container">
    <pin-header></pin-header>
    <div class="pin-content">
      <div class="btn-icon pin-create__button" @click="isActive = true">
        <svg class="pin-svg__icon" height="14" width="14" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><title></title><path d="M22.00,10.00 L14.00,10.00 L14.00,2.00 C14.00,0.90 13.10,0.00 12.00,0.00 C10.90,0.00 10.00,0.90 10.00,2.00 L10.00,10.00 L2.00,10.00 C0.90,10.00 0.00,10.90 0.00,12.00 C0.00,13.10 0.90,14.00 2.00,14.00 L10.00,14.00 L10.00,22.00 C10.00,23.10 10.90,24.00 12.00,24.00 C13.10,24.00 14.00,23.10 14.00,22.00 L14.00,14.00 L22.00,14.00 C23.10,14.00 24.00,13.10 24.00,12.00 C24.00,10.90 23.10,10.00 22.00,10.00"></path></svg>
      </div>
      <stack-grid
        :columnWidth="236"
        :gutterX="24"
        :gutterY="80"
        :easing="'easeOut'"
        v-if="dataset"
      >
        <!-- 需要传入height和background-color来占位 -->
        <div v-for="(item, index) in dataset" :key="index" class="pin-card-item">
          <router-link :to="'/pin/' + item._id">
            <pin-card :hasOverlay="true">
              <div class="pin-card__content"
                :style="{backgroundColor: item.dominant_color, height: item.images['236x'].height + 'px'}">
                <img :src="item.images['236x'].url" :alt="item.title">
              </div>
                <span slot="meta">{{limitStringWidth(item.description)}}</span>
            </pin-card>
          </router-link>
        </div>
      </stack-grid>
    </div>
     <infinite-loading @infinite="loadMore" spinner="waveDots" ref="loading"></infinite-loading>
    <pin-create :is-active.sync="isActive"></pin-create>
  </div>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading'
import PinHeader from '@/components/PinHeader'
import PinCard from '@/components/PinCard'
import PinCreate from '@/components/PinCreate'
import StackGrid from '../../node_modules/vue-stack-grid-component/src/index'
import * as types from './../store/types'
export default {
  data () {
    return {
      fade: false,
      isActive: false
    }
  },
  computed: {
    dataset () {
      return this.$store.state.pins
    }
  },
  components: {
    PinHeader,
    PinCard,
    PinCreate,
    infiniteLoading,
    StackGrid: StackGrid
  },
  methods: {
    loadMore ($state) {
      this.$store.dispatch(types.GETPINS).then(hasMore => {
        // console.log('has more', hasMore)
        if (hasMore) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    getTextWidth (text, font) {
      var canvas = this.getTextWidth.canvas ||
                  (this.getTextWidth.canvas = document.createElement('canvas'))
      let context = canvas.getContext('2d')
      context.font = font
      let metrics = context.measureText(text)
      return metrics.width
    },
    limitStringWidth (str) {
      let string = str
      let pix = this.getTextWidth(string, '16px sans-serif')
      if (pix > 400) {
        let len = Math.floor(string.length * 330 / pix)
        string = string.substr(0, len) + '…'
      }
      return string
    }
  },
  watch: {
    dataset (val) {
      this.$refs.loading.$emit('$InfiniteLoading:reset')
    }
  },
  mounted () {
    // 页面每次加载都会调用loadMore方法，所以先清除数据，避免重复
    this.$store.commit(types.RESETDATA)
  }
}
</script>
