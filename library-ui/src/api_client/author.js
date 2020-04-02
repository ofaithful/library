import { get, post } from './base'

export function addAuthor(data, headers) {
  return post('/authors', data, headers)
}

export function getAuthors(headers) {
  return get('/authors', headers)
}