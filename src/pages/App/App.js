import { Switch, Route, Redirect } from 'react-router-dom'
import { AppLayout } from '../../components'
import Dashboard from './Dashboard/Dashboard'
import { UsersAll, UserShow, UserCreate, UserEdit } from './Dashboard/Users'
import PATHS from '../paths'

const { DASHBOARD, USERS_ALL, USER_CREATE, USER_EDIT, USER_SHOW } =
  PATHS.AUTHENTICATED

const routes = [
  { key: 'DASHBOARD', path: DASHBOARD, component: Dashboard, exact: true },
  { key: 'USERS_ALL', path: USERS_ALL, component: UsersAll, exact: true },
  { key: 'USER_CREATE', path: USER_CREATE, component: UserCreate, exact: true },
  { key: 'USER_EDIT', path: USER_EDIT, component: UserEdit, exact: true },
  { key: 'USER_SHOW', path: USER_SHOW, component: UserShow, exact: true }
]

const App = () => {
  return (
    <AppLayout>
      <Switch>
        {routes.map((routeProps) => (
          <Route {...routeProps} />
        ))}
        <Redirect to={PATHS.SERVICE.NOT_FOUND} />
      </Switch>
    </AppLayout>
  )
}

export default App
