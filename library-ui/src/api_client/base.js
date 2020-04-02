import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const get = (path, headers) => {
  return axios({
    method: 'GET',
    url: BASE_URL + path,
    headers
  })
}

export const post = (path, data, headers) => {
  return axios({
    method: 'POST',
    url: BASE_URL + path,
    data,
    headers
  })
}

export const deleteRequest = (path, headers) => {
  return axios({
    method: 'DELETE',
    url: BASE_URL + path,
    headers
  })
}