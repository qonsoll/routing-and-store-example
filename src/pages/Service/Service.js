import { Switch, Route, Redirect } from 'react-router-dom'
import { ServiceLayout } from '../../components'
import AccessDenied from './AccessDenied'
import NotFound from './NotFound'
import GDPRPage from './GDPR'
import TermsAndConditions from './TermsAndConditions'
import PATHS from '../paths'

const { ACCESS_DENIED, NOT_FOUND, GDPR, TERMS_AND_CONDITIONS } = PATHS.SERVICE

const routes = [
  {
    key: 'ACCESS_DENIED',
    path: ACCESS_DENIED,
    component: AccessDenied,
    exact: true
  },
  { key: 'NOT_FOUND', path: NOT_FOUND, component: NotFound, exact: true },
  { key: 'GDPR', path: GDPR, component: GDPRPage, exact: true },
  {
    key: 'TERMS_AND_CONDITIONS',
    path: TERMS_AND_CONDITIONS,
    component: TermsAndConditions,
    exact: true
  }
]

const Service = () => {
  return (
    <ServiceLayout>
      <Switch>
        {routes.map((routeProps) => (
          <Route {...routeProps} />
        ))}
        <Redirect to={PATHS.SERVICE.NOT_FOUND} />
      </Switch>
    </ServiceLayout>
  )
}

export default Service
