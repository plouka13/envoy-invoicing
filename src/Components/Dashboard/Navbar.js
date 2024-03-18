import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Toolbar, Menu, MenuItem } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'

import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'

import LogoLight from '../../assets/LogoLight.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'
import { backend_base_url } from '../../Constants'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import UserAvatar from './UserProfile/UserAvatar'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate()
  const handleLogout = () => {
    setAnchorEl(null)

    const token = localStorage.getItem('user')
    const email = localStorage.getItem('email')

    let body = { token, email }

    const logout_url = backend_base_url + 'logout'

    trackPromise(
      axios({
        method: 'POST',
        url: logout_url,
        data: body,
      })
        .then((data) => {
          let msg = data.data.msg

          if (msg === `Successfully logged out ${email}`) {
            // Remove persistence of user session and redirect to home page
            toast(msg)
            setTimeout(() => {
              localStorage.removeItem('user')
              localStorage.removeItem('email')
              localStorage.removeItem('firstname')
              localStorage.removeItem('lastname')
              localStorage.removeItem('hex_color')
              localStorage.removeItem('registered')
              navigate('/')
            }, 1000)
          } else {
          }
        })
        .catch((error) => {
          console.log(error)
        })
    )
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{
            zIndex: 1301,
            background: '#2A9D8F',
          }}
          position='fixed'
        >
          <ToastContainer />
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='toggleSideBar'
              onClick={(event) => props.onChange()}
              sx={{ mr: 2 }}
            >
              {props.sideBarState ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <Box noWrap sx={{ flexGrow: 1 }}>
              <img src={LogoLight} alt='Logo' />
            </Box>

            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <UserAvatar userProfileState={props.userProfileState} />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ zIndex: 1302 }}
              >
                <MenuItem>
                  <em>{`Logged in as ${props.userProfileState['profileEmail']}`}</em>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  )
}

export default Navbar
