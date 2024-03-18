import React from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import { Grid, Link, Button } from '@mui/material'
import Alert from '@mui/material/Alert'
import loadingImage from '../../assets/Loading.gif'

export const FailAlert = (props) => {
  return props.alertFail ? (
    <Alert sx={{ marginTop: 2 }} severity='error'>
      {props.alertContent}
    </Alert>
  ) : (
    <></>
  )
}

export const WarningAlert = (props) => {
  return props.alertWarning ? (
    <Alert sx={{ marginTop: 2 }} severity='warning'>
      {props.alertContent}
    </Alert>
  ) : (
    <></>
  )
}

export const SuccessAlert = (props) => {
  return props.alertSuccess ? (
    <Alert sx={{ marginTop: 2 }} severity='success'>
      {props.alertContent}
    </Alert>
  ) : (
    <></>
  )
}

// Login functions
const SubmitContentLogin = (props) => {
  return (
    <React.Fragment>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        fontFamily='Montserrat'
        sx={{ mt: 3, mb: 2 }}
      >
        Log in
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link
            onClick={props.handleNewUser}
            variant='body2'
            style={{ cursor: 'pointer' }}
          >
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export const LoadingIndicatorLogin = (props) => {
  const { promiseInProgress } = usePromiseTracker()

  return promiseInProgress ? (
    <img
      src={loadingImage}
      style={{ position: 'center', height: '100px', width: '133px' }}
      alt=''
    />
  ) : (
    !props.registered && (
      <SubmitContentLogin handleNewUser={props.handleNewUser} />
    )
  )
}

// Signup functions
const SubmitContentSignup = (props) => {
  return (
    <React.Fragment>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        fontFamily='Montserrat'
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link
            onClick={props.handleExistingUser}
            variant='body2'
            style={{ cursor: 'pointer' }}
          >
            Already have an account? Log in
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export const LoadingIndicatorSignup = (props) => {
  const { promiseInProgress } = usePromiseTracker()

  return promiseInProgress ? (
    <img
      src={loadingImage}
      style={{ position: 'center', height: '100px', width: '133px' }}
      alt=''
    />
  ) : (
    !props.registered && (
      <SubmitContentSignup handleExistingUser={props.handleExistingUser} />
    )
  )
}
