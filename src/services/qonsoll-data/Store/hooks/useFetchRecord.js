import useStore from '../useStore'
import { fetchRecord, construct } from '../methods'
import { useState, useEffect } from 'react'

/**
 * Method helps to fetch record data by query from DB
 * @param {string} query graphql like query
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @param {string} disable property that disable fetching data
 * @returns [documents, loading, error]
 */
const useFetchRecord = (query, config, disabled) => {
  // Extracting adapter and models from StoreContext
  const { defaultAdapter, models } = useStore()

  // Values (state) that should be returned
  const [error] = useState(null)
  const [loading, setLoading] = useState(false)
  const [document, setDocuments] = useState([])

  useEffect(() => {
    // Method that helps to fetch record data from DB
    const recordFetcher = async () => {
      setLoading(true)
      const data = await fetchRecord({ query, adapter: defaultAdapter, models })
      const constructedData = construct(data, query, models)
      setDocuments(constructedData)
      setLoading(false)
    }
    if (!disabled) recordFetcher()
  }, [models, query, defaultAdapter, disabled])

  return [document, error]
}

export default useFetchRecord
