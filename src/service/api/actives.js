/* 获得一个lesson的form_meta */
import axios from 'Plugins/axios'

export const queryActives = (params) => {
  return axios.get('/api/activities', { params: params })
}

export const queryCurrentuserActives = (params) => {
  return axios.get('/api/current_user/activities', { params: params })
}

export const getActive = (id) => {
  return axios.get('/api/activities/' + id)
}

// updataActivity
export const putActive = (params) => {
  let id = params.id
  params.id = undefined
  return axios.put('/api/activities/' + id, params)
}

export const postActive = (params) => {
  return axios.post('/api/activities', params)
}

export const deleteActive = (id) => {
  return axios.delete('/api/activities/' + id)
}
export const queryActiveUsers = (id) => {
  return axios.get('/api/activities/' + id + '/activity_users')
}

export const getActiveUser = (active_id, username) => {
  return axios.get('/api/activities/' + active_id + '/activity_users/' + username)
}

export const postActiveUser = (active_id, params) => {
  return axios.post('/api/activities/' + active_id + '/activity_users', params)
}

export const postCurrentActiveUser = (active_id) => {
  return axios.post('/api/activities/' + active_id + '/activity_users', {
    state: '已报名',
    fin_state: '未参加',
    activity_type: '培训'// 新增，报名
  })
}

// updataActiveUser
export const putActiveUser = (active_id, params) => {
  return axios.put('/api/activities/' + active_id + '/activity_users/' + params.user.username, params)
}

export const deleteActiveUser = (params) => {
  return axios.delete('/api/activities/activity_users', { params: params })
}
// 批量导入活动
export const uploadActivitiesApi = '/api/acyivities/excel/import'

export const queryActivityUsers = (params) => {
  return axios.get('/api/activities/activity_users', { params: params })
}
// 批量导入用户活动记录
export const uploadActivityUsersApi = '/api/activities/activity_users_excel/import'

// 上传研修计划附件
export const uploadPlanApi = '/api/activities/plan_file/upload'
// 获取所有文件
export const queryFiles = (params) => {
  return axios.get('/api/activities/query_files', { params: params })
}

// 下载文件
export const downloadPlanFiles = (filename) => {
  return axios.post('/api/activities/planfile/export/' + filename)
}

// 交流
export const postExchange = (params) => {
  return axios.post('/api/exchange', params)
}

export const queryExchange = (params) => {
  return axios.get('/api/exchange', { params: params })
}

export const deleteExchange = (id) => {
  return axios.delete('/api/exchange/' + id)
}
export const putExchange = (params) => {
  let id = params.id
  params.id = undefined
  return axios.put('/api/exchange/' + id, params)
}

// 比赛
export const postCompetition = (params) => {
  return axios.post('/api/competition', params)
}

export const queryCompetition = (params) => {
  return axios.get('/api/competition', { params: params })
}

export const deleteCompetition = (id) => {
  return axios.delete('/api/competition/' + id)
}
// 研究
export const postResearch = (params) => {
  return axios.post('/api/research', params)
}

export const queryResearch = (params) => {
  return axios.get('/api/research', { params: params })
}
export const deleteResearch = (id) => {
  return axios.delete('/api/research/' + id)
}
export const putResearch = (params) => {
  let id = params.id
  params.id = undefined
  return axios.put('/api/research/' + id, params)
}

// 项目
export const postProject = (params) => {
  return axios.post('/api/project', params)
}

export const queryProject = (params) => {
  return axios.get('/api/project', { params: params })
}
export const deleteProject = (id) => {
  return axios.delete('/api/project/' + id)
}
export const putProject = (params) => {
  let id = params.id
  params.id = undefined
  return axios.put('/api/project/' + id, params)
}

// 研修计划
export const queryActivityPlan = (params) => {
  return axios.get('/api/activities/activity_plans', { params: params })
}
export const updateActivityPlan = (id, params) => {
  return axios.put('/api/activities_plan/' + id, params)
}

// 获取所有用户所得学分
export const queryUsersScore = (params) => {
  return axios.get('/api/activities/users_score', { params: params })
}

export const queryUserPlan = (username) => {
  return axios.get('/api/activities/user_plan/' + username)
}
// 上传图片
export const uploadPictureApi = '/api/activities/pic_file/upload'

export const uploadCompetitionUserApi = '/api/activities/competition_users_excel/import'
// 导出报名名单
export const exportRegisteredUsersExcel = (params) => {
  return axios.post('/api/activities/activity_users_excel/export', params)
}

//上传活动详情附件
export const uploadFileApi = '/api/activities/file/upload'

//增删改  培训模块
export const getActivityModule = (id) => {
  return axios.get('/api/activity_module/' + id)
}

export const queryActivityModules = (params) => {
  return axios.get('/api/activity_modules', params)
}
export const insertActivityModule = (params) => {
  return axios.post('/api/insert_activity_module', params)
}
export const putActivityModule = (id, params) => {
  return axios.put('/api/update_activity_module/' + id, params)
}
export const deleteActivityModule = (id) => {
  return axios.delete('/api/delete_activity_module/' + id)
}
