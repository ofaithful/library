import { get, post, deleteRequest } from './base'

export function addBook(data, headers) {
  return post('/books', data, headers)
}

export function borrowBook(headers) {
  return post('/borrowings', headers)
}

export function getBorrowedBooks(id, headers) {
  return get(`/borrowings/${id}`, headers)
}

export function returnBook(id, headers) {
  return deleteRequest(`/borrowings/${id}`, headers)
}