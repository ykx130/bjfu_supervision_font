import axios from 'axios'

export const getUserByName = (name) => {
  return axios.get('/api/users/'+name)
};

export const queryUsers = (parmas) => {
  return axios.get('/api/users', {params:parmas})
};

export const putUser = (params) => {
  return axios.put('/api/users/'+params.id, params)
};

export const postUser = () => {
  return axios.post('/api/users', params)
};
