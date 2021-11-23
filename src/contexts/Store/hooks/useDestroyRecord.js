import { firestoreService } from 'services/firebase'

const { deleteDocument } = firestoreService

const useDestroyRecord = (dispatch) => {
  const destroyRecord = async ({ collectionPath, id }) => {
    await deleteDocument(collectionPath, id)

    const payload = { collectionPath, id }

    dispatch({ type: 'removeRecord', payload })
  }
  return destroyRecord
}

export default useDestroyRecord
