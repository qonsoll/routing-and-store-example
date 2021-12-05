import { useState, useEffect, useCallback } from 'react'
import useStore from '../useStore'
import { findAll, construct } from '../methods'

const useFindAll = (query, options) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const smartDataFetcher = async () => {
      // Temporary get
      // TODO peek data from runtime storage
      // TODO peek data from LS
      setLoading(true)
      const dbData = await findAll(query, defaultAdapter, models, {
        construct: false
      })
      const constructedData = await construct(dbData, query, models)
      setDocuments(constructedData)
      setLoading(false)
      if (dbData) {
        runtimeStorage.update(`structured`, dbData)
        // TODO update without removing existing
      }
    }
    smartDataFetcher()
  }, [query, defaultAdapter, runtimeStorage, models])

  return [documents, loading, error]
}

export default useFindAll
