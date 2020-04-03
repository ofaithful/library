import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAuthorsAction } from '../actions/authors'
import {userLogoutAction} from "../actions/user";
import { addBookAction } from '../actions/books'
import TopBar from "../components/TopBar";
import { Redirect } from 'react-router-dom'
import AddBook from '../components/AddBook'

const mapStateToProps = (state) => ({
  authors: state.authorReducer.authors,
  isLogin: state.userReducer.isLogin,
  addBookError: state.booksReducer.addBookError,
  addBookDone: state.booksReducer.addBookDone,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAuthorsAction: () => {
      dispatch(fetchAuthorsAction());
  },
  addBookAction: (data) => {
    dispatch(addBookAction(data))
  },
  userLogoutAction: () => {
    dispatch(userLogoutAction())
  }
});

const AddBookPage = ({ fetchAuthorsAction, authors, isLogin, addBookAction, addBookError, addBookDone, userLogoutAction }) => {

  useEffect(() => {
    fetchAuthorsAction();
  }, []);

  if (!isLogin) return <Redirect to='/' />

  return (
    <>
      <TopBar userLogoutAction={userLogoutAction} title='Add Book' isAdmin={true} />
      <AddBook authorsProps={authors} addBookAction={addBookAction} addBookDone={addBookDone} addBookError={addBookError} />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);