import { Link, useHistory } from 'react-router-dom'
import { useSession } from '../../../contexts/Session'
import PATHS from '../../../pages/paths'
import BUILDER_PATHS from '../../../submodules/builder/pages/paths'

const { DASHBOARD, USERS_ALL } = PATHS.AUTHENTICATED
const BUILDER = BUILDER_PATHS.CONFIG.DEFAULT

const AppLayout = ({ children }) => {
  const history = useHistory()
  const { logout } = useSession()

  const back = () => history.goBack()

  console.log('rerender -> AppLayout')

  return (
    <div>
      <div>
        <button onClick={back} style={{ marginRight: '16px' }}>
          {`<- Go back`}
        </button>
        <Link to={DASHBOARD} style={{ marginRight: '4px' }}>
          Dashboard
        </Link>
        <Link to={USERS_ALL} style={{ marginRight: '4px' }}>
          Users
        </Link>
        <Link to={BUILDER}>Builder</Link>
        <button onClick={logout} style={{ marginLeft: '16px' }}>
          Logout
        </button>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default AppLayout
