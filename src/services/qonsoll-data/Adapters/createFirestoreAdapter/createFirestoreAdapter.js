import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  getDoc,
  getDocs,
  orderBy,
  limit,
  where,
  deleteDoc
} from 'firebase/firestore'

/**
 * This function creates firebase firestore adapter for the Qonsoll Store
 * @param {object} app - Firebase app instance
 */
const createFirestoreAdapter = (app) => {
  const db = getFirestore(app)

  /**
   * Generates unique id in scope of specific collection
   * @param {string} path - Path to the collection
   */
  const generateId = (path) => doc(collection(db, path)).id

  /**
   * Creates record in firestore DB
   * @param {string} path - Path to the collection
   * @param {string} id - Document id
   * @param {object} data - Data you want to save into the document
   */
  const createRecord = async (path, id, data) => {
    const result = await setDoc(doc(db, path, id), data)
    return result
  }

  /**
   * Updates record in firestore DB
   * @param {string} path - Path to the collection
   * @param {string} id - Document id
   * @param {object} data - Data you want to save into the document
   */
  const updateRecord = async (path, id, data) => {
    const result = await updateDoc(doc(db, path, id), data)
    return result
  }

  /**
   * Removes record from the firestore DB
   * @param {string} path - Path to the collection
   * @param {string} id - Document id
   */
  const destroyRecord = async (path, id) => {
    const result = await deleteDoc(doc(db, path, id))
    return result
  }

  /**
   * Find single record in firestore
   * @param {string} path - Path to the collection
   * @param {string} id - Document id
   */
  const findRecord = async (path, id) => {
    const docSnapshot = await getDoc(doc(db, path, id))
    return docSnapshot.data()
  }

  /**
   * Get all documents from the collection
   * @param {string} path - Path to the collection
   */
  const findAll = async (path) => {
    const querySnapshot = await getDocs(collection(db, path))
    let result = []
    querySnapshot.forEach((doc) => {
      result.push(doc.data())
    })
    return result
  }

  /**
   * Get record by id (relationship)
   */
  const findBelongsTo = async () => {
    // Not clear yet
  }

  /**
   * Get all records by id (from array or sub-collection)
   */
  const findHasMany = async () => {
    // Not clear yet
  }

  /**
   * Query documents from the database using query rules
   * @param {string} path - Path to the collection
   * @param {array}  queries - Array of where queries
   * @param {array}  orderByRule - orderBy rule description
   * @param {string} limitRule - limit rule
   */
  const queryRecords = async (path, queries, orderByRule, limitRule) => {
    const ref = collection(db, path)
    const queriesExtended = queries && queries.map((q) => where(...q))
    orderByRule && queriesExtended.push(orderBy(...orderByRule))
    limitRule && queriesExtended.push(limit(limitRule))
    const q = queriesExtended ? query(ref, ...queriesExtended) : query(ref)
    const querySnapshot = await getDocs(q)
    let result = []
    querySnapshot.forEach((doc) => {
      result.push(doc.data())
    })
    return result
  }

  /**
   * Get current server timestamp
   */
  const getTimestamp = () => serverTimestamp()

  return {
    generateId,
    createRecord,
    updateRecord,
    destroyRecord,
    findRecord,
    findAll,
    findBelongsTo,
    findHasMany,
    queryRecords,
    getTimestamp
  }
}

export default createFirestoreAdapter
