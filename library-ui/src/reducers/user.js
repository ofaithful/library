const initialState = {
  isLogin: false,
  signUpDone: false,
  user: {},
  loginError: null,
  signUpError: null,
  isLoading: true,
  isAdmin: false
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        user: action.payload,
        signUpDone: false,
        loginError: false,
        isAdmin: false
      }
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        signUpDone: false,
        isLoading: false,
        loginError: null,
        isAdmin: action.payload.role === 'admin'
      }
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        loginError: action.payload,
        isLoading: false,
        isAdmin: false,
      }
    case 'USER_SIGN_UP_REQUEST':
      return {
        ...state,
        signUpDone: false,
        isAdmin: false
      }
    case 'USER_SIGN_UP_SUCCESS':
      return {
        ...state,
        signUpDone: true,
        signUpError: null,
        loginError: null
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
        isLoading: false,
        isAdmin: false
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