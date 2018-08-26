/* 获得一个lesson的form_meta */
import axios from "Plugins/axios";

export const queryActives =(params)=> {
  return axios.get('/api/activities', {params: params})
};

export const getActive =(id)=> {
  return axios.get('/api/activities/'+ id)
};

export const putActive = (params) => {
  return axios.put('/api/activities/'+ id, params)
};

export const postActive = (params) => {
  return axios.post('/api/activities', params)
};

export const getActiveUser =(id)=>{
  return axios.get('api/activities/'+id +'/activity_users')
};
