import { useState } from 'react'
import SessionContext from './SessionContext'

const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  )
  const login = () => {
    localStorage.setItem('isAuthenticated', true)
    setIsAuthenticated(true)
  }
  const logout = () => {
    localStorage.setItem('isAuthenticated', false)
    setIsAuthenticated(false)
  }
  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
