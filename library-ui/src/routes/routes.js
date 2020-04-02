import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'

import { store } from '../store/store'

const PrivateRoute = ({ render: Component, ...rest }) => {
  const isLogin = store.getState().userReducer.isLogin
  const path = rest.location.pathname
  return <Route {...rest} render={(props) => (
    isLogin ?
      <Component {...props} /> :
      <Redirect to='/login' />
  )} />
}

const Routes = () => (
  <Switch>
    <Route path='/login' component={SignIn} />
    <Route path='/signup' component={SignUp} />
    <PrivateRoute path='/' component={Dashboard} />
  </Switch>
)

export default Routes