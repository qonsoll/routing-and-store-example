import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import RoutesRedirect from './RoutesRedirect'
import { Auth } from './Auth'
import { Service } from './Service'
import { App } from './App'
import Builder from '../submodules/builder/pages/Builder/Builder'

const Navigator = () => {
  return (
    <Router>
      <RoutesRedirect>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth" />
          </Route>
          <Route path="/auth/:path?" component={Auth} />
          <Route path="/service/:path?" component={Service} />
          <Route path="/builder/:path?" component={Builder} />
          <Route component={App} />
        </Switch>
      </RoutesRedirect>
    </Router>
  )
}

export default Navigator
