import { useState, useEffect } from 'react'
import { firestoreService } from 'services/firebase'

const { getId } = firestoreService

const useGetId = (collectionPath) => {
  const [id, setId] = useState('')

  useEffect(() => {
    const newId = getId(collectionPath)
    setId(newId)
  }, [getId])

  return id
}

export default useGetId
