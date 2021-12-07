import { useState, useEffect, useCallback } from 'react'
import useStore from '../useStore'
import { findAll, peekAll, construct } from '../methods'
import md5 from 'md5'

const useFindAll = (query, options) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error] = useState(null)

  const peekCachedData = useCallback(async () => {
    const cachedData = await peekAll({ query, runtimeStorage, models })
    const constructedData =
      options?.construct === undefined || options?.construct === true
        ? construct(cachedData, query, models)
        : cachedData
    return constructedData
  }, [models, query, runtimeStorage, options.construct])

  const fetchDBData = useCallback(async () => {
    const dbData = await findAll({
      query,
      adapter: defaultAdapter,
      models,
      options: {
        construct: false
      }
    })
    const constructedData =
      options?.construct === undefined || options?.construct === true
        ? construct(dbData, query, models)
        : dbData
    return { dbData, constructedData }
  }, [models, query, defaultAdapter, options.construct])

  const updateCache = useCallback(
    async (queryHash, dbData) => {
      runtimeStorage.deepUpdate({ structured: dbData })
      runtimeStorage.update(
        `queries.${queryHash}.requestedAt`,
        new Date().getTime()
      )
      console.log(runtimeStorage)
    },
    [runtimeStorage]
  )

  const getRefreshStatus = useCallback(
    (queryHash, fetchInterval) => {
      if (fetchInterval) {
        const lastTimeRequestedAt = runtimeStorage.get(
          `queries.${queryHash}.requestedAt`
        )
        if (lastTimeRequestedAt) {
          const timeNow = new Date().getTime()
          const timeDiff = lastTimeRequestedAt && timeNow - lastTimeRequestedAt
          const fetchIntervalMs = fetchInterval && fetchInterval * 1000
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

  const smartFetch = useCallback(
    async (params) => {
      const queryHash = md5(query)
      const isQueryCached = Boolean(runtimeStorage.get(`queries.${queryHash}`))
      const isRefreshAllowed = getRefreshStatus(
        queryHash,
        options.fetchInterval
      )
      let constructedData = {}
      if (isQueryCached && !isRefreshAllowed) {
        constructedData = await peekCachedData()
      } else {
        !params?.disableSpinner && setLoading(true)
        const data = await fetchDBData()
        updateCache(queryHash, data?.dbData)
        constructedData = data.constructedData
        !params?.disableSpinner && setLoading(false)
      }
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

  useEffect(() => {
    let interval
    if (options?.forceIntervalRefresh && options?.fetchInterval) {
      smartFetch()
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
