import axios from 'axios'

export const getUserByName = (name) => {
  return axios.get('/api/users/'+name)
};

export const queryUsers = (params) => {
  return axios.get('/api/users', {params:params})
};

export const putUser = (params) => {
  return axios.put('/api/users/'+params.id, params)
};

export const postUser = () => {
  return axios.post('/api/users', params)
};


export const queryRoles = (params) => {
  return axios.get('/api/roles', {params:params})
};
