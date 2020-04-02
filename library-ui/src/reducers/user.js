const initialState = {
  isLogin: false,
  signUpDone: false,
  user: {},
  loginError: null,
  signupError: null,
  isLoading: true
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        user: action.payload
      }
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        signUpDone: false,
        loginError: null
      }
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        loginError: action.payload
      }
    case 'USER_SIGN_UP_REQUEST':
      return {
        ...state,
        signUpDone: false
      }
    case 'USER_SIGN_UP_SUCCESS':
      return {
        ...state,
        signUpDone: true,
        signupError: null
      }
    case 'USER_SIGN_UP_ERROR':
      return {
        ...state,
        signUpDone: false,
        signUpError: action.payload
      }
    case 'USER_LOGOUT':
      localStorage.removeItem('token')
      return {
        ...state,
        isLogin: false,
        user: {},
        isLoading: false
      }
    case 'ERROR_CLEAR':
      return {
        ...state,
        signUpError: null,
        loginError: null
      }
    default:
      return state
  }
}