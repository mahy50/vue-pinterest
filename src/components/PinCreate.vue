<template>
  <div class="pin-create" v-show="opened" @click.self="handleClose">
    <div class="pin-create__container">
      <header class="pin-create__header">
        <h2>Create Pin</h2>
        <div class="btn-icon" @click="handleClose">
          <svg class="pin-svg-icon" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><title></title><path d="M15.18,12.00 L22.34,4.84 C23.22,3.96 23.22,2.54 22.34,1.66 C21.46,0.78 20.04,0.78 19.16,1.66 L12.00,8.82 L4.84,1.66 C3.96,0.78 2.54,0.78 1.66,1.66 C0.78,2.54 0.78,3.96 1.66,4.84 L8.82,12.00 L1.66,19.16 C0.78,20.04 0.78,21.46 1.66,22.34 C2.10,22.78 2.67,23.00 3.25,23.00 C3.83,23.00 4.40,22.78 4.84,22.34 L12.00,15.18 L19.16,22.34 C19.60,22.78 20.17,23.00 20.75,23.00 C21.33,23.00 21.90,22.78 22.34,22.34 C23.22,21.46 23.22,20.04 22.34,19.16 L15.18,12.00 Z"></path></svg>
        </div>
      </header>
      <!-- content -->
      <div class="pin-create__content">
        <div class="pin-create__content-left">
          <!-- upload -->
          <div v-if="uploaded" >
            <div class="btn-icon" @click="delFile">
                <svg class="pin-svg-icon" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><title></title><path d="M15.18,12.00 L22.34,4.84 C23.22,3.96 23.22,2.54 22.34,1.66 C21.46,0.78 20.04,0.78 19.16,1.66 L12.00,8.82 L4.84,1.66 C3.96,0.78 2.54,0.78 1.66,1.66 C0.78,2.54 0.78,3.96 1.66,4.84 L8.82,12.00 L1.66,19.16 C0.78,20.04 0.78,21.46 1.66,22.34 C2.10,22.78 2.67,23.00 3.25,23.00 C3.83,23.00 4.40,22.78 4.84,22.34 L12.00,15.18 L19.16,22.34 C19.60,22.78 20.17,23.00 20.75,23.00 C21.33,23.00 21.90,22.78 22.34,22.34 C23.22,21.46 23.22,20.04 22.34,19.16 L15.18,12.00 Z"></path></svg>
            </div>
            <img class="pin-create__upload-file" ref="uploadfile" alt="">
          </div>
          <div v-else>
            <div class="upload" @click="handleClick">
              <input type="file" accept="image/*" @change="handleFile" ref="upload"/>
              <div>
                <svg class="pin-svg-icon" height="32" width="32" viewBox="0 0 24 24" aria-label="Add a Photo" role="img"><title>Add a Photo</title><path d="M12.00,10.00 C10.48,10.00 9.25,11.23 9.25,12.75 C9.25,14.27 10.48,15.50 12.00,15.50 C13.52,15.50 14.75,14.27 14.75,12.75 C14.75,11.23 13.52,10.00 12.00,10.00 M12.00,18.00 C9.10,18.00 6.75,15.65 6.75,12.75 C6.75,9.85 9.10,7.50 12.00,7.50 C14.90,7.50 17.25,9.85 17.25,12.75 C17.25,15.65 14.90,18.00 12.00,18.00 M21.00,6.00 L17.00,6.00 L15.00,3.00 L9.00,3.00 L7.00,6.00 L3.00,6.00 C1.90,6.00 1.00,6.90 1.00,8.00 L1.00,19.00 C1.00,20.10 1.90,21.00 3.00,21.00 L21.00,21.00 C22.10,21.00 23.00,20.10 23.00,19.00 L23.00,8.00 C23.00,6.90 22.10,6.00 21.00,6.00"></path></svg>
                <p>Drap and drop or click to upload</p>
              </div>
            </div>
          </div>
        </div>
        <div class="pin-create__content-right form-group">
          <!-- meta -->
          <div class="website">
            <label class="form-label">Website</label>
            <input v-model="url" class="form-input add" type="text"
              placeholder="Add the URL this Pin links to">
          </div>
          <div class="descripte">
            <label class="form-label">Description</label>
            <textarea v-model="description" class="form-input des" type="text"
              placeholder="Say more about this Pin"></textarea>
          </div>
        </div>
      </div>
      <div class="pin-create__footer">
        <button class="btn-icon btn-icon--save"
        :disabled="disabled" @click="handleUpload">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from './../store/types'
export default {
  data () {
    return {
      description: '',
      url: '',
      file: null,
      bodyTop: 0,
      opened: false,
      uploaded: false
    }
  },
  props: {
    isActive: Boolean
  },
  computed: {
    disabled () {
      return !this.url || !this.description || !this.uploaded
    }
  },
  methods: {
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
    handleClose (e) {
      this.$emit('update:isActive', false)
    },
    handleClick (e) {
      this.$refs.upload.click()
    },
    delFile () {
      this.file = null
      this.$refs.uploadfile.file = null
      this.uploaded = false
    },
    handleFile (e) {
      let files = e.target.files
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var imageType = /^image\//

        if (!imageType.test(file.type)) {
          continue
        }
        this.uploaded = true
        this.file = file
        this.$nextTick(() => {
          this.$refs.uploadfile.file = file
          var reader = new FileReader()
          reader.onload = (function (aImg) {
            return function (e) {
              aImg.src = e.target.result
            }
          })(this.$refs.uploadfile)
          reader.readAsDataURL(file)
        })
      }
    },
    handleUpload () {
      this.$store.dispatch(types.UPLOADFILE, {
        url: this.url,
        description: this.description
        // file: this.file
      })
    }
  },
  watch: {
    isActive (val) {
      if (val) {
        this.show()
      } else {
        this.hide()
      }
    },
    disabled () {
      return !this.uploaded && !!this.url && !!this.description
    }
  },
  beforeDestroy () {
    this.$emit('update:isActive', false)
  }
}
</script>

<style lang="scss">

</style>
