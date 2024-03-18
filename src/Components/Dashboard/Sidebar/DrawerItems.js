import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
} from '@mui/material'
import {
  activeHighlight,
  activeIcon,
  activeText,
  linkContentIcon,
  linkContentText,
  linkPadding,
  SidebarHeader,
} from './Styles.js'
import { Link } from 'react-router-dom'
import './DrawerItems.css'

export default function DrawerList(props) {
  const activeLink = props.activeLink
  const changeLinkState = props.changeLinkState

  function handleLinkChange(index) {
    changeLinkState({ ...activeLink, activeItem: activeLink.objects[index] })
  }

  function toggleStyles(type, index) {
    if (type === 'icon') {
      if (activeLink.objects[index] === activeLink.activeItem) {
        return activeIcon
      } else {
        return linkContentIcon
      }
    } else if (type === 'text') {
      if (activeLink.objects[index] === activeLink.activeItem) {
        return activeText
      } else {
        return linkContentText
      }
    } else if (type === 'background') {
      if (activeLink.objects[index] === activeLink.activeItem) {
        return { ...activeHighlight }
      } else {
        return {}
      }
    }
  }

  return (
    <React.Fragment>
      <List>
        {activeLink.objects.map((element, index) => (
          <React.Fragment>
            <div key={index} onClick={() => handleLinkChange(index)} style={linkPadding}>
              <Link style={{ textDecoration: 'none' }} to={element.route}>
                <ListItem sx={toggleStyles('background', index)} button>
                  <ListItemIcon sx={toggleStyles('icon', index)}>
                    {element.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={element.text}
                    sx={toggleStyles('text', index)}
                  />
                </ListItem>
              </Link>
            </div>  
            {index === 2 &&
              <React.Fragment>
                <Divider sx={{marginTop:2}}/>
                <Typography variant='h5' sx={SidebarHeader}>USER</Typography>
              </React.Fragment>
            }
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  )
}
