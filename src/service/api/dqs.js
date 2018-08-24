import axios from "Plugins/axios";

export const queryFormMetas =(params)=> {
  return axios.get('/api/form_metas', {params: params})
};

export const getFormMeta = params =>{
  return axios.get('/api/form_metas/'+ params)
};

export const postFormMeta = (params) => {
  return axios.post('/api/form_metas', params)
}

export const deleteFormMetas =(params)=>{
  return axios.delete('/api/form_metas/' + params)
}

export const postForm= params =>{
  return axios.post('/api/forms',  params)
}

export const getForm = params =>{
  return axios.get('/api/forms/'+ params)
};

export const queryForms =(params)=> {
  return axios.get('/api/forms', {params: params})
};

export const putForm =(id,params)=> {
  return axios.put('/api/forms/'+ id, params)
}

/* 获得一个lesson的form_meta */
export const getLessons =(params)=> {
  return axios.get('/api/lessons', {params: params})
}
