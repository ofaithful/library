import { get, post } from './base'

export function signUp(data, headers) {
  return post('/clients', data, headers)
}

export function signIn(data, headers) {
  return post('/login', data, headers)
}