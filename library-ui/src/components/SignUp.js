import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { uploadPhoto } from '../api_client/user'
import { Redirect } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert/Alert'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const SignUp = ({ handleSignUp, signupError, signupDone }) => {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState({})

  useEffect(() => {}, [name, username, password, photo, signupDone])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (photo.name) {
      const formData = new FormData()
      formData.append('image', photo)
      try {
        const photoURL = await uploadPhoto(formData)
        handleSignUp(name, username, password, photoURL.data.filename)
      } catch (error) {
        console.log(error)
      }
    } else {
      handleSignUp(name, username, password)
    }

  }

  if (signupDone) return <Redirect to='/login' />

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        { signupError ?
          <div className={classes.root}><Alert severity="error">{signupError}</Alert></div> :
          null
        }
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} container justify='center'>
              <Button
                variant="contained"
                component="label"
                color='secondary'
              >
                Select photo
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => setPhoto(event.target.files[0])}
                />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp