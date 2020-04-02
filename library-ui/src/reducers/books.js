const initialState = {
  availableBooks: [],
  borrowedBooks: []
}

export default function booksReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_AVAILABLE_BOOKS_REQUEST':
      return {
        ...state,
        availableBooks: []
      }
    case 'FETCH_AVAILABLE_BOOKS_SUCCESS':
      return {
        ...state,
        availableBooks: action.payload
      }
    case 'FETCH_AVAILABLE_BOOKS_ERROR':
      return {
        ...state
      }
    case 'ADD_BOOK_REQUEST':
      return {
        ...state
      }
    case 'ADD_BOOK_SUCCESS':
      let updatedBooksList = state.availableBooks.concat(action.payload)
      return {
        ...state,
        availableBooks: updatedBooksList
      }
    case 'ADD_BOOK_ERROR':
      return {
        ...state
      }
    case 'BORROW_BOOK_REQUEST':
      return {
        ...state
      }
    case 'BORROW_BOOK_SUCCESS':
      let addedBorrowedBooks = state.borrowedBooks.concat(action.payload)
      return {
        ...state,
        borrowedBooks: addedBorrowedBooks
      }
    case 'BORROW_BOOKS_ERROR':
      return {
        ...state
      }
    case 'RETURN_BOOK_REQUEST':
      return {
        ...state
      }
    case 'RETURN_BOOK_SUCCESS':
      let deletedBorrowedBooks = state.borrowedBooks.filter(item => item.id !== action.payload)
      return {
        ...state,
        borrowedBooks: deletedBorrowedBooks
      }
    case 'RETURN_BOOK_ERROR':
      return {
        ...state
      }
    case 'GET_BORROWED_BOOKS_REQUEST':
      return {
        ...state,
      }
    case 'GET_BORROWED_BOOKS_SUCCESS':
      return {
        ...state,
      }
    case 'GET_BORROWED_BOOKS_ERROR':
      return {
        ...state,
      }
    default:
      return state
  }
}