import { takeEvery, put } from 'redux-saga/effects'
import { addAuthor, getAuthors } from '../api_client/author'

function* watchFetchAuthors() {
  yield takeEvery('FETCH_ALL_AUTHORS_REQUEST', genFetchAuthors)
}

function* genFetchAuthors(action) {
  try {
    const token = yield localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}`}
    const result = yield getAuthors(headers)
    yield put({ type: 'FETCH_ALL_AUTHORS_SUCCESS', payload: result.data.authors })
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

    if (result.data.errors) {
      yield put({ type: 'ADD_AUTHOR_ERROR', payload: result.data.errors[0].msg })
    } else if (result.data.message) {
      yield put({ type: 'ADD_AUTHOR_ERROR', payload: result.data.message })
    } else {
      yield put({ type: 'ADD_AUTHOR_SUCCESS', payload: result.data })
    }
  } catch (error) {
    yield put({ type: 'ADD_AUTHOR_ERROR', payload: error.response })
  }
}

export const authorSagas = [ watchAddAuthor(), watchFetchAuthors() ]