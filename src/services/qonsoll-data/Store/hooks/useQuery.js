import useStore from '../useStore'
import { fetchByQuery } from '../methods'
import { useState, useEffect } from 'react'

/**
 * Method helps to find all data by query in db using conditional rules
 * @param {string} query graphql like query
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @param {array} conditionals rules for fetching data from db
 * @returns [documents, loading, error]
 */
const useQuery = (query, options, conditionals) => {
  // Extracting runtimeStorage, adapter and models from StoreContext
  const { defaultAdapter, models } = useStore()

  // Values (state) that should be returned
  const [error] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    // Method helps to fetch data from the database with queries
    const queriesFetcher = async () => {
      //   Using query algorithm, based on adapter query method
      const dbData = await fetchByQuery({
        query,
        models,
        conditionals,
        adapter: defaultAdapter,
        options
      })
      //Check dbData existing, if exist update local state
      if (dbData) setDocuments(dbData)
    }
    queriesFetcher()
  }, [conditionals, defaultAdapter, query, models])

  return [documents, error]
}

export default useQuery
