import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackPromise } from 'react-promise-tracker'

import LogoDark from '../../../assets/LogoDark.svg'

import axios from 'axios'
import {
  Card,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  CssBaseline,
} from '@mui/material'
import { FailAlert, LoadingIndicatorSignup, SuccessAlert } from '../Constants'
import { backend_base_url } from '../../../Constants'
import { backgroundDivSignup, boxFlex, cardDimensions, logoDarkDimensions } from '../styles'

function SignUp(props) {
  const navigate = useNavigate()
  const handleExistingUser = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard')
    }
  }, [])

  const [alertFail, setFailAlert] = useState(false)
  const [alertSuccess, setSuccessAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    resetAlerts()

    const data = new FormData(event.currentTarget)

    const email = data.get('email')
    const password = data.get('password')
    const firstname = data.get('firstName')
    const lastname = data.get('lastName')

    let body = { email, password, firstname, lastname }

    const signup_url = backend_base_url + 'signup'

    trackPromise(
      axios({
        method: 'POST',
        url: signup_url,
        data: body,
      })
        .then((data) => {
          let msg = data.data.msg
          let token = data.data.token
          let hex_color = data.data.hex_color

          setSuccessAlert(true)
          setAlertContent(msg)

          if (msg === `User ${email} registered and logged in`) {
            setTimeout(function () {
              console.log('Signup Successful', data)
              // Persist user session and redirect to user dashboard
              localStorage.setItem('email', email)
              localStorage.setItem('firstname', firstname)
              localStorage.setItem('lastname', lastname)
              localStorage.setItem('user', token)
              localStorage.setItem('hex_color', hex_color)
              localStorage.setItem('registered', 'true')
              navigate('/dashboard')
            }, 500)
          } else {
            setFailAlert(true)
          }
        })
        .catch((error) => {
          console.log(error)
          setAlertContent(
            'An unknown error occured, please try again another time.'
          )
          setFailAlert(true)
        })
    )
  }

  const resetAlerts = (event) => {
    setFailAlert(false)
  }

  return (
    <>
      <Grid
        container
        direction='row'
        flexGrow={1}
        spacing={0}
        alignItems='center'
        justifyContent='center'
      >
        <div style={backgroundDivSignup}>
          <Card style={cardDimensions}>
            <Grid
              container
              height='100vh'
              direction='column'
              alignItems='center'
              justifyContent='center'
            >
              <Container component='main' maxWidth='xs'>
                <img
                  style={logoDarkDimensions}
                  src={LogoDark}
                  alt='Landing page logo'
                />
              </Container>

              <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Typography
                  component='h1'
                  variant='h5'
                  fontFamily='Montserrat'
                  fontWeight='700'
                  alignItems='flex-start'
                  marginBottom='10px'
                >
                  Sign up
                </Typography>
                <Box sx={boxFlex}>
                  <Box
                    component='form'
                    onChange={resetAlerts}
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete='given-name'
                          name='firstName'
                          required
                          fullWidth
                          id='firstName'
                          label='First Name'
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id='lastName'
                          label='Last Name'
                          name='lastName'
                          autoComplete='family-name'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id='email'
                          label='Email Address'
                          name='email'
                          autoComplete='email'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          autoComplete='new-password'
                        />
                      </Grid>
                    </Grid>
                    <FailAlert
                      alertFail={alertFail}
                      alertContent={alertContent}
                    />
                    <SuccessAlert
                      alertSuccess={alertSuccess}
                      alertContent={alertContent}
                    />
                    <LoadingIndicatorSignup
                      handleExistingUser={handleExistingUser}
                      registered={alertSuccess}
                    />
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Card>
        </div>
      </Grid>
    </>
  )
}

export default SignUp
