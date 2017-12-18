import Vue from 'vue'
import Router from 'vue-router'
import PinHome from '@/views/PinHome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PinHome',
      component: PinHome
    }
  ]
})
