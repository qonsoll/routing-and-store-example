import { useState, useRef, useEffect, useMemo } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import md5 from 'md5'
import useStore from '../useStore'
import useUpdateCache from './useUpdateCache'
import useGetRefreshStatus from './useGetRefreshStatus'
import { fetchByQuery, construct } from '../methods'

/**
 * Method helps to find all data by query in db using conditional rules
 * @param {string} query graphql like query
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @param {array} conditionals rules for fetching data from db
 * @returns [documents, loading, error]
 */
const useQuery = (query, config, conditionals) => {
  // Extracting adapter and models from StoreContext
  const { defaultAdapter, models } = useStore()

  // Extracting method for cache update (runtime storage)
  const [updateCache, cacheError] = useUpdateCache()

  // Generating queryHash for the saving to the runtime storage
  const queryHash = useMemo(() => query && md5(query), [query])

  // Extracting entry collection name
  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )

  // Extracting method for getting refresh status (if refresh is allowed or no)
  const getRefreshStatus = useGetRefreshStatus()

  // Result documents
  const documents = useRef([])
  const error = useRef(cacheError)

  // Loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllHandler = async () => {
      // Start loading
      setLoading(true)

      try {
        // Fetch all data from the DB using default adapter with conditionals
        const dbData = await fetchByQuery({
          query,
          adapter: defaultAdapter,
          models,
          conditionals
        })

        // Construct data to the nested objects
        const constructedData = config?.disableConstruct
          ? dbData
          : construct(dbData, query, models)

        // Update cache
        !config?.disableCacheUpdate && updateCache(queryHash, dbData)

        // Update result documents
        documents.current = constructedData?.[queryCollection]

        // Finish loading
        setLoading(false)
      } catch (err) {
        // Catch errors
        console.err(err)
        error.current = err
      }
    }
    let interval
    if (!config?.disableFetch) {
      if (config?.forceIntervalRefresh && config?.fetchInterval) {
        // Refetch data after interval
        fetchAllHandler()
        interval = setInterval(fetchAllHandler, config?.fetchInterval * 1000)
      } else {
        // Normal fetch
        fetchAllHandler()
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    models,
    queryCollection,
    defaultAdapter,
    queryHash,
    updateCache,
    getRefreshStatus,
    query,
    conditionals,
    config?.disableFetch,
    config?.disableConstruct,
    config?.disableCacheUpdate,
    config?.fetchInterval,
    config?.forceIntervalRefresh
  ])

  return [documents.current, loading, error.current]
}

export default useQuery
