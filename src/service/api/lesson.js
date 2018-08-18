/* 获得一个lesson的form_meta */
import axios from "axios/index";

export const queryLessons =(params)=> {
  return axios.get('/api/lessons', {params: params})
};

export const getLesson =(id)=> {
  return axios.get('/api/lessons/'+ id)
};

export const putLesson = (params) => {
  return axios.put('/api/lessons/'+ id, params)
};

export const postLesson = (params) => {
  return axios.post('/api/lessons', params)
};
