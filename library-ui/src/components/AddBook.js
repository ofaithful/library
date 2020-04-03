import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert/Alert'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    width: '100%'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const AddBook = ({ authorsProps, addBookAction, addBookError, addBookDone }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [title, setTitle] = React.useState('')
  const [authors, setAuthors] = React.useState([])
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleChange = (event) => {
    setAuthors(event.target.value)
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setAuthors(value)
  }

  const handleAddBook = (event) => {
    event.preventDefault()
    addBookAction({ title: title, published: selectedDate, authors: getAuthorsObj(authors)})
  }

  const getAuthorsObj = (authors) => {
    const selected = []
    for (let i = 0; i < authorsProps.length; i++) {
      for (let j = 0; j < authors.length; j++) {
        if (authorsProps[i].firstname === authors[j].split(' ')[0] &&
            authorsProps[i].lastname === authors[j].split(' ')[1]) {
          selected.push(authorsProps[i])
        }
      }
    }
    return selected
  }

  return (
    <Container>
      {
        addBookError ?
          <div className={classes.root}><Alert severity="error">{addBookError}</Alert></div> :
          null
      }
      {
        addBookDone ?
          <div className={classes.root}><Alert severity="success">Successfully added</Alert></div> :
          null
      }
      <Grid container justify='center'>
        <Grid item justify='stretch' xs={12}>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Choose authors</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={authors}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {authorsProps.map((author) => (
                  <MenuItem
                    key={author.author_id}
                    value={author.firstname + ' ' + author.lastname}>
                    {author.firstname} {author.lastname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <form className={classes.formControl} noValidate autoComplete='off'>
              <TextField id='title' name='title' label='Title' onChange={(event) => setTitle(event.target.value)} className={classes.formControl}/>
            </form>
            <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="yyyy/mm/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'Publish date',
                }}
              />
            </MuiPickersUtilsProvider>
            <Grid container item xs={12}>
              <Button
                variant='contained'
                color='primary'
                onClick={ (event) => handleAddBook(event) }>Add</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddBook