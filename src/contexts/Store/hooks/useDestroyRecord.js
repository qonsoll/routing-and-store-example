import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { DIRTY, ORDERED, STRUCTURED } = RECORD_TYPES

const { deleteDocument } = firestoreService

const useDestroyRecord = (dispatch) => {
  const destroyRecord = async ({ collectionPath, id }) => {
    console.log(collectionPath, id)
    const record = await deleteDocument(collectionPath, id)
    console.log(record)

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
