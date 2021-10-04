const PATHS = {
  CONFIG: {
    DEFAULT: '/auth',
    AFTER_LOGIN: '/dashboard',
    AFTER_LOGOUT: '/auth'
  },
  UNAUTHENTICATED: {
    LOGIN: '/auth',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password'
  },
  SERVICE: {
    ACCESS_DENIED: '/service/access-denied',
    GDPR: '/service/gdpr',
    NOT_FOUND: '/service/404',
    TERMS_AND_CONDITIONS: '/service/terms-and-conditions'
  },
  AUTHENTICATED: {
    DASHBOARD: '/dashboard',
    USERS_ALL: '/users',
    USER_CREATE: '/user/create',
    USER_SHOW: '/users/:id',
    USER_EDIT: '/users/:id/edit',
    SETTINGS: '/settings',
    APPEARANCE: '/settings/appearance',
    LANGUAGES: '/settings/languages',
    STORAGE: '/settings/storage'
  }
}

export default PATHS
