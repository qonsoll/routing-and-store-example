import useStore from '../useStore'
import { fetchAll, construct } from '../methods'
import { useState, useEffect } from 'react'

/**
 * Method helps to fetch all data by query from DB
 * @param {string} query graphql like query
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @param {string} disable property that disable fetching data
 * @returns [documents, loading, error]
 */
const useFetchAll = (query, config, disabled) => {
  // Extracting adapter and models from StoreContext
  const { defaultAdapter, models } = useStore()

  // Values (state) that should be returned
  const [error] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Method that helps to fetch data from DB
    const allFetcher = async () => {
      setLoading(true)
      const dbData = await fetchAll({ query, adapter: defaultAdapter, models })

      const constructedData = construct(dbData, query, models)
      setDocuments(constructedData)
      setLoading(false)
    }
    if (!disabled) allFetcher()
  }, [models, query, defaultAdapter, disabled])

  return [documents, loading, error]
}

export default useFetchAll
