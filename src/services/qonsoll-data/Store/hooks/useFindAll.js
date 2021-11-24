import { useState, useEffect } from 'react'
import useStore from '../useStore'

const useFindAll = (query, config) => {
  const { runtimeStorage, defaultAdapter } = useStore()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const smartDataFetcher = async () => {
      // Temporary get
      const runtimeStorageData = runtimeStorage.get(`structured.${query}`)
      const runtimeStorageDataExists =
        runtimeStorageData && !!Object.keys(runtimeStorageData)
      if (runtimeStorageDataExists) {
        setLoading(false)
        setDocuments(runtimeStorageData)
      } else {
        const dbData = await defaultAdapter.findAll(query)
        setLoading(false)
        setDocuments(dbData)
        if (dbData) {
          runtimeStorage.update(`structured.${query}`, dbData)
        }
      }
    }
    smartDataFetcher()
  }, [query, defaultAdapter, runtimeStorage])

  return [documents, loading, error]
}

export default useFindAll
