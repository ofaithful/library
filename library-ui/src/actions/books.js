export const fetchAvailableBooks = () => {
  return {
    type: 'FETCH_AVAILABLE_BOOKS_REQUEST'
  }
}

export const addBookAction = (data) => {
  return {
    type: 'ADD_BOOK_REQUEST',
    payload: data
  }
}

export const getBorrowedBooks = (data) => {
  return {
    type: 'GET_BORROWED_BOOKS_REQUEST',
    payload: data
  }
}

export const borrowBookAction = (data) => {
  return {
    type: 'BORROW_BOOK_REQUEST',
    payload: id
  }
}

export const returnBookAction = (data) => {
  return {
    type: 'RETURN_BOOK_REQUEST',
    payload: data
  }
}