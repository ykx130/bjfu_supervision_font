import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {currentUser} from '../service/api/user'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
import {ROUTER_DEFAULT_CONFIG} from '@/config/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
  ...ROUTER_DEFAULT_CONFIG
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // const token = getToken()
  if (to.name !== LOGIN_PAGE_NAME) {

    currentUser().then((resp) => {
      store.commit('setUserInfo', resp.data.current_user)
      if (to.path === '/') {
        if (resp.data.current_user.is_guider) {
          next({name: '督导端'})
        }
        next({name: 'home'})
      }
      next()
    }).catch(() => {
      next({path: '/login'})
    })
  } else {
    if (to.path === '/') {
      next({path: '/home'})
    }
    next()
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
