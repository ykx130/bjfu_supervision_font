import { loginUser, logoutUser, currentUser } from '@/service/api/user'
import { setToken, getToken } from '@/libs/util'
export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540923904688&di=94081d4d1750f77b411fef5b3288b48c&imgtype=0&src=http%3A%2F%2Fimg.liexue.cn%2Fuploadfile%2F2015%2F0129%2F20150129031441717.jpg',
    token: getToken(),
    access: [],
    hasGetInfo: false,
    userInfo: {},
    guiderInfo: {},
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setUserInfo (state, resData) {
      state.userInfo = resData
      state.userId = resData.id
      state.userName = resData.username
    },
    setCurrentAccess(state,status){
      state.access=[status]
    },
    judgeSuperAccess(state,resData){
      let arr= ['管理员', '大组长', '学院领导', '小组长', '督导', '教师']
      for(let i=0;i<5;i++){
        if(resData.role_names.indexOf(arr[i])>-1){
          state.access=[arr[i]]
          if(state.access.indexOf())
          break
        }
        else {
          state.access=[]
        }
      }
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password, code, uuid }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        loginUser({
          username: userName,
          password: password,
          'code': code,
          'uuid': uuid
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logoutUser(state.token).then(() => {
          commit('setAccess', [])
          commit('setUserInfo', { role_names: [], id: 0, userName: '' })
          commit('judgeSuperAccess', { role_names: [], id: 0, userName: '' })
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
          currentUser().then(res => {
            const data = res.data
            commit('setUserInfo', data.current_user)
            commit('judgeSuperAccess', data.current_user)
            resolve(data)
          }).catch(err => {

            reject(err)
          })
      })
    }
  },
  getters: {
    access: state => {
      return state.access
    },
    userInfo: state => {
      return state.userInfo
    },
    current_rolename: state => {
      if(state.access.length===0){
        return ''
      }
      else{
        return state.access[0]
      }

    }
  }
}
