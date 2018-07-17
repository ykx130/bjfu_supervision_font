import axios from 'axios'

export const getFormMeta = params =>{
  return axios.get('/api/form_meta/'+ params)
}
