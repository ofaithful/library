import { takeEvery, put } from 'redux-saga/effects'
import { addAuthor, getAuthors } from '../api_client/author'

function* watchFetchAuthors() {
  yield takeEvery('FETCH_ALL_AUTHORS_REQUEST', genFetchAuthors)
}

function* genFetchAuthors(action) {
  try {
    const result = yield getAuthors(action.payload)
    yield put({ type: 'FETCH_ALL_AUTHORS_SUCCESS', payload: result.data })
  } catch (error) {
    yield put({ type: 'FETCH_ALL_AUTHORS_ERROR', payload: error.response })
  }
}

function* watchAddAuthor() {
  yield takeEvery('ADD_AUTHOR_REQUEST', genAddAuthor)
}

function* genAddAuthor(action) {
  try {
    const token = yield localStorage.getItem('token')

    const headers = { Authorization: `Bearer ${token}`}
    const result = yield addAuthor(action.payload, headers)
    yield put({ type: 'ADD_AUTHOR_SUCCESS', payload: result.data })
  } catch (error) {
    yield put({ type: 'ADD_AUTHOR_ERROR', payload: error.response })
  }
}

export const authorSagas = [ watchAddAuthor(), watchFetchAuthors() ]