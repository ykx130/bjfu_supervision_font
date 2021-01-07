import axios from 'axios'
import {AXIOS_DEFAULT_CONFIG} from 'Config/config'
import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from '../config/interceptors/axios'
import store from '@/store'

let axiosInstance = {}
axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)
const RoleMap = {"管理员": 'admin',
  "小组长": "grouper",
  "大组长": "main_grouper",
  "学院领导": "leader",
  "督导":"guider",
  "教师": "teacher",
  "校级管理员":"reader",
  "教发管理员":"develop"
}
// 注入请求拦截
axiosInstance
  .interceptors.request.use((requestObj) => {
  if (store.state.user && store.state.user.access.length) {
    requestObj.headers.common['CurrentRole'] = RoleMap[store.state.user.access[0]]
  }
  return requestObj
}, requestFailFunc)
// 注入失败拦截
axiosInstance
  .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
