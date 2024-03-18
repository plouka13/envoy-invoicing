import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import HomeContents from '../HomeContents'

function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fff"
  }, [])

  const loggedIn = localStorage.getItem('user')

  return (
    <div>
      {loggedIn ? <Navigate to="/dashboard" /> : <HomeContents />}
    </div>
  )
}

export default Home
