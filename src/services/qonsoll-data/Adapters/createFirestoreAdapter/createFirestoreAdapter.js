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

const createFirestoreAdapter = (app) => {
  const db = getFirestore(app)

  const generateId = (path) => doc(collection(db, path)).id
  const createRecord = async (path, id, data) => {
    const result = await setDoc(doc(db, path, id), data)
    return result
  }
  const updateRecord = async () => {}
  const destroyRecord = async () => {}
  const findRecord = async () => {}
  const findAll = async () => {}
  const findBelongsTo = async () => {}
  const findHasMany = async () => {}
  const query = async () => {}

  return {
    generateId,
    createRecord,
    updateRecord,
    destroyRecord,
    findRecord,
    findAll,
    findBelongsTo,
    findHasMany,
    query
  }
}

export default createFirestoreAdapter
