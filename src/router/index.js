import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import axios from 'axios'
import * as types from './../store/types'
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
      meta: {
        requireAuth: true
      },
      component: PinHome
    }, {
      path: '/pin/:id',
      name: 'PinDetail',
      meta: {
        requireAuth: true
      },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.user) {
      next()
    } else {
      axios.get('api/users/is_auth').then(res => {
        if (res.data.status === 0) {
          store.commit(types.USERUPDATE, res.data.result)
          next()
        } else {
          next({
            path: '/login',
            query: {redirect: to.fullPath}
          })
        }
      })
    }
  } else {
    next()
  }
})

export default router
