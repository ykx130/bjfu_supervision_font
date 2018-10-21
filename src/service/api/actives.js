/* 获得一个lesson的form_meta */
import axios from 'Plugins/axios'

export const queryActives = (params) => {
  return axios.get('/api/activities', {params: params})
}

export const queryCurrentuserActives = (params) => {
  return axios.get('/api/current_user/activities', {params: params})
}

export const getActive = (id) => {
  return axios.get('/api/activities/' + id)
}

export const putActive = (params) => {
  return axios.put('/api/activities/' + params.id, params)
}

export const postActive = (params) => {
  return axios.post('/api/activities', params)
}

export const queryActiveUsers = (id) => {
  return axios.get('/api/activities/' + id + '/activity_users')
}

export const getActiveUser = (active_id, username) => {
  return axios.get('/api/activities/' + active_id + '/activity_users/' + username)
}

export const postActiveUser = (active_id, params) => {
  return axios.post('/api/activities/' + active_id + '/activity_users', params)
}

export const putActiveUser = (active_id, params) => {
  return axios.put('/api/activities/' + active_id + '/activity_users/' + params.user.username, params)
}
