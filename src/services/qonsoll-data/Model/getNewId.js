import firestoreService from 'services/firebase/firestoreService'

const getNewId = (collectionPath) => {
  return firestoreService.getId(collectionPath)
}

export default getNewId
