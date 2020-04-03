import { takeEvery, put } from 'redux-saga/effects'
import { signIn, signUp } from '../api_client/user'
import jwt from 'jsonwebtoken'

function* watchUserLogin() {
  yield takeEvery('USER_LOGIN_REQUEST', userLogin)
}

function* userLogin(action) {
  try {
    const result = yield signIn(action.payload)
    if (result.data && result.data.errors) {
      yield put({
        type: 'USER_LOGIN_ERROR',
        payload: `${result.data.errors[0].param}  ${result.data.errors[0].msg}`
      })
    }
    if (result.data && result.data.message) {
      yield put({ type: 'USER_LOGIN_ERROR', payload: result.data.message })
    }

    const user = jwt.decode(result.data.token)
    if (user) {
      localStorage.setItem('token', result.data.token)
      yield put({ type: 'USER_LOGIN_SUCCESS', payload: result.data.user })
    }
  } catch(error) {
    yield put({ type: 'USER_LOGIN_ERROR', payload: error.response })
  }
}

function* watchUserSignUp() {
  yield takeEvery('USER_SIGN_UP_REQUEST', userSignUp)
}

function* userSignUp(action) {
  try {
    const result = yield signUp(action.payload)
    console.log('result: ', result)
    if (result.data && result.data.errors) {
      yield put({
        type: 'USER_SIGN_UP_ERROR',
        payload: `${result.data.errors[0].param}  ${result.data.errors[0].msg}`
      })
    } else {
      yield put({ type: 'USER_SIGN_UP_SUCCESS' })
    }
  } catch(error) {
    yield put({ type: 'USER_SIGN_UP_ERROR', payload: error.response })
  }
}

export const userSagas = [ watchUserLogin(), watchUserSignUp() ]