import { useEffect } from 'react'
import { useSession } from '../contexts/Session'
import { useHistory, useLocation } from 'react-router-dom'
import PATHS from './paths'

const unauthenticatedPaths = Object.values(PATHS.UNAUTHENTICATED)

const RoutesRedirect = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  const { isAuthenticated } = useSession()

  useEffect(() => {
    const isUnauthenticatedPath = unauthenticatedPaths.includes(
      location.pathname
    )

    const isLoggedIn = isUnauthenticatedPath && isAuthenticated
    const isLoggedOut = !isUnauthenticatedPath && !isAuthenticated

    isLoggedIn && history.push(PATHS.CONFIG.AFTER_LOGIN)
    isLoggedOut && history.push(PATHS.CONFIG.AFTER_LOGOUT)
  }, [history, isAuthenticated, location.pathname])

  return <>{children}</>
}

export default RoutesRedirect
