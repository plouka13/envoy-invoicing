import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import { success } from './styles'

function DashboardContents() {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => {
    setOpen(!open)
  }

  useEffect(()=>{
    document.body.style.backgroundColor = success.backgroundColorLight
  }, [])
  
  return (
    <div>
      <Navbar onChange={toggleSidebar} sideBarState={open} />
      <Sidebar onChange={toggleSidebar} sideBarState={open} />
    </div>
  )
  
}

export default DashboardContents
