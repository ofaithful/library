import { combineReducers } from 'redux'
import booksReducer from './books'
import authorReducer from './author'
import userReducer from './user'

export default combineReducers({
  userReducer,
  authorReducer,
  booksReducer
})