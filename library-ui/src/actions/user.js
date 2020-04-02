export const userLogin = (data) => {
  return {
    type: 'USER_LOGIN_REQUEST',
    payload: data
  }
}

export const userSignUpAction = (data) => {
  return {
    type: 'USER_SIGN_UP_REQUEST',
    payload: data
  }
}

export const userLogoutAction = () => {
  return {
    type: 'USER_LOGOUT'
  }
}

export const getUserInfoAction = () => {
  return {
    type: 'USER_INFO_REQUEST'
  }
}