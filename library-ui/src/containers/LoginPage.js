import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { userLogin } from '../actions/user'
import SignIn from '../components/SignIn'

const mapStateToProps = (state) => ({
  loginError: state.userReducer.loginError,
  isLogin: state.userReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userData) => {
      dispatch(userLogin(userData));
  },
});

const LoginPage = ({ userLogin, loginError, isLogin }) => {
  const handleLogin = (username, password) => {
    userLogin({ username: username, password: password });
  }
  if (isLogin) return <Redirect to='/' />
  return (
    <SignIn handleLogin={handleLogin} loginError={loginError} />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);