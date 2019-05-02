import {stringifyQuery, parseQuery} from 'Libs/tools'
import qs from 'qs'

export const ROUTER_DEFAULT_CONFIG = {
  waitForData: true,
  transitionOnLoad: true,
  parseQuery (str) {
    return parseQuery(str)
  },
  stringifyQuery (args) {
    var result = qs.stringify(args, {
      arrayFormat: 'repeat',
      allowDots: true,
      skipNulls: true
    })

    return result ? ('?' + result) : ''
  }
}

export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {},
  withCredentials: true, // 允许携带cookie
  paramsSerializer: stringifyQuery
}
