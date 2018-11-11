import axios from 'Plugins/axios'

export const queryPagedata = () => {
  return axios.get('api/page_data')
}
