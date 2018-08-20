import store from 'Plugins/store'
import {currentUser} from '../../service/api/user'

export function routerBeforeEachFunc (to, from, next) {
    // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理
    if (to.path !== '/login') {
      currentUser().then((resp)=>{
        if (resp.status !== 200 ) {
          next({path: "/login"})
        } else {
          store.commit('SET_USER_INFO', resp.data.user);
          if (to.path === '/'){
            next({path: '/DashBordAdmin'})
          }
        }
        next()
      })
    }
}
