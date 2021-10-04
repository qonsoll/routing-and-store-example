import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthLayout } from '../../components'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import PATHS from '../paths'

const { LOGIN, SIGNUP, FORGOT_PASSWORD } = PATHS.UNAUTHENTICATED

const routes = [
  { key: 'LOGIN', path: LOGIN, component: Login, exact: true },
  { key: 'SIGNUP', path: SIGNUP, component: Signup, exact: true },
  {
    key: 'FORGOT_PASSWORD',
    path: FORGOT_PASSWORD,
    component: ForgotPassword,
    exact: true
  }
]

const Auth = () => {
  return (
    <AuthLayout>
      <Switch>
        {routes.map((routeProps) => (
          <Route {...routeProps} />
        ))}
        <Redirect to={PATHS.SERVICE.NOT_FOUND} />
      </Switch>
    </AuthLayout>
  )
}

export default Auth
