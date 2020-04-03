import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import BooksPage from '../containers/BooksPage'
import BorrowingsPage from '../containers/BorrowingsPage'
import LoginPage from '../containers/LoginPage'
import SignUpPage from '../containers/SingUpPage'
import AddBookPage from '../containers/AddBookPage'
import AddAuthorPage from '../containers/AddAuthorPage'

import { store } from '../store/store'

const PrivateRoute = ({ render: Component, ...rest }) => {
  const isLogin = store.getState().userReducer.isLogin
  return <Route {...rest} render={(props) => (
    isLogin ?
      <Component {...props} /> :
      <Redirect to='/login' />
  )} />
}

const AdminRoute = ({ render: Component, ...rest }) => {
  const isLogin = store.getState().userReducer.isLogin
  const isAdmin = store.getState().userReducer.isAdmin
  return <Route {...rest} render={(props) => (
    isLogin && isAdmin ?
      <Component {...props} /> :
      <Redirect to='/' />
  )} />
}

const Routes = () => (
  <Switch>
    <Route path='/login' component={LoginPage} />
    <Route path='/signup' component={SignUpPage} />
    <PrivateRoute exact path='/' component={BooksPage} />
    <PrivateRoute exact path='/borrowings' component={BorrowingsPage} />
    <AdminRoute exact path='/add-book' component={AddBookPage} />
    <AdminRoute exact path='/add-author' component={AddAuthorPage} />
  </Switch>
)

export default Routes