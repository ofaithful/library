import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert/Alert'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    grow: {
      flexGrow: 1,
    },
    fullwidth: {
      width: '100%'
    }
  },
}))

export const AddAuthor = ({ addAuthor, isLogin, addAuthorError, addAuthorDone }) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [firstname, setFirstname] = React.useState('')
  const [lastname, setLastname] = React.useState('')

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleAddAuthor = (event) => {
    event.preventDefault()
    addAuthor({firstname: firstname, lastname: lastname, date_of_birth: selectedDate })
  }

  if (!isLogin) return <Redirect to='/' />

  return (
    <Container>
      {
        addAuthorError ?
          <div className={classes.fullwidth}><Alert severity="error">{addAuthorError}</Alert></div> :
          null
      }
      {
        addAuthorDone ?
        <div className={classes.fullwidth}><Alert severity="success">Successfully added</Alert></div> :
        null
      }
      <Grid container className={classes.grow}>
        <Grid container item xs={6}>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField id='firstname' name='firstname' label='Name' onChange={(event) => setFirstname(event.target.value)}/>
            <TextField id='lastname' name='lastname' label='Surname' onChange={(event) => setLastname(event.target.value)}/>
          </form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="yyyy/mm/dd"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
            <Grid container item xs={12}>
              <Button
                variant='contained'
                color='primary'
                onClick={ (event) => handleAddAuthor(event) }>Add</Button>
            </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}