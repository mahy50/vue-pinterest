<template>
  <div class="pin-edit" v-show="opened" @click.self="handleClose">
    <div class="pin-edit__container">
      <header class="pin-edit__header">
        <h1>Edit this Pin</h1>
        <div class="btn-icon" v-if="hasClose" @click="handleClose">
          <svg class="pin-svg-icon" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><title></title><path d="M15.18,12.00 L22.34,4.84 C23.22,3.96 23.22,2.54 22.34,1.66 C21.46,0.78 20.04,0.78 19.16,1.66 L12.00,8.82 L4.84,1.66 C3.96,0.78 2.54,0.78 1.66,1.66 C0.78,2.54 0.78,3.96 1.66,4.84 L8.82,12.00 L1.66,19.16 C0.78,20.04 0.78,21.46 1.66,22.34 C2.10,22.78 2.67,23.00 3.25,23.00 C3.83,23.00 4.40,22.78 4.84,22.34 L12.00,15.18 L19.16,22.34 C19.60,22.78 20.17,23.00 20.75,23.00 C21.33,23.00 21.90,22.78 22.34,22.34 C23.22,21.46 23.22,20.04 22.34,19.16 L15.18,12.00 Z"></path></svg>
        </div>
      </header>
      <div class="pin-edit__content">
        <div>
            <label class="form-label">Title</label>
            <input v-model="title" class="form-input" type="text">
          </div>
          <div>
            <label class="form-label">Website</label>
            <input v-model="url" class="form-input" type="text">
          </div>
          <div>
            <label class="form-label">Description</label>
            <textarea v-model="description" class="form-input" type="text"></textarea>
          </div>
      </div>
      <div class="pin-edit__footer">
        <button class="btn-icon btn-icon--rect" @click="handleDel">Delete</button>
        <div>
          <button class="btn-icon btn-icon--rect"
            @click="handleClose">Cancel</button>
          <button class="btn-icon btn-icon--save"
            @click="handleUpdate">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PinModal from './PinModal'
import * as types from './../store/types'
export default {
  data () {
    return {
      id: '',
      title: '',
      url: '',
      description: ''
    }
  },
  props: {
    item: Object
  },
  watch: {
    item (val) {
      this.id = val._id
      this.title = val.title
      this.url = val.url
      this.description = val.description
    }
  },
  mixins: [PinModal],
  methods: {
    handleDel () {
      if (window.confirm('Are you sure?')) {
        this.$store.dispatch(types.DELPINBYID, this.id).then(result => {
          this.$store.dispatch(types.GETOWNPINS)
          if (result) this.handleClose()
        })
      }
    },
    handleUpdate () {
      console.log(this.$store.dispatch)
      this.$store.dispatch(types.UPDATEPINBYID, {
        id: this.id,
        title: this.title,
        url: this.url,
        description: this.description
      }).then(() => {
        this.$store.dispatch(types.GETOWNPINS)
        this.handleClose()
      })
    }
  }
}
</script>

<style>

</style>

