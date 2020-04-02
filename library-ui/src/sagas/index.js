import { all } from 'redux-saga/effects'
import { authorSagas } from './author'
import { userSagas } from './user'
import { bookSagas } from './books'

export default function* rootSaga() {
  yield all([ ...authorSagas, ...userSagas, ...bookSagas])
}
