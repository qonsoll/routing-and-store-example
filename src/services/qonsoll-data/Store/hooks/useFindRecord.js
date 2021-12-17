import { useMemo, useState, useEffect } from 'react'
import md5 from 'md5'
import usePeekRecord from './usePeekRecord'
import useFetchRecord from './useFetchRecord'
import useGetRefreshStatus from './useGetRefreshStatus'

/**
 * Method helps to find record data by query in cache or in DB
 * @param {string} query graphql like query
 * @param {object} config config object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @returns [document, loading, error]
 */
const useFindRecord = (query, config) => {
  const [document, setDocument] = useState([])
  const getRefreshStatus = useGetRefreshStatus()
  const queryHash = useMemo(() => query && md5(query), [query])
  const isRefreshAllowed = useMemo(
    () =>
      config?.fetchInterval
        ? getRefreshStatus(queryHash, config?.fetchInterval)
        : false,
    [queryHash, config?.fetchInterval, getRefreshStatus]
  )
  const [cachedDocument, cacheLoading] = usePeekRecord(query, {
    construct: config?.construct,
    disablePeek: config?.disablePeek
  })

  const [dbDocument, loading, error] = useFetchRecord(query, {
    disableFetch:
      (!isRefreshAllowed && (cacheLoading || Boolean(cachedDocument))) ||
      config?.disableFetch,
    fetchInterval: config?.fetchInterval,
    forceIntervalRefresh: config?.forceIntervalRefresh,
    construct: config?.construct
  })

  useEffect(() => {
    setDocument(dbDocument?.length ? dbDocument?.[0] : cachedDocument?.[0])
  }, [cachedDocument, dbDocument, query])

  return [document, loading, error]
}

export default useFindRecord
