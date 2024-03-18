import { styled } from '@mui/material/styles'
import { statsSmall } from '../styles'

export const drawerWidth = 240

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  marginBottom: "1.75vw"
}))

export const linkContentIcon = {
  color: '#6E6E6ECC',
  paddingLeft: 2
}

export const linkContentText = {
  color: '#6E6E6ECC',
}

export const activeHighlight = {
  background: '#F3FFFE'
}

export const activeIcon = {
  color: '#2A9D8F',
  paddingLeft: 2
}

export const activeText = {
  color: '#2A9D8F',
}

export const linkPadding = {
  paddingTop: "0.2rem",
  paddingBottom: "0.2rem",
}

export const SidebarHeader = { ...statsSmall, fontSize: "15px", fontWeight: "400", margin: "24px 0 16px 36px", color: "#6E6E6ECC" }