import axios from 'axios'

export const queryFormMetas =(params)=> {
  return axios.get('/api/form_metas', {params: params})
}

export const getFormMeta = params =>{
  return axios.get('/api/form_metas/'+ params)
}

export const postForm= params =>{
  return axios.post('/api/forms/',  params)
}

export const handleDeleteFormMetas =(params)=>{
  return axios.delete('/api/form_metas/' + params)
}

export const postFormMeta = (params) => {
  return axios.post('/api/form_meta', params)
}
