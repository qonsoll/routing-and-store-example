import { getFirestore } from 'firebase/firestore'

const firestore = (app) => getFirestore(app)

export default firestore
