import React, { useEffect } from 'react'
import TopBar from '../components/TopBar'
import BooksList from '../components/BooksList'
import { connect } from 'react-redux'
import { borrowBookAction } from '../actions/books'
import { userLogoutAction } from '../actions/user'
import { Redirect } from 'react-router-dom'
import { fetchAvailableBooks } from '../actions/books'

const mapStateToProps = (state) => ({
  availableBooks: state.booksReducer.availableBooks,
  isLogin: state.userReducer.isLogin,
  isAdmin: state.userReducer.isAdmin,
  user: state.userReducer.user,
  borrowError: state.booksReducer.borrowError
});

const mapDispatchToProps = (dispatch) => ({
  fetchAvailableBooks: () => {
    dispatch(fetchAvailableBooks())
  },
  borrowBookAction: (bookId) => {
      dispatch(borrowBookAction(bookId));
  },
  userLogoutAction: () => {
    dispatch(userLogoutAction())
  }
});

const BooksPage = ({
    availableBooks,
    borrowBookAction,
    userLogoutAction,
    isLogin,
    fetchAvailableBooks,
    user,
    borrowError,
    isAdmin
  }) => {

  useEffect(() => {
    if (isLogin) {
      fetchAvailableBooks()
    }
  }, [])

  if (!isLogin) return <Redirect to='/login' />

  return (
    <>
      <TopBar userLogoutAction={userLogoutAction} title='Available Books' isAdmin={isAdmin}/>
      <BooksList
        books={availableBooks}
        borrowBookAction={borrowBookAction}
        user={user}
        borrowError={borrowError}
      />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);