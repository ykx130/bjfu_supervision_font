import axios from "Plugins/axios";

export const queryConsults = (params) => {
  return axios.get('/api/consults', {params:params})
};

export const getConsultById =(id)=> {
  return axios.get('/api/consults/'+ id)
};

export const putConsults = (params) => {
  return axios.put('/api/consults/'+params.id, params)
};

export const postConsults = (params) => {
  return axios.post('/api/consults', params)
};

export const queryConsultTypes = (params) => {
  return axios.get('/api/consult_types', {params:params})
};

export const getConsultTypes =(id)=> {
  return axios.get('/api/consult_types/'+ id)
};

export const deleteConsultTypes =(id)=> {
  return axios.delete('/api/consult_types/'+ id)
};

export const postConsultTypes = (params) => {
  return axios.post('/api/consult_types', params)
};

