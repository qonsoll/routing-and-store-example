import { useState, useEffect, useCallback } from 'react'
import useStore from '../useStore'
import { findAll, peekAll, construct } from '../methods'
import md5 from 'md5'

/**
 * Method helps to find all data by query in cache or in DB
 * @param {string} query graphql like query
 * @param {object} options options object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @returns [documents, loading, error]
 */
const useFindAll = (query, options) => {
  // Extracting runtimeStorage, adapter and models from StoreContext
  const { runtimeStorage, defaultAdapter, models } = useStore()

  // Values (state) that should be returned
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Method that helps to peek cached data if them exist and structure
  // in different ways (as in DB, or nested object)
  const peekCachedData = useCallback(async () => {
    // Using peekAll algorithm based on runtimeStorage peek method
    const cachedData = await peekAll({ query, runtimeStorage, models }).catch(
      (err) => {
        console.error(err)
        setError(err)
      }
    )

    // Decide how to return data (as in DB or as nested object)
    const constructedData =
      options?.construct === undefined || options?.construct === true
        ? construct(cachedData, query, models)
        : cachedData

    return constructedData
  }, [models, query, runtimeStorage, options.construct])

  // Method helps to fetch data from the database
  const fetchDBData = useCallback(async () => {
    // Using findAll algorithm, based on adapter findAll method
    const dbData = await findAll({
      query,
      adapter: defaultAdapter,
      models,
      options: {
        construct: false
      }
    }).catch((err) => {
      console.error(err)
      setError(err)
    })

    // Decide how to return data (as in DB or as nested object)
    const constructedData =
      options?.construct === undefined || options?.construct === true
        ? construct(dbData, query, models)
        : dbData

    return { dbData, constructedData }
  }, [models, query, defaultAdapter, options.construct])

  // Method helps to update current state of runtimeStorage
  const updateCache = useCallback(
    async (queryHash, dbData) => {
      try {
        // Deep updating of the current state of the storage
        runtimeStorage.deepUpdate({ structured: dbData })
        // Updating meta data (when request was made)
        runtimeStorage.update(
          `queries.${queryHash}.requestedAt`,
          new Date().getTime()
        )
      } catch (err) {
        console.error(err)
        setError(err)
      }
    },
    [runtimeStorage]
  )

  // Method helps to get info about request time diff
  const getRefreshStatus = useCallback(
    (queryHash, fetchInterval) => {
      if (fetchInterval) {
        // Get from runtime storage info about last request
        const lastTimeRequestedAt = runtimeStorage.get(
          `queries.${queryHash}.requestedAt`
        )
        if (lastTimeRequestedAt) {
          const timeNow = new Date().getTime()
          const timeDiff = lastTimeRequestedAt && timeNow - lastTimeRequestedAt
          const fetchIntervalMs = fetchInterval && fetchInterval * 1000

          // Check if refetch allowed
          const isRefetchAllowed = fetchInterval && timeDiff > fetchIntervalMs

          return isRefetchAllowed
        } else {
          return false
        }
      } else {
        return false
      }
    },
    [runtimeStorage]
  )

  // This method helps to peek or fetch data by query
  const smartFetch = useCallback(
    async (params) => {
      // Generating md5 hash from query
      const queryHash = md5(query)

      // Check if there are query meta data in runtime storage
      const isQueryCached = Boolean(runtimeStorage.get(`queries.${queryHash}`))

      // Check if refresh allowed
      const isRefreshAllowed = getRefreshStatus(
        queryHash,
        options.fetchInterval
      )

      let constructedData = {}

      // Peek or fetch depends on conditions
      if (isQueryCached && !isRefreshAllowed) {
        constructedData = await peekCachedData().catch((err) => {
          console.error(err)
          setError(err)
        })
      } else {
        // Don't show spinner onRefetch
        !params?.disableSpinner && setLoading(true)

        const data = await fetchDBData().catch((err) => {
          console.error(err)
          setError(err)
        })

        // Updating cache
        updateCache(queryHash, data?.dbData)
        constructedData = data.constructedData
        !params?.disableSpinner && setLoading(false)
      }

      // Updating local state
      setDocuments(constructedData)
    },
    [
      fetchDBData,
      getRefreshStatus,
      options.fetchInterval,
      peekCachedData,
      query,
      runtimeStorage,
      updateCache
    ]
  )

  // UseEffect helps to fetch data with interval or fetch only once
  useEffect(() => {
    let interval
    if (options?.forceIntervalRefresh && options?.fetchInterval) {
      // Initial fetching
      smartFetch()

      // Interval fetching (will be triggered in fetchInterval seconds)
      interval = setInterval(() => {
        smartFetch({ disableSpinner: true })
      }, options?.fetchInterval * 1000)
    } else {
      smartFetch()
    }

    return () => {
      clearInterval(interval)
    }
  }, [options.forceIntervalRefresh, options.fetchInterval, smartFetch])

  return [documents, loading, error]
}

export default useFindAll
