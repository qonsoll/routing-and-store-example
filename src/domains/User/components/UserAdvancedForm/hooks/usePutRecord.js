import {
  useStore,
  useMutations
} from '../../../../../services/qonsoll-data/Store'

/**
 * Hook returns a method that decides to update a document or create a new one
 * @returns putRecord
 */
const usePutRecord = () => {
  // Getting a default adapter for find a document in DB
  const { defaultAdapter } = useStore()
  // Getting a mutations for create or update data in DB and cache
  const { add, update } = useMutations()

  /**
   * A method that decides to update a document or create a new one
   * @param {string} collectionName name of the document collection
   * @param {string} id document id
   * @param {string} data document data that will be created or updated
   */
  const putRecord = async (collectionName, id, data) => {
    // Getting a method for finding a document in DB
    const { findRecord } = defaultAdapter

    // Getting a document from DB
    const document =
      collectionName && id && data && (await findRecord(collectionName, id))
    // If document exist update him, else create new one
    document ? update(collectionName, id, data) : add(collectionName, id, data)
  }
  return putRecord
}

export default usePutRecord
