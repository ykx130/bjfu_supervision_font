import axios from "Plugins/axios";

export const getUserByName = (name) => {
  return axios.get('/api/users/'+name)
};

export const queryUsers = (params) => {
  return axios.get('/api/users', {params:params})
};

export const putUser = (params) => {
  return axios.put('/api/users/'+params.username, params)
};

export const postUser = (params) => {
  return axios.post('/api/users', params)
};


export const queryRoles = (params) => {
  return axios.get('/api/roles', {params:params})
};


export const queryGroups = (params) => {
  return axios.get('/api/groups', {params:params})
}
