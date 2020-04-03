import React from 'react'
import { connect } from 'react-redux'

import { userSignUpAction } from '../actions/user'
import SignUp from '../components/SignUp'

const mapStateToProps = (state) => ({
  signUpError: state.userReducer.signUpError,
  signUpDone: state.userReducer.signUpDone
})

const mapDispatchToProps = (dispatch) => ({
  userSignUp: (data) => {
    dispatch(userSignUpAction(data))
  }
})

const SignUpPage = ({ signUpError, signUpDone, userSignUp}) => {
  const handleSignUp = (name, username, password, photo) => {
    userSignUp({ name, username, password, photo })
  }
  return (
    <SignUp handleSignUp={handleSignUp} signupError={signUpError} signupDone={signUpDone} />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)