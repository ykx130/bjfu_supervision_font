import axios from 'axios'

export const getAllFormMetas =(params)=> {
  return axios.get('/api/form_metas', {params: params})
}

/* 创建一个lesson的form_meta */
export const getLessonFormMeta =(params)=>{
  return axios.get('/api/lessons', {params: params})


export const getFormMeta = params =>{
  return axios.get('/api/form_metas/'+ params)
}

export const handleDeleteFormMetas =(params)=>{
  return axios.delete('/api/form_metas/' + params)

}
