// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import StackGrid from './base/StackGrid'
import MessageBox from './base/MessageBox'

import store from './store'
import router from './router'

import './assets/css/index.scss'

Vue.config.productionTip = false
Vue.use(StackGrid)
Vue.use(MessageBox)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$message.show('aaa')
  }
})
