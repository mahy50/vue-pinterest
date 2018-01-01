<template>
  <div class="pin-user__profile">
    <pin-header :sticky="true"></pin-header>
    <div class="pin-user__header-wrapper">
      <div class="pin-user__header-left">
        <h1>{{username}}</h1>
        <div  class="pin-user__follow">
          <div>
            <p>6</p>
            <h6>Followers</h6>
          </div>
          <div>
            <p>6</p>
            <h6>Following</h6>
          </div>
        </div>
      </div>
      <div class="pin-user__header-right">
        <img v-if="image_small_url" :src="image_small_url" class="avatar avatar-sm" :alt="username">
        <div v-else class="pin-user__avatar"></div>
      </div>
    </div>
    <div class="pin-user__profile-content">
      <h3>Pins</h3>
      <div class="pin-user__pins">
        <pin-card class="pin-card--create" @click.native="isActive = true" :hasOverlay="false">
          <div class="pin-card__content">
            <div class="pin-card__create-icon">
              <svg class="pin-svg__icon" height="40" width="40" viewBox="0 0 24 24"><title></title><path d="M17.75,13.25 L13.25,13.25 L13.25,17.75 C13.25,18.44 12.69,19.00 12.00,19.00 C11.31,19.00 10.75,18.44 10.75,17.75 L10.75,13.25 L6.25,13.25 C5.56,13.25 5.00,12.69 5.00,12.00 C5.00,11.31 5.56,10.75 6.25,10.75 L10.75,10.75 L10.75,6.25 C10.75,5.56 11.31,5.00 12.00,5.00 C12.69,5.00 13.25,5.56 13.25,6.25 L13.25,10.75 L17.75,10.75 C18.44,10.75 19.00,11.31 19.00,12.00 C19.00,12.69 18.44,13.25 17.75,13.25 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00"></path></svg>
            </div>
          </div>
          <h5 slot="meta">Create Pin</h5>
        </pin-card>
        <router-link :to="'/pin/' + item._id"  v-if="dataset"
          v-for="(item,index) in dataset" :key="index"
        >
          <pin-card>
            <div class="pin-card__content">
              <img :src="item.images['236x'].url" :alt="item.title">
            </div>
            <h6 slot="meta">{{item.title}}</h6>
            <div slot="group">
              <button class="btn-icon btn-icon--save" @click.stop.prevent="openModal"
                :style="{zIndex: 120, marginTop: '10px'}"
              >edit</button>
            </div>
          </pin-card>
        </router-link>
      </div>
    </div>
    <pin-create :is-active.sync="isActive" ref="create"></pin-create>
    <pin-modal :is-modal.sync="isModal" ref="create">
      <header slot="header">
        <h1> Edit this Pin </h1>
        <button class="btn-icon">
          <div class="pin-card__create-icon">
            <svg class="pin-svg__icon" height="40" width="40" viewBox="0 0 24 24"><title></title><path d="M17.75,13.25 L13.25,13.25 L13.25,17.75 C13.25,18.44 12.69,19.00 12.00,19.00 C11.31,19.00 10.75,18.44 10.75,17.75 L10.75,13.25 L6.25,13.25 C5.56,13.25 5.00,12.69 5.00,12.00 C5.00,11.31 5.56,10.75 6.25,10.75 L10.75,10.75 L10.75,6.25 C10.75,5.56 11.31,5.00 12.00,5.00 C12.69,5.00 13.25,5.56 13.25,6.25 L13.25,10.75 L17.75,10.75 C18.44,10.75 19.00,11.31 19.00,12.00 C19.00,12.69 18.44,13.25 17.75,13.25 M12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00 C0.00,18.63 5.37,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00"></path></svg>
          </div>
        </button>
      </header>
    </pin-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as types from './../store/types'
import PinHeader from './../components/PinHeader'
import PinCard from './../components/PinCard'
import PinCreate from './../components/PinCreate'
import PinModal from './../components/PinModal'
export default {
  data () {
    return {
      dataset: [],
      isActive: false,
      isModal: false
    }
  },
  computed: mapState({
    username: state => state.user && state.user.username,
    image_small_url: state => state.user && state.user.image_small_url
  }),
  components: {
    PinHeader,
    PinCard,
    PinCreate,
    PinModal
  },
  methods: {
    getOwnPins () {
      this.$store.dispatch(types.GETOWNPINS).then(data => {
        this.dataset = data
      })
    },
    openModal () {
      this.isModal = true
    }
  },
  created () {
    // action
    this.getOwnPins()
  },
  mounted () {
    // this.openModal()
  }
}
</script>

