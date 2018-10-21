import axios from 'Plugins/axios'

export const postEvents = (params) => {
  return axios.post('/api/events', params)
}
