export const addAuthor = (data) => {
  return {
    type: 'ADD_AUTHOR_REQUEST',
    payload: data
  }
}

export const fetchAuthorsAction = () => {
  return {
    type: 'FETCH_ALL_AUTHORS_REQUEST'
  }
}