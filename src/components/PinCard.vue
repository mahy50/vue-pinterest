<template>
  <div class="pin-card">
    <div class="pin-card__wrap">
      <div class="pin-card__image-wrap">
        <slot></slot>
        <div class="pin-card__overlay" v-if="hasOverlay">
          <div class="pin-card__overlay-dim"></div>
          <div class="pin-card__overlay-gradient"></div>
        </div>
      </div>
      <div class="pin-card__image-meta" v-if="hasMeta">
        <slot name="meta"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fade: false
    }
  },
  props: {
    hasMeta: {
      type: Boolean,
      default: true
    },
    hasOverlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>
