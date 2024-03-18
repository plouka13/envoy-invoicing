import {
    Button,
    Card,
    Typography,
    TextField,
    CardContent,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { backend_base_url } from '../../../Constants'
import { btnStyle, cardHeader, pageTitle, statsSmall } from '../styles'
import TeamContent from '../UserTeams/TeamContent'
import Loading from '../../../assets/Loading.gif'

const Team = () => {
    const [creatingTeam, setCreatingTeam] = useState(false)
    const [existsTeam, setExistsTeam] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [teamOwner, setTeamOwner] = useState(false)

    const { promiseInProgress } = usePromiseTracker()

    const [membersList, updateMembersList] = useState([])
    const token = localStorage.getItem('user')
    const email = localStorage.getItem('email')

    // check if user is already in the team, and set existsTeam to true to render team members/invoices list
    const reloadTeamList = () => {
        const token = localStorage.getItem('user')
        const team_members_url = backend_base_url + 'team/members'
        let config = {
            headers: { token },
        }

        trackPromise(
            axios
                .get(team_members_url, config)
                .then((data) => {
                    if (
                        data.data.msg.includes("Successfully got list of members in")
                    ) {
                        setTeamName(data.data.msg.replace("Successfully got list of members in ", ''))
                        updateMembersList(data.data.members)
                        setExistsTeam(true)
                    }
                })
                .catch((err) => console.log(err))
        )
    }

    useEffect(() => {
        reloadTeamList()
    }, [])

    function handleCreateTeam() {
        setCreatingTeam(true)
    }

    function handleCreateTeamSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const team_name = data.get('teamName')

        const team_create_url = backend_base_url + 'team/create'
        let body = { team_name }
        let config = {
            headers: { token },
        }

        trackPromise(
            axios
                .post(team_create_url, body, config)
                .then((data) => {
                    console.log(data)
                    if (data.data.msg === `${team_name} successfully created.`) {
                        setCreatingTeam(false)
                        setTeamName(team_name)
                        setExistsTeam(true)
                        reloadTeamList()
                    }
                })
                .catch((err) => console.log(err))
        )
    }

    return (
        <>
            <Typography
                component='h1'
                fontSize='1.8rem'
                fontFamily='Montserrat'
                sx={pageTitle}
            >
                My Teams
            </Typography>
            {promiseInProgress && <img src={Loading} style={{ height: "100px", width: "133px" }} alt="loading invoices"></img>}
            {!promiseInProgress && (!existsTeam ? (
                !creatingTeam ? (
                    <React.Fragment>
                        <Typography variant='h3' sx={cardHeader}>
                            Not in a team yet. Try creating one.
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={handleCreateTeam}
                            sx={{
                                textTransform: 'none',
                                color: '#F3FFFE',
                                backgroundColor: '#2A9D8F',
                                '&:hover': { backgroundColor: '#2A9D8F' },
                            }}
                        >
                            New Team
                        </Button>
                    </React.Fragment>
                ) : (
                    <Card sx={{ width: '30vw', minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                variant='h5'
                                sx={{ ...statsSmall, fontWeight: '400', mt: '1vw', mb: '1vw' }}
                            >
                                Create team
                            </Typography>
                            <Box component='form' onSubmit={handleCreateTeamSubmit}>
                                <TextField
                                    required
                                    fullWidth={true}
                                    variant='standard'
                                    name='teamName'
                                    label='Team Name'
                                    id='teamName'
                                />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    sx={{ mt: 3, ...btnStyle }}
                                >
                                    Create team
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )
            ) : (
                <TeamContent teamName={teamName} membersList={membersList} reloadTeamList={reloadTeamList} teamFunctions={{teamOwner, setTeamOwner}} />
            ))}
        </>
    )
}

export default Team
