import useStore from '../useStore'
import { fetchAll, construct } from '../methods'
import { useState, useEffect } from 'react'

const useFetchAll = (query, config, disabled) => {
  const { defaultAdapter, models } = useStore()
  const [error] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const allFetcher = async () => {
      const dbData = await fetchAll({ query, adapter: defaultAdapter, models })

      const constructedData = construct(dbData, query, models)
      setDocuments(constructedData)
    }
    if (!disabled) allFetcher()
  }, [models, query, defaultAdapter, disabled])

  return [documents, error]
}

export default useFetchAll
