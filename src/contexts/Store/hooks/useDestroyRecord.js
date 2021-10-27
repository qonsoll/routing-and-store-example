import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { DIRTY, ORDERED, STRUCTURED } = RECORD_TYPES

const { deleteDocument } = firestoreService

const useDestroyRecord = (dispatch) => {
  const destroyRecord = async ({ collectionPath, id }) => {
    const record = await deleteDocument(collectionPath, id)

    const recordId = id
    const payload = {
      type: ORDERED,
      collectionPath,
      id: recordId
    }
    dispatch({ type: 'removeRecord', payload })
  }
  return destroyRecord
}

export default useDestroyRecord
