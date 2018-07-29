import axios from 'axios'

export const getAllFormMetas =(params)=>{
  return axios.get('/api/form_metas', {params: params})
}
/* 创建一个lesson的form_meta */
export const getLessonFormMeta =(params)=>{
  return axios.get('/api/lessons', {params: params})
}
