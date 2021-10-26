import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { deleteDocument } = firestoreService

const useDestroyRecord = (dispatch) => {
  const destroyRecord = async ({ collectionPath }) => {
    console.log(collectionPath)
    const payload = {
      collectionPath
    }
    dispatch({ type: 'destroyDirty', payload })
  }
  return destroyRecord
}

export default useDestroyRecord
