import { Card, Box, Grid, Typography, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { trackPromise } from 'react-promise-tracker'
import { toast } from 'react-toastify'
import { backend_base_url } from '../../../Constants'
import ProfileTop from '../UserProfile/ProfileTop'
import axios from 'axios'
import { FailAlert } from '../../Landing/Constants'
import { btnStyle } from '../styles'

const Profile = (props) => {
    const [localColor, setLocalColor] = useState(props.userProfileState['profileColor'] ? props.userProfileState['profileColor'] : "#1ABC9C");

    const handleFirstnameChange = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newFirst = data.get("newFirst")

        // send data to server
        const update_firstname_url = backend_base_url + 'user/update/firstname'
        const body = { "email": props.userProfileState['profileEmail'], "new_firstname": newFirst }
        trackPromise(
            axios({
                method: 'POST',
                url: update_firstname_url,
                data: body,
            })
                .then((data) => {
                    localStorage.setItem("firstname", newFirst)
                    props.userProfileState['setProfileFirstName'](newFirst)
                    toast(`Name updated to ${newFirst} ${props.userProfileState['profileLastName']}`)
                })
                .catch((error) => {
                    toast(error)
                })
        )
    }

    const handleLastnameChange = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newLast = data.get("newLast")

        // send data to server
        const update_lastname_url = backend_base_url + 'user/update/lastname'
        const body = { "email": props.userProfileState['profileEmail'], "new_lastname": newLast }

        trackPromise(
            axios({
                method: 'POST',
                url: update_lastname_url,
                data: body,
            })
                .then((data) => {
                    localStorage.setItem("lastname", newLast)
                    props.userProfileState['setProfileLastName'](newLast)
                    toast(`Name updated to ${props.userProfileState['profileFirstName']} ${newLast}`)
                })
                .catch((error) => {
                    toast(error)
                })
        )
    }

    const [alertFail, setFailAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('')

    const handleResetPassword = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = data.get("oldpass")
        const new_password = data.get("newpass")

        // send data to server
        const reset_password_url = backend_base_url + 'user/update/password'
        const body = { "email": props.userProfileState['profileEmail'], password, new_password }

        trackPromise(
            axios({
                method: 'POST',
                url: reset_password_url,
                data: body,
            })
                .then((data) => {
                    let msg = data.data.msg
                    setAlertContent(msg)

                    if (msg === "Password successfully updated") {
                        toast(msg)
                    } else {
                        setFailAlert(true)
                    }
                })
                .catch((error) => {
                    setAlertContent(
                        'An unknown error occured, please try again another time.'
                    )
                    setFailAlert(true)
                })
        )
    }

    const handleAvatarColorChange = () => {
        let new_color = localColor

        // send data to server
        const update_color_url = backend_base_url + 'user/update/color'
        const body = { "email": props.userProfileState['profileEmail'], new_color }

        trackPromise(
            axios({
                method: 'POST',
                url: update_color_url,
                data: body,
            })
                .then((data) => {
                    let msg = data.data.msg
                    setAlertContent(msg)

                    if (msg === "profile colour successfully updated") {
                        localStorage.setItem("hex_color", localColor)
                        props.userProfileState['setProfileColor'](localColor)
                        toast("Profile colour updated!")
                    } else {
                        setFailAlert(true)
                    }
                })
                .catch((error) => {
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
        <Card sx={{ paddingBottom: 2 }}>
            <ProfileTop userProfileState={props.userProfileState} />
            <Grid container display="flex" justifyContent="center" alignItems="flex-start" spacing={4}>
                <Grid item xs={6}>
                    <Grid container justifyContent="center" alignItems='center' flexDirection='column' spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant='h5'>
                                {`Current name: ${props.userProfileState['profileFirstName']} ${props.userProfileState['profileLastName']}`}
                            </Typography>
                        </Grid>

                        <Box component='form' onSubmit={handleFirstnameChange} sx={{ margin: 2 }}>
                            <Grid item>
                                <TextField required label="enter new firstname" name="newFirst" id="newFirst" variant="filled">Change username</TextField>
                            </Grid>
                            <Button type='submit' variant='contained' sx={btnStyle}>Change firstname</Button>
                        </Box>

                        <Box component='form' onSubmit={handleLastnameChange} sx={{ margin: 2 }}>
                            <Grid item>
                                <TextField required label="enter new lastname" name="newLast" id="newLast" variant="filled">Change username</TextField>
                            </Grid>
                            <Button type='submit' variant='contained' sx={btnStyle}>Change lastname</Button>
                        </Box>

                        <Grid item xs={6}>
                            <Typography variant='h5'>
                                Change Password
                            </Typography>
                        </Grid>

                        <Box component='form' onChange={resetAlerts} onSubmit={handleResetPassword} sx={{ margin: 2 }}>
                            <Grid item>
                                <TextField required type="password" label="enter old password" name="oldpass" id="oldpass" variant="filled">Old Password</TextField>
                            </Grid>
                            <Grid item>
                                <TextField required type="password" label="enter new password" name="newpass" id="newpass" variant="filled">New password</TextField>
                            </Grid>
                            <Button type='submit' variant='contained' sx={btnStyle}>Reset Password</Button>
                        </Box>
                        <FailAlert
                            alertFail={alertFail}
                            alertContent={alertContent}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center" alignItems='center' flexDirection="column" spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant='h5'>
                                {`Current Profile Colour: ${props.userProfileState['profileColor']}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <HexColorPicker color={localColor} onChange={setLocalColor} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h5'>
                                {`Chosen Colour: ${localColor}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={handleAvatarColorChange} sx={btnStyle} variant="contained">Set avatar color</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card >
    )
}

export default Profile