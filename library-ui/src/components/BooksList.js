import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert/Alert'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  mb: {
    marginBottom: '20px'
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}))

const BooksList = ({ books, borrowBookAction, user, borrowError, returnBookAction}) => {
  const classes = useStyles()
  const ctaButton = borrowBookAction ? borrowBookAction : returnBookAction
  const ctaText = borrowBookAction ? 'Take' : 'Return'

  return (
    <Container>
      {
        borrowError ?
          <div className={classes.root}><Alert severity="error">{borrowError}</Alert></div> :
          null
      }
      <Grid container justify='flex-start' className={classes.grow}>
          {books.map((item) => (
            <Grid item xs={6} className={classes.mb} key={item.book_id}>
              <ListItem key={item.book_id} button>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <Grid>
                  Published: {new Date(item.published).toLocaleDateString()}
                </Grid>
              </ListItem>
              <Grid container>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => ctaButton({ book_id: item.book_id, client_id: user.client_id })}
                >
                  { ctaText }
                </Button>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default BooksList