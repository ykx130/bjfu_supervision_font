import axios from "Plugins/axios";

export const queryConsults = (params) => {
  return axios.get('/api/consults', {params:params})
};

export const getConsults =(id)=> {
  return axios.get('/api/consults/'+ id)
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

