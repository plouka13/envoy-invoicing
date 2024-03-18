import React, { useState } from 'react'
import { Drawer, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Dashboard } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

import DrawerList from './DrawerItems'
import { Main, drawerWidth, DrawerHeader, SidebarHeader } from './Styles'
import { Activity } from '../Pages/Activity'
import { CreateInvoice } from '../Pages/CreateInvoice'
import { MyInvoices } from '../Pages/MyInvoices'
import Profile from '../Pages/Profile'
import Team from '../Pages/Team'

function Sidebar(props) {
  const [activeLink, changeLinkState] = useState({
    activeItem: { icon: <Dashboard />, text: 'My Activity', route: '/dashboard' },
    objects: [
      { icon: <Dashboard />, text: 'My Activity', route: '/dashboard' },
      {
        icon: <NoteAddIcon />,
        text: 'Create Invoice',
        route: '/dashboard/create',
      },
      {
        icon: <InboxIcon />,
        text: 'My Invoices',
        route: '/dashboard/invoices',
      },
      {
        icon: <PersonIcon />,
        text: 'My Profile',
        route: '/dashboard/profile'
      },
      {
        icon: <GroupsIcon />,
        text: 'My Teams',
        route: '/dashboard/team'
      }
    ],
  })

  const location = useLocation()

  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={props.sideBarState}
      >
        <DrawerHeader>
          <IconButton onClick={props.onChange}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Typography variant='h5' sx={SidebarHeader}>DASHBOARD</Typography>

        <DrawerList activeLink={activeLink} changeLinkState={changeLinkState} />
      </Drawer>

      <Main open={props.sideBarState}>
        <DrawerHeader />
        {(location.pathname === '/dashboard' || location.pathname === '/dashboard/') ? <Activity userProfileState={props.userProfileState} activeLink={activeLink} changeLinkState={changeLinkState} /> : null}

        {location.pathname === '/dashboard/create' && (
          <CreateInvoice />
        )}

        {location.pathname === '/dashboard/invoices' && (
          <MyInvoices activeLink={activeLink} changeLinkState={changeLinkState} item={{
            icon: <NoteAddIcon />,
            text: 'Create Invoice',
            route: '/dashboard/create',
          }} />
        )}

        {location.pathname === '/dashboard/profile' && (
          <Profile userProfileState={props.userProfileState} />
        )}

        {location.pathname === '/dashboard/team' && (
          <Team />
        )}
      </Main>
    </React.Fragment>
  )
}

export default Sidebar
