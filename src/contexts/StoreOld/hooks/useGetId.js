import { useState, useEffect } from 'react'
import pluralize from 'pluralize'
import { firestoreService } from 'services/firebase'

const { getId } = firestoreService

const useGetId = (model) => {
  const modelPluralized = pluralize(model)
  const [id, setId] = useState('')

  useEffect(() => {
    const newId = getId(modelPluralized)
    console.log(newId)
    setId(newId)
  }, [getId, modelPluralized])

  return id
}

export default useGetId
