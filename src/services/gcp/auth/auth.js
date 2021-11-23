import { getAuth } from 'firebase/auth'

const auth = (app) => getAuth(app)

export default auth
