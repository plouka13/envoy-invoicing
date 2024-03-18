import axios from 'axios'
import React, { useEffect } from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { backend_base_url } from '../../../Constants'
import loadingImage from '../../../assets/Loading.gif'

// invoice table component imports
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip,
    Avatar,
    Grid,
    Typography,
    Box,
    TextField,
    IconButton,
    Container,
} from '@mui/material'
import { tableContent, tag1, tag2, warning, statsSmallHeader, cardHeader } from '../styles'
import '../Table.css'
import Widget from '../Widget'
import { Add } from '@mui/icons-material'
import { toast } from 'react-toastify'

const TeamMemberTable = (props) => {
    const { promiseInProgress } = usePromiseTracker()
    const token = localStorage.getItem('user')
    const email = localStorage.getItem('email')

    const handleInviteSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const invitee_email = data.get('inviteEmail')

        const team_invite_url = backend_base_url + 'team/invite'
        let body = { "team_name": props.teamName, "invitee_email": invitee_email }
        let config = {
            headers: { token },
        }

        trackPromise(
            axios
                .post(team_invite_url, body, config)
                .then((data) => {
                    console.log(data)
                    if (data.data.msg === `${invitee_email} successfully added to ${props.teamName} as a Member`) {
                        toast(data.data.msg)
                        props.reloadTeamList()
                    } else {
                        toast(`${"ERROR!! "} ${data.data.msg}`)
                    }
                })
                .catch((err) => console.log(err))
        )
    }

    useEffect(() => {
        props.membersList.forEach(user => {
            if (user.email === email && user.role === 'Owner') {
                props.teamFunctions.setTeamOwner(true)
            }
        })
    })

    const alertMessage = !props.teamFunctions.teamOwner ? "Only Team Owner can add new members" : ""

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`Team: ${props.teamName}`} upperTitle noBodyPadding body>
                        {
                            promiseInProgress || !props.membersList ? (
                                <img
                                    src={loadingImage}
                                    style={{
                                        position: 'center',
                                        height: '100px',
                                        width: '133px',
                                    }}
                                    alt=''
                                />
                            ) : (
                                <React.Fragment>
                                    <UserTable data={props.membersList} />
                                    <Container sx={{ m: "32px 0", pb: 3 }}>
                                        <Typography sx={{ ...cardHeader, p: 0 }} variant='h5'>Invite Team Members</Typography>
                                        <Box component="form" onSubmit={handleInviteSubmit}>
                                            <TextField disabled={!props.teamFunctions.teamOwner} required helperText={alertMessage} title={alertMessage} variant='standard' label="Invitee Email" name="inviteEmail" id="inviteEmail" />
                                            <IconButton disabled={!props.teamFunctions.teamOwner} title={alertMessage} type="submit">
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Container>
                                </React.Fragment>
                            )
                        }
                    </Widget>
                </Grid>
            </Grid>
        </>
    )
}

function UserTable(props) {
    var keys = ['TEAM MEMBER', 'ROLE', 'JOINED']

    return (
        <>
            <Table className='mb-0'>
                <TableHead>
                    <TableRow>
                        {keys.map((key) =>
                            key === '' ? (
                                <TableCell key={key} />
                            ) : (
                                <TableCell key={key} sx={tableContent}>
                                    {key}
                                </TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(
                        (
                            { hex_color, firstname, lastname, email, role, time_joined },
                            idx
                        ) => (
                            <TableRow key={idx}>
                                <TableCell className='pl-3 fw-normal' sx={tableContent}>
                                    <Grid container display="flex" justifyContent="left" alignItems="center">
                                        <Grid item>
                                            <Avatar sx={{ backgroundColor: hex_color }}>
                                                {(firstname && lastname)
                                                    ? `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`
                                                    : email[0]}
                                            </Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Grid container sx={{ pl: 2 }} display="flex" justifyContent="center" alignItems="left" flexDirection="column">
                                                <Grid item>
                                                    <Typography variant='h5' sx={{ ...tableContent, p: 0 }}>{`${firstname} ${lastname}`}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='h5' sx={{ ...tableContent, p: 0, ...statsSmallHeader }}>{email}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell sx={tableContent}>
                                    <Chip
                                        label={role}
                                        style={
                                            role === 'Owner'
                                                ? tag2
                                                : role === 'Member'
                                                    ? tag1
                                                    : warning
                                        }
                                    />
                                </TableCell>
                                <TableCell sx={tableContent}>{time_joined}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default TeamMemberTable
