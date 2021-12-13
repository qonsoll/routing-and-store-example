import useStore from '../useStore'
import { fetchRecord, construct } from '../methods'
import { useState, useEffect } from 'react'

const useFetchRecord = (query, config, disabled) => {
  const { defaultAdapter, models } = useStore()
  const [error] = useState(null)
  const [document, setDocuments] = useState([])

  useEffect(() => {
    const recordFetcher = async () => {
      const data = await fetchRecord({ query, adapter: defaultAdapter, models })
      const constructedData = construct(data, query, models)
      setDocuments(constructedData)
    }
    if (!disabled) recordFetcher()
  }, [models, query, defaultAdapter, disabled])

  return [document, error]
}

export default useFetchRecord
