import { Switch, Route, Redirect } from 'react-router-dom'
import { BuilderLayout } from '../../components'
import { Applications } from './pages'
import PATHS from '../paths'

const { APPLICATIONS } = PATHS.AUTHENTICATED

const routes = [
  {
    key: 'APPLICATIONS',
    path: APPLICATIONS,
    component: Applications,
    exact: true
  }
]

const Builder = () => {
  return (
    <BuilderLayout>
      <Switch>
        <Route path="/builder" exact>
          <Redirect to="/builder/applications" />
        </Route>
        {routes.map((routeProps) => (
          <Route {...routeProps} />
        ))}
      </Switch>
    </BuilderLayout>
  )
}

export default Builder
