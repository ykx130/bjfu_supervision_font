import axios from 'Plugins/axios'

export const queryTemplates = (params) => {
  return axios.post('http://localhost:5000/templates', { _method: 'GET', _args: params })
}

export const deleteTemplate = (id) => {
  return axios.delete(`http://localhost:5000/templates/${id}`)
}

export const updateTemplate = (id, params) => {
  return axios.put(`http://localhost:5000/templates/${id}`, params)
}

export const getTemplate = (id) => {
  return axios.get(`http://localhost:5000/templates/${id}`)
}

export const createTemplate = (params) => {
  return axios.post('http://localhost:5000/templates', params)
}

export const getReport = (template_id, params) => {
  return axios.post('http://localhost:5000/render', { template_id: template_id, parameters: params })
}
