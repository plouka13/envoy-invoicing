import React, { useState, useEffect, useContext, createContext } from 'react'

export const AuthDataContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

export const useAuthDataContext = () => useContext(AuthDataContext)

const AuthDataProvider = (props) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')

  useEffect(() => {
    setUser(localStorage.getItem('user'))
    setEmail(localStorage.getItem('email'))
  }, [])

  return (
    <AuthDataContext.Provider
      value={{
        user: user,
        email: email,
        firstname: firstname,
        lastname: lastname,
        register: (user, email, firstname, lastname) => {
          setUser(user)
          setEmail(email)
          setFirstName(firstname)
          setLastName(lastname)
        },
        login: (user, email) => {
          setUser(user)
          setEmail(email)
          // make axios call to get firstname and lastname
        },
        logout: () => {
          setUser('')
          setEmail('')
        },
      }}
      {...props}
    />
  )
}

export default AuthDataProvider
