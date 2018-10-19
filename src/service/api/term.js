import axios from 'Plugins/axios'

export const queryTerms = (params) => {
  return axios.get('/api/terms', {params: params})
}

export const getCurrentTerms = () => {
  return axios.get('/api/terms/current')
}
