import Vue from 'vue'
import MessageBoxVue from './MessageBox.vue'
const MessageBox = {}

const MessageBoxConstructor = Vue.extend(MessageBoxVue)
const initInstance = () => {
  instance = new MessageBoxConstructor()
  let messageBoxEl = instance.$mount().$el
  document.body.appendChild(messageBoxEl)
}
let instance
MessageBox.install = function (Vue, options) {
  Vue.prototype.$message = {
    show (options) {
      if (!instance) {
        initInstance()
      }
      if (typeof options === 'string') {
        instance.content = options
      } else if (typeof options === 'object') {
        Object.assign(instance, options)
      }
      return instance.show()
              .then(val => {
                instance = null
                return Promise.resolve(val)
              })
              .catch((err) => {
                instance = null
                return Promise.reject(err)
              })
    }
  }
}
MessageBox.show = (options) => {
  if (!instance) {
    initInstance()
  }
  if (typeof options === 'string') {
    instance.content = options
  } else if (typeof options === 'object') {
    Object.assign(instance, options)
  }
  return instance.show()
          .then(val => {
            instance = null
            return Promise.resolve(val)
          })
          .catch((err) => {
            instance = null
            return Promise.reject(err)
          })
}
export default MessageBox
