  position: relative;
<template>
  <div class="pin-container">
    <pin-header></pin-header>
    <div class="pin-content">
      <button class="btn-icon" @click="add()" :style="{position: 'fixed'}">添加</button>
      <stack-grid
        :columnWidth="236"
        :gutterX="24"
        :gutterY="100"
        v-if="dataset"
      >
          <router-link v-for="(item, index) in dataset" :key="index"
            class="pin-card-item"
            :height="item.images['236x'].height"
            :style="{backgroundColor: item.dominant_color}"
            :to="'/pin/' + item.id"
          >
            <div class="pin-card__wrap" @mouseover="over(index)" @mouseout="out()">
              <div class="pin-card__image-wrap" :class="{'is-fade': fade === index}">
                <div class="pin-card__link">
                  <img class="pin-card__image" :src="item.images['236x'].url" :alt="item.title" >
                  <!--  -->
                  <div class="pin-card__overlay">
                    <div class="pin-card__overlay-dim"></div>
                    <div class="pin-card__overlay-gradient"></div>
                  </div>
                </div>
              </div>
              <div class="pin-card__image-meta">
                <span>{{limitStringWidth(item.description)}}</span>
              </div>
            </div>
          </router-link>
      </stack-grid>
    </div>
  </div>
</template>

<script>
import PinHeader from '@/components/PinHeader.vue'
import axios from 'axios'
export default {
  data () {
    return {
      dataset: [],
      page: 1,
      pageSize: 20,
      fade: false
    }
  },
  components: {
    PinHeader
    // StackGrid
    // StackGridItem
  },
  methods: {
    add () {
      this.page++
      this.getPins()
    },
    over (index) {
      this.fade = index
    },
    out () {
      this.fade = false
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
    },
    getPins () {
      axios.get('/api/pins', {
        params: {
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.dataset.push(...res.data.result)
          console.log(this.dataset)
        }
      })
    }

  },
  mounted () {
  },
  created () {
    this.getPins()
  }
}
</script>
