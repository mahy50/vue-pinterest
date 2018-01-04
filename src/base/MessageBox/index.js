import MessageBoxVue from './MessageBox.vue'

const MessageBox = {}

MessageBox.install = function (Vue, options) {
  const MessageBoxConstructor = Vue.extend(MessageBoxVue)
  let instance
  const initInstance = () => {
    instance = new MessageBoxConstructor()
    let messageBoxEl = instance.$mount().$el
    document.body.appendChild(messageBoxEl)
  }
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
              .catch(err => {
                instance = null
                return Promise.reject(err)
              })
    }
  }
}

export default MessageBox
