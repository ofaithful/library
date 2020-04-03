import React from 'react'
import { fetchAuthorsAction, addAuthor } from '../actions/authors'
import { userLogoutAction } from '../actions/user'
import TopBar from '../components/TopBar'
import { connect } from 'react-redux'
import { AddAuthor } from '../components/AddAuthor'

const mapStateToProps = (state) => ({
  authors: state.authorReducer.authors,
  isLogin: state.userReducer.isLogin,
  addAuthorError: state.authorReducer.addAuthorError,
  addAuthorDone: state.authorReducer.addAuthorDone
});

const mapDispatchToProps = (dispatch) => ({
  fetchAuthorsAction: () => {
    dispatch(fetchAuthorsAction());
  },
  addAuthor: (data) => {
    dispatch(addAuthor(data))
  },
  userLogoutAction: () => {
    dispatch(userLogoutAction())
  }
});

const AddAuthorPage = ({ authors, isLogin, addAuthorDone, addAuthor, addAuthorError, userLogoutAction }) => {
  return (
    <>
      <TopBar userLogoutAction={userLogoutAction} title='Add Author' isAdmin={true}/>
      <AddAuthor addAuthor={addAuthor} isLogin={isLogin} addAuthorError={addAuthorError} addAuthorDone={addAuthorDone}/>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAuthorPage)