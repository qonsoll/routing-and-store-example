import { getDatabase } from 'firebase/firestore'

const database = (app) => getDatabase(app)

export default database
