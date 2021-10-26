import { firestoreService } from 'services/firebase'
import { RECORD_TYPES } from '../__constants__'

const { deleteDocument } = firestoreService
const { DIRTY } = RECORD_TYPES

const destroyDirty = (state, payload) => {
  const stateCopy = JSON.parse(JSON.stringify(state))
  const { collectionPath } = payload

  if (stateCopy[DIRTY][collectionPath]) {
    console.log('Has dirty users')

    Object.keys(stateCopy[DIRTY][collectionPath]).map(async (user) => {
      await deleteDocument(collectionPath, user)
      delete stateCopy[DIRTY][collectionPath][user]
    })
  } else console.log('No dirty users')
  return { ...stateCopy }
}

export default destroyDirty
