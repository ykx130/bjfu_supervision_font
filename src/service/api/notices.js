import axios from "Plugins/axios";

export const getNoticesNum =()=> {
  return axios.get('/api/notices')
};

export const getLatestNotices =()=> {
  return axios.get('/api/notices/newest')
};
