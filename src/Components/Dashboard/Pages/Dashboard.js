import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar/Sidebar'

function DashboardContents() {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => {
    setOpen(!open)
  }

  const [profileColor, setProfileColor] = useState(localStorage.getItem('hex_color'))
  const [profileFirstName, setProfileFirstName] = useState(
    localStorage.getItem('firstname')
  )
  const [profileLastName, setProfileLastName] = useState(localStorage.getItem('lastname'))
  const [profileEmail, setProfileEmail] = useState(localStorage.getItem('email'))

  const userProfileDetails = {
    profileColor,
    setProfileColor,
    profileFirstName,
    setProfileFirstName,
    profileLastName,
    setProfileLastName,
    profileEmail,
    setProfileEmail,
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#F8FFFE'
  }, [])

  return (
    <div>
      <Navbar
        onChange={toggleSidebar}
        sideBarState={open}
        userProfileState={userProfileDetails}
      />
      <Sidebar
        onChange={toggleSidebar}
        sideBarState={open}
        userProfileState={userProfileDetails}
      />
    </div>
  )
}

export default DashboardContents
