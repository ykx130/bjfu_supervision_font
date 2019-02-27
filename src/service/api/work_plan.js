import axios from 'Plugins/axios'

export const queryWorkPlan = (params) => {
  return axios.get('/api/work_;ands', { params: params })
}

export const getWorkPlan = (id) => {
  return axios.get('/api/work_;ands/' + id)
}

export const deleteWorkPlan = (id) => {
  return axios.delete('/api/work_;ands/' + id)
}

export const postWorkPlan = (params) => {
  return axios.post('/api/work_;ands', params)
}
