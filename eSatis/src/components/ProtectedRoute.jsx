import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute 