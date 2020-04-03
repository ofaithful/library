import { takeEvery, put } from 'redux-saga/effects'
import { addBook, borrowBook, getBorrowedBooks, returnBook, getAvailableBooks } from '../api_client/books'

function* watchAddBook() {
  yield takeEvery('ADD_BOOK_REQUEST', addBookWorker)
}

function* addBookWorker(action) {
  try {
    const token = yield localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}`}
    const result = yield addBook(action.payload, headers)
    if (result.data.message) {
      yield put({ type: 'ADD_BOOK_ERROR', payload: result.data.message })
    } else {
      yield put({ type: 'ADD_BOOK_SUCCESS', payload: result })
    }
  } catch (error) {
    yield put({ type: 'ADD_BOOK_ERROR', payload: error })
  }
}

function* watchBorrowBook() {
  yield takeEvery('BORROW_BOOK_REQUEST', borrowBookWorker)
}

function* borrowBookWorker(action) {
  try {
    const token = yield localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const result = yield borrowBook(action.payload, headers)
    if (result.data.borrowDetails && result.data.borrowDetails.message) {
      yield put({ type: 'BORROW_BOOK_ERROR', payload: result.data.borrowDetails.message })
    } else {
      yield put({ type: 'BORROW_BOOK_SUCCESS', payload: result.data.borrowDetails })
    }
  } catch (error) {
    yield put({ type: 'BORROW_BOOK_SUCCESS', payload: error })
  }
}

function* watchGetBorrowedBooks() {
  yield takeEvery('GET_BORROWED_BOOKS_REQUEST', getBorrowedBooksWorker)
}

function* getBorrowedBooksWorker(action) {
  try {
    const token = yield localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}`}
    const result = yield getBorrowedBooks(action.payload, headers)
    yield put({ type: 'GET_BORROWED_BOOKS_SUCCESS', payload: result.data.borrowedBooks })
  } catch (error) {
    yield put({ type: 'GET_BORROWED_BOOKS_ERROR', payload: error })
  }
}

function* watchReturnBook() {
  yield takeEvery('RETURN_BOOK_REQUEST', returnBookWorker)
}

function* returnBookWorker(action) {
  try {
    const token = yield localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}`}
    const result = yield returnBook(action.payload, headers)
    yield put({ type: 'RETURN_BOOK_SUCCESS', payload: result.data.updatedBookStock.book_id })
  } catch (error) {
    yield put({ type: 'RETURN_BOOK_ERROR', payload: error })
  }
}

function* watchGetAvailableBooks() {
  yield takeEvery('FETCH_AVAILABLE_BOOKS_REQUEST', getAvailableBooksWorker)
}

function* getAvailableBooksWorker(action) {
  try {
    const token = yield localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}`}
    const result = yield getAvailableBooks(headers)
    yield put({ type: 'FETCH_AVAILABLE_BOOKS_SUCCESS', payload: result.data.books })
  } catch (error) {
    yield put({ type: 'FETCH_AVAILABLE_BOOKS_ERROR', payload: error })
  }
}

export const bookSagas = [
  watchAddBook(),
  watchBorrowBook(),
  watchGetBorrowedBooks(),
  watchReturnBook(),
  watchGetAvailableBooks()
]