const initialState = {
  authors: [],
  addAuthorError: null,
  isLoading: true
}

export default function authorReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ALL_AUTHORS_REQUEST':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_ALL_AUTHORS_SUCCESS':
      return {
        ...state,
        authors: action.payload,
        isLoading: false
      }
    case 'FETCH_ALL_AUTHORS_ERROR':
      return {
        ...state
      }
    case 'ADD_AUTHOR_REQUEST':
      return {
        ...state,
      }
    case 'ADD_AUTHOR_SUCCESS':
      const updatedAuthors = state.authors.concat(action.payload)
      return {
        ...state,
        isLoading: false,
        authors: updatedAuthors
      }
    case 'ADD_AUTHOR_ERROR':
      return {
        ...state,
        isLoading: false,
        addAuthorError: action.payload
      }
    default:
      return state
  }
}