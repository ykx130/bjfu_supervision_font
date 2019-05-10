import axios from 'Plugins/axios'

export const queryTemplates = (params) => {
  return axios.post('/data_report/templates', { _method: 'GET', _args: params })
}

export const deleteTemplate = (id) => {
  return axios.delete(`/data_report/templates/${id}`)
}

export const updateTemplate = (id, params) => {
  return axios.put(`/data_report/templates/${id}`, params)
}

export const getTemplate = (id) => {
  return axios.get(`/data_report/templates/${id}`)
}

export const createTemplate = (params) => {
  return axios.post('/data_report/templates', params)
}

export const getReport = (template_id, params) => {
  return axios.post('/data_report/render', { template_id: template_id, parameters: params })
}

export const getPDF = (params) => {
  return axios.post('/data_report/print', { parameters: params })
}
