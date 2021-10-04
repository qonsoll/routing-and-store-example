import { initializeApp } from 'firebase/app'
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

const firebaseConfig = {
  apiKey: 'AIzaSyCrRFGfIuYRn4992_8K6S4rkYE5wYAKl_A',
  authDomain: 'qonsoll-ams.firebaseapp.com',
  databaseURL:
    'https://qonsoll-ams-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'qonsoll-ams',
  storageBucket: 'qonsoll-ams.appspot.com',
  messagingSenderId: '1044286479835',
  appId: '1:1044286479835:web:066362f39f5ae937955bfe'
}

initializeApp(firebaseConfig)

const db = getFirestore()

const createDocument = async (collectionPath, id, documentData) => {
  const ref = doc(db, collectionPath, id)
  const result = await setDoc(ref, documentData)
  return result
}

const updateDocument = async (collectionPath, id, documentData) => {
  const ref = doc(db, collectionPath, id)
  const result = await updateDoc(ref, documentData)
  return result
}

const getDocument = async (collectionPath, id) => {
  const ref = doc(db, collectionPath, id)
  const docSnapshot = await getDoc(ref)
  return docSnapshot.data()
}

const queryDocuments = async (
  collectionPath,
  queries,
  orderByRule,
  limitRule
) => {
  const ref = collection(db, collectionPath)
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

const getTimestamp = () => serverTimestamp()

const getId = (collectionPath) => {
  const ref = doc(collection(db, collectionPath))
  return ref.id
}

const deleteDocument = async (collectionPath, id) => {
  const result = await deleteDoc(doc(db, collectionPath, id))
  return result
}

const firestoreService = {
  createDocument,
  updateDocument,
  getDocument,
  queryDocuments,
  deleteDocument,
  getTimestamp,
  getId
}

export default firestoreService
