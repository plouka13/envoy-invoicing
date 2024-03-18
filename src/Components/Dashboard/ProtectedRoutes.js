import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const token = localStorage.getItem('user')
  return token ? <Outlet /> : <Navigate to='/signup' />
}
