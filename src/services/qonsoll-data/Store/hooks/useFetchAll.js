import { useState, useRef, useEffect, useMemo } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import pluralize from 'pluralize'
import md5 from 'md5'
import useStore from '../useStore'
import useUpdateCache from './useUpdateCache'
import useGetRefreshStatus from './useGetRefreshStatus'
import { fetchAll, construct } from '../methods'

/**
 * Method helps to fetch all data by query from DB
 * @param {string} query graphql like query
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @param {string} disable property that disable fetching data
 * @returns [documents, loading, error]
 */

const useFetchAll = (query, config) => {
  // Extracting adapter and models from StoreContext
  const { defaultAdapter, models } = useStore()
  const [updateCache] = useUpdateCache()

  const queryHash = useMemo(() => query && md5(query), [query])
  const queryCollection = useMemo(
    () => query && pluralize(Object.keys(graphQlQueryToJson(query)?.query)[0]),
    [query]
  )
  const getRefreshStatus = useGetRefreshStatus()
  const documents = useRef([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const allFetcher = async () => {
      setLoading(true)

      const dbData = await fetchAll({ query, adapter: defaultAdapter, models })
      const constructedData = config?.disableConstruct
        ? dbData
        : construct(dbData, query, models)
      !config?.disableCacheUpdate && updateCache(queryHash, dbData)
      documents.current = constructedData?.[queryCollection]
      setLoading(false)
    }
    let interval
    if (!config?.disableFetch) {
      if (config?.forceIntervalRefresh && config?.fetchInterval) {
        allFetcher()
        interval = setInterval(allFetcher, config?.fetchInterval * 1000)
      } else {
        allFetcher()
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

  return [documents.current, loading]
}

export default useFetchAll
