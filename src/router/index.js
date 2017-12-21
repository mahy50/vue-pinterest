import Vue from 'vue'
import Router from 'vue-router'
import PinHome from '@/views/PinHome.vue'
import PinDetail from '@/views/PinDetail.vue'
import PinLogin from '@/views/PinLogin.vue'
import PinSignup from '@/views/PinSignup.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PinHome',
      component: PinHome
    }, {
      path: '/pin/:id',
      name: 'PinDetail',
      component: PinDetail
    }, {
      path: '/login',
      name: 'PinLogin',
      component: PinLogin
    }, {
      path: '/signup',
      name: 'PinSignup',
      component: PinSignup
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let session = true
//   if (session) {
//     if (to.path === '/login') {
//       next({path: '/'})
//     }
//   }
// })

export default router
