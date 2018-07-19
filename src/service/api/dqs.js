import axios from 'axios'

export const getAllFormMetas =(params)=>{
  return axios.get('/api/form_metas', {params: params})
}
