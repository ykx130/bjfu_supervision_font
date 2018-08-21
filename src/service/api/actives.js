/* 获得一个lesson的form_meta */
import axios from "Plugins/axios";

export const queryActives =(params)=> {
  return axios.get('/api/actives', {params: params})
};

export const getActive =(id)=> {
  return axios.get('/api/actives/'+ id)
};

export const putActive = (params) => {
  return axios.put('/api/actives/'+ id, params)
};

export const postActive = (params) => {
  return axios.post('/api/actives', params)
};
