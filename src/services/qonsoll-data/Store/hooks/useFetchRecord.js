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
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @param {string} disable property that disable fetching data
 * @returns [documents, loading, error]
 */
const useFetchRecord = (query, config) => {
  // Extracting adapter and models from StoreContext
  const { defaultAdapter, models } = useStore()
  const [updateCache] = useUpdateCache()

  const queryHash = useMemo(() => query && md5(query), [query])
  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )
  const getRefreshStatus = useGetRefreshStatus()
  const document = useRef([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const recordFetcher = async () => {
      setLoading(true)

      const dbData = await fetchRecord({
        query,
        adapter: defaultAdapter,
        models
      })
      const constructedData = config?.disableConstruct
        ? dbData
        : construct(dbData, query, models)
      !config?.disableCacheUpdate && updateCache(queryHash, dbData)
      document.current = constructedData?.[queryCollection]
      setLoading(false)
    }
    let interval
    if (!config?.disableFetch) {
      if (config?.forceIntervalRefresh && config?.fetchInterval) {
        recordFetcher()
        interval = setInterval(recordFetcher, config?.fetchInterval * 1000)
      } else {
        recordFetcher()
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

  return [document.current, loading]
}

export default useFetchRecord
