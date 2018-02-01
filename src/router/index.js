import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import * as types from './../store/types'
import PinHome from '@/views/PinHome'
// const PinHome = () => import('@/views/PinHome')
const PinDetail = () => import('@/views/PinDetail')
const PinLogin = () => import('@/views/PinLogin')
const PinSignup = () => import('@/views/PinSignup')
const PinUser = () => import('@/views/PinUser')
const PinAbout = () => import('@/views/PinAbout')
console.log(PinHome)
console.log(PinDetail)
console.log(PinDetail())
console.dir(PinDetail().then(x => console.log(x)))
// import PinDetail from '@/views/PinDetail'
// import PinLogin from '@/views/PinLogin'
// import PinSignup from '@/views/PinSignup'
// import PinUser from '@/views/PinUser'
// import PinAbout from '@/views/PinAbout'

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
    }, {
      path: '/me',
      name: 'PinUser',
      meta: {
        requireAuth: true
      },
      component: PinUser
    }, {
      path: 'about',
      name: 'PinAbout',
      component: PinAbout
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (!store.state.user) {
      store.dispatch(types.ISAUTH).then(isAuth => {
        if (isAuth) {
          next()
        } else {
          next({
            path: '/login',
            query: {redirect: to.fullPath}
          })
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
