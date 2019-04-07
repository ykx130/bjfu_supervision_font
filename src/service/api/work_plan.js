import axios from 'Plugins/axios'

export const queryWorkPlan = (params) => {
  return axios.get('/api/work_plans', { params: params })
}

export const getWorkPlan = (id) => {
  return axios.get(`/api/work_plans/${id}`)
}

export const deleteWorkPlan = (id) => {
  return axios.delete(`/api/work_plans/${id}`)
}

export const postWorkPlan = (params) => {
  params.form_meta_version = 'default'
  return axios.post('/api/work_plans', params)
}

export const putWorkPlan = (id, params) => {
  return axios.put(`/api/work_plans/${id}`, params)
}

export const queryWorkPlanDetail = (term) => {
  return axios.get(`/api/work_plan/details/${term}`)
}
