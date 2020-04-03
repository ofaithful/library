const initialState = {
  availableBooks: [],
  borrowedBooks: [],
  borrowings: [],
  borrowError: null,
  addBookDone: false,
  addBookError: null
}

export default function booksReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_AVAILABLE_BOOKS_REQUEST':
      return {
        ...state,
        availableBooks: [],
        borrowError: null
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
        ...state,
        borrowError: null,
        addBookDone: false,
        addBookError: null
      }
    case 'ADD_BOOK_SUCCESS':
      let updatedBooksList = state.availableBooks.concat(action.payload)
      return {
        ...state,
        availableBooks: updatedBooksList,
        addBookDone: true
      }
    case 'ADD_BOOK_ERROR':
      return {
        ...state,
        addBookDone: false,
        addBookError: action.payload
      }
    case 'BORROW_BOOK_REQUEST':
      return {
        ...state,
        borrowError: null
      }
    case 'BORROW_BOOK_SUCCESS':
      const addedBorrowings = state.borrowings.concat(action.payload)
      const updatedAvailableBooks = state.availableBooks.filter(item => item.book_id !== action.payload.book_id)
      return {
        ...state,
        borrowings: addedBorrowings,
        borrowError: null,
        availableBooks: updatedAvailableBooks
      }
    case 'BORROW_BOOK_ERROR':
      return {
        ...state,
        borrowError: action.payload,
      }
    case 'RETURN_BOOK_REQUEST':
      return {
        ...state,
        borrowError: null
      }
    case 'RETURN_BOOK_SUCCESS':
      const deletedBorrowedBooks = state.borrowedBooks.filter(item => item.book_id !== action.payload)
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
        borrowedBooks: action.payload,
      }
    case 'GET_BORROWED_BOOKS_ERROR':
      return {
        ...state,
      }
    default:
      return state
  }
}