/**
 * Removing item from the Store state and making request to the DB
 */
import pluralize from 'pluralize'
import { firestoreService } from 'services/firebase'

const { deleteDocument } = firestoreService

const useDestroyRecord = (dispatch) => {
  const destroyRecord = (model, id) => {
    const collection = pluralize(model)
    const payload = { collection, id }
    deleteDocument(collection, id)
    dispatch({ type: 'removeRecord', payload })
  }

  return destroyRecord
}

export default useDestroyRecord
