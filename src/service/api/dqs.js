import axios from 'axios'

export const getAllFormMetas =(params)=> {
  return axios.get('/api/form_metas', {params: params})
}

export const getFormMeta = params =>{
  return axios.get('/api/form_meta/'+ params)
}
