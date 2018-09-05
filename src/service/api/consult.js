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

export const postconsults = (params) => {
  return axios.post('/api/consults', params)
};

export const queryConsult_types = (params) => {
  return axios.get('/api/cosult_types', {params:params})
};

export const getConsult_types =(id)=> {
  return axios.get('/api/cosult_types/'+ id)
};

export const postConsult_types = (params) => {
  return axios.post('/api/cosult_types', params)
};

