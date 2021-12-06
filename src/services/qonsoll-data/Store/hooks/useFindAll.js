import { useState, useEffect, useCallback } from 'react'
import useStore from '../useStore'
import { findAll } from '../methods'

const useFindAll = (query, config) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    findAll(query, defaultAdapter, models).then((data) => {
      console.log('result only ->>>>>>', data)
    })
  }, [query, defaultAdapter, models])

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
