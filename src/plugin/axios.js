import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from 'Config/config'
import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from '../config/interceptors/axios'
import store from '@/store'

let axiosInstance = {}
axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance
  .interceptors.request.use((requestObj) => {
    console.log(store.state.user)
    if (store.state.user && store.state.user.access.length) {
      requestObj.headers['CurrentRole'] = store.state.user.access[0]
    }
    // debugger
    return requestObj
  }, requestFailFunc)
// 注入失败拦截
axiosInstance
  .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
