<template>
  <div class="pin-detail" @click.self="goBack()">
        <div class="pin-detail__container">
          <header class="pin-detail__header">
            <div class="pin-detail__header-left">
              <a class="btn-icon">
                <svg class="pin-svg-icon" height="22" width="20" viewBox="0 2 24 24" aria-label="Send" role="img" xmlns="http://www.w3.org/2000/svg"><title>Send</title><path d="M21.00,14.00 C22.10,14.00 23.00,14.90 23.00,16.00 L23.00,22.00 C23.00,23.10 22.10,24.00 21.00,24.00 L3.00,24.00 C1.90,24.00 1.00,23.10 1.00,22.00 L1.00,16.00 C1.00,14.90 1.90,14.00 3.00,14.00 C4.10,14.00 5.00,14.90 5.00,16.00 L5.00,20.00 L19.00,20.00 L19.00,16.00 C19.00,14.90 19.90,14.00 21.00,14.00 Z M8.82,8.84 C8.04,9.62 6.77,9.63 5.99,8.84 C5.21,8.06 5.20,6.80 5.98,6.02 L11.99,0.00 L18.01,6.01 C18.79,6.79 18.80,8.06 18.02,8.84 C17.24,9.62 15.97,9.63 15.19,8.84 L13.99,7.65 L13.99,13.83 C13.99,14.93 13.10,15.83 11.99,15.83 C10.89,15.83 9.99,14.93 9.99,13.83 L9.99,7.66 L8.82,8.84 Z"></path></svg>
                <span>Send</span>
              </a>
              <a class="btn-icon">
                <svg class="pin-svg-icon" height="22" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><title></title><path d="M12.00,9.00 C10.34,9.00 9.00,10.34 9.00,12.00 C9.00,13.66 10.34,15.00 12.00,15.00 C13.66,15.00 15.00,13.66 15.00,12.00 C15.00,10.34 13.66,9.00 12.00,9.00 M3.00,9.00 C4.66,9.00 6.00,10.34 6.00,12.00 C6.00,13.66 4.66,15.00 3.00,15.00 C1.34,15.00 0.00,13.66 0.00,12.00 C0.00,10.34 1.34,9.00 3.00,9.00 Z M21.00,9.00 C22.66,9.00 24.00,10.34 24.00,12.00 C24.00,13.66 22.66,15.00 21.00,15.00 C19.34,15.00 18.00,13.66 18.00,12.00 C18.00,10.34 19.34,9.00 21.00,9.00 Z"></path></svg>
              </a>
            </div>
            <div class="pin-detail__header-right">
              <a class="btn-icon btn-icon--save pin-detail__save">
                <svg class="pin-svg-icon" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img" xmlns="http://www.w3.org/2000/svg">
                  <title></title>
                  <path d="M18.00,13.50 C18.00,11.28 16.79,9.35 15.00,8.31 L15.00,2.45 C16.14,2.22 17.00,1.21 17.00,0.00 L7.00,0.00 C7.00,1.21 7.86,2.22 9.00,2.45 L9.00,8.31 C7.21,9.35 6.00,11.28 6.00,13.50 L11.00,13.50 L11.00,21.96 L12.00,24.00 L13.00,21.96 L13.00,13.50 L18.00,13.50 Z"></path>
                </svg>
                <span>Save</span>
              </a>
            </div>
          </header>
          <div class="pin-detail__content" v-if="pin">
            <div class="pin-detail__title">
              <h2>{{pin.title}}</h2>
              </div>
            <div class="pin-detail__card">
              <a><img :src="pin.images && pin.images.origin.url"
                :alt="pin.description"/></a>
            </div>
            <div>
              <div class="pin-detail__user">
                <div>
                  <img :src="pin.pinner && pin.pinner.image_small_url"
                    :alt="pin.pinner && pin.pinner.username" class="avatar">
                  {{pin.pinner && pin.pinner.username}}
                </div>
                <div>
                  <button class="btn-icon">like</button>
                </div>
              </div>
              <div>
              </div>
            </div>
            <div class="pin-detail__description">
              <h6>Description</h6>
              <p>{{pin.description}}</p>
            </div>
            <div class="pin-detail__published">
              <h6>Publish time</h6>
              <p>{{pin.created_at}}</p>
            </div>
          </div>
          <div class="pin-detail__btn-group">
            <button class="btn-icon btn-icon--clear pin-detail__icon--back" @click="goBack()">
              <svg class="pin-svg-icon" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M17.28,24.00 C16.71,24.00 16.14,23.78 15.70,23.34 L4.50,12.00 L15.70,0.66 C16.57,-0.22 17.98,-0.22 18.85,0.66 C19.72,1.54 19.72,2.96 18.85,3.84 L10.79,12.00 L18.85,20.16 C19.72,21.04 19.72,22.46 18.85,23.34 C18.41,23.78 17.85,24.00 17.28,24.00"></path></svg>
              <span class="pin-detail__icon-text">Back to feed</span>
            </button>
          </div>
        </div>
  </div>
</template>

<script>
import * as types from './../store/types'
export default {
  data () {
    return {
      pin: null
    }
  },
  methods: {
    filterPin (collection, id) {
      for (let key in collection) {
        let item = collection[key]
        if (item._id === id) {
          return item
        }
      }
    },
    getPinById () {
      let id = this.$route.params.id
      if (this.$store.state.pins) {
        let tmp = this.filterPin(this.$store.state.pins, id)
        if (tmp) {
          this.pin = tmp
          return
        }
      }
      this.$store.dispatch(types.GETPINBYID, id).then(data => {
        this.pin = Object.assign({}, data)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getPinById()
  }
}
</script>
