import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { useGCP } from '../../context'

const useCreateDoc = async (collectionPath, id, documentData) => {
  const { app } = useGCP()
  const firestore = getFirestore(app)
  const ref = doc(firestore, collectionPath, id)
  const result = await setDoc(ref, documentData)
  return result
}

export default useCreateDoc
