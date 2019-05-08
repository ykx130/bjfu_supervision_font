/* 获得一个lesson的form_meta */
import axios from 'Plugins/axios'

export const queryLessons = (params) => {
  return axios.get('/api/lessons', { params: params })
}

export const queryGroupLesson = (params) => {
  return axios.get('/api/lesson_records', { params: params })
}

export const getLesson = (id) => {
  return axios.get('/api/lessons/' + id)
}

export const getModelLesson = (id) => {
  return axios.get('/api/model_lessons/' + id)
}

export const getNoticeLesson = (id) => {
  return axios.get('/api/notice_lessons/' + id)
}

export const putLesson = (params) => {
  return axios.put('/api/lessons/' + params.lesson_id, params)
}

export const putModelLesson = (params) => {
  return axios.put('/api/model_lessons' + params.id, params)
}

export const putNoticeLesson = (params) => {
  return axios.put('/api/notice_lessons' + params.id, params)
}

export const postLesson = (params) => {
  return axios.post('/api/lessons', params)
}

export const queryNoticeLessons = (params) => {
  return axios.get('/api/notice_lessons', { params: params })
}

export const queryModelLessons = (params) => {
  return axios.get('/api/model_lessons', { params: params })
}

export const postModelLessonsVote = (params) => {
  return axios.post(`/api/model_lessons／${params.lesson_id}／vote`, {vote:true})
}

export const updateModelLessonsVote = (params) => {
  return axios.put(`/api/model_lessons／${params.id}／vote`, params)
}

export const uploadModelLessonApi = '/api/model_lessons/excel/import'

export const uploadNoticeLessonApi = '/api/notice_lessons/excel/import'

export const exportModelLessonExcel = (params) => {
  return axios.post(`/api/model_lessons/excel/export`, params)
}

export const exporNoticeLessonExcel = (params) => {
  return axios.post(`/api/notice_lessons/excel/export`, params)
}

export const exporModelLessonExcel = (params) => {
  return axios.post(`/api/model_lessons/excel/export`, params)
}

export const queryLessonTeacherName = (params) => {
  return axios.get('/api/teacher_names', { params: params })
}

export const queryLessonCase = (params) => {
  return axios.get('/api/lesson_cases', { params: params })
}
