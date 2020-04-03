import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getBorrowedBooks, returnBookAction } from '../actions/books'
import { Redirect } from 'react-router-dom'
import { userLogoutAction } from '../actions/user'
import TopBar from '../components/TopBar'
import BooksList from '../components/BooksList'

const mapStateToProps = (state) => ({
  isLogin: state.userReducer.isLogin,
  isAdmin: state.userReducer.isAdmin,
  user: state.userReducer.user,
  borrowedBooks: state.booksReducer.borrowedBooks
})

const mapDispatchToProps = (dispatch) => ({
  getBorrowedBooks: (id) => {
    dispatch(getBorrowedBooks(id))
  },
  userLogoutAction: () => {
    dispatch(userLogoutAction())
  },
  returnBookAction: (data) => {
    dispatch(returnBookAction(data))
  }
})

const BorrowingsPage = ({ getBorrowedBooks, isLogin, user, userLogoutAction, borrowedBooks, returnBookAction, isAdmin }) => {
  useEffect(() => {
    if (isLogin) {
      getBorrowedBooks(user.client_id)
    }
  }, [])

  if (!isLogin) return <Redirect to='/login' />

  return (
    <>
      <TopBar userLogoutAction={userLogoutAction} title='Borrowed Books' isAdmin={isAdmin}/>
      <BooksList
        user={user}
        books={borrowedBooks}
        returnBookAction={returnBookAction}
      />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingsPage)