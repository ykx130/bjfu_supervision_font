/* 获得一个lesson的form_meta */
import axios from 'Plugins/axios'

export const queryLessons = (params) => {
  return axios.get('/api/lessons', {params: params})
}

export const queryGroupLesson = (params) => {
  return axios.get('/api/lesson_records', {params: params})
}

export const getLesson = (id) => {
  return axios.get('/api/lessons/' + id)
}

export const putLesson = (params) => {
  return axios.put('/api/lessons/' + id, params)
}

export const postLesson = (params) => {
  return axios.post('/api/lessons', params)
}

export const queryNoticeLessons = (params) => {
  return axios.get('/api/notice_lessons',{params:params} )
}

export const queryModelLessons = (params) => {
  return axios.get('/api/model_lessons', {params:params})
}
