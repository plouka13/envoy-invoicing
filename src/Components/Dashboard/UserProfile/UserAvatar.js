import { Avatar } from '@mui/material'
import React from 'react'

const UserAvatar = (props) => {
  const AvatarInitials =
    props.userProfileState['profileFirstName'] && props.userProfileState['profileLastName']
      ? `${props.userProfileState['profileFirstName'][0].toUpperCase()}${props.userProfileState['profileLastName'][0].toUpperCase()}`
      : `${props.userProfileState['profileEmail'][0].toUpperCase()}`
  const AvatarColor = props.userProfileState['profileColor']
    ? { backgroundColor: props.userProfileState['profileColor'] }
    : { backgroundColor: '#1ABC9C' }

  return (
    <Avatar sx={{ ...AvatarColor, width: props.width, height: props.height, fontSize: props.fontSize }}>
      {AvatarInitials}
    </Avatar>
  )
}

export default UserAvatar
