import useStore from '../useStore'
import { useState, useRef, useEffect, useMemo } from 'react'
import { fetchRecord, construct } from '../methods'
import useUpdateCache from './useUpdateCache'
import useGetRefreshStatus from './useGetRefreshStatus'
import pluralize from 'pluralize'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import md5 from 'md5'

/**
 * Method helps to fetch record data by query from DB
 * @param {string} query graphql like query
 * @param {object} options options object
 * (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean, disableConstruct: boolean, disableCacheUpdate: boolean)
 * @returns [documents, loading, error]
 */
const useFetchRecord = (query, config) => {
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

  // Result document
  const document = useRef([])
  const error = useRef(cacheError)

  // Loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecordHandler = async () => {
      // Start loading
      setLoading(true)
      try {
        // Fetch record data from the DB using default adapter
        const dbData = await fetchRecord({
          query,
          adapter: defaultAdapter,
          models
        })

        // Construct data to the nested objects
        const constructedData = config?.disableConstruct
          ? dbData
          : construct(dbData, query, models)

        // Update cache
        !config?.disableCacheUpdate && updateCache(queryHash, dbData)

        // Update result document
        document.current = constructedData?.[queryCollection]

        // Finish loading
        setLoading(false)
      } catch (err) {
        // Catch errors
        console.error(err)
        error.current = err
      }
    }
    let interval
    if (!config?.disableFetch) {
      if (config?.forceIntervalRefresh && config?.fetchInterval) {
        console.log(config?.forceIntervalRefresh && config?.fetchInterval)
        // Refetch data after interval
        fetchRecordHandler()
        interval = setInterval(fetchRecordHandler, config?.fetchInterval * 1000)
      } else {
        // Normal fetch
        fetchRecordHandler()
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
    config?.disableFetch,
    config?.disableConstruct,
    config?.disableCacheUpdate,
    config?.fetchInterval,
    config?.forceIntervalRefresh
  ])

  return [document.current, loading, error.current]
}

export default useFetchRecord
