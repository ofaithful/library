import { get, post, deleteRequest } from './base'

export function addBook(data, headers) {
  return post('/books', data, headers)
}

export function borrowBook(data, headers) {
  return post('/borrowings', data, headers)
}

export function getBorrowedBooks(id, headers) {
  return get(`/borrowings/${id}`, headers)
}

export function returnBook(data, headers) {
  return deleteRequest(`/borrowings`, data, headers)
}

export function getAvailableBooks(headers) {
  return get('/books', headers)
}