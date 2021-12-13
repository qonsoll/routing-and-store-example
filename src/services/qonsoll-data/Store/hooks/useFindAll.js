import { useRef, useMemo } from 'react'
import md5 from 'md5'
import useFetchAll from './useFetchAll'
import usePeekAll from './usePeekAll'
import useGetRefreshStatus from './useGetRefreshStatus'

/**
 * Method helps to find all data by query in cache or in DB
 * @param {string} query graphql like query
 * @param {object} config config object (fetchInterval: number, forceIntervalRefresh: boolean, construct: boolean)
 * @returns [documents, loading, error]
 */
const useFindAll = (query, config) => {
  const getRefreshStatus = useGetRefreshStatus()
  const queryHash = useMemo(() => query && md5(query), [query])
  const isRefreshAllowed = useMemo(
    () =>
      config?.fetchInterval
        ? getRefreshStatus(queryHash, config?.fetchInterval)
        : false,
    [queryHash, config?.fetchInterval, getRefreshStatus]
  )
  const [cachedDocuments, cacheLoading] = usePeekAll(query, {
    construct: config?.construct,
    disablePeek: config?.disablePeek
  })
  const [dbDocuments, loading, error] = useFetchAll(query, {
    disableFetch:
      (!isRefreshAllowed && (cacheLoading || Boolean(cachedDocuments))) ||
      config?.disableFetch,
    fetchInterval: config?.fetchInterval,
    forceIntervalRefresh: config?.forceIntervalRefresh,
    construct: config?.construct
  })
  const documents = useRef([])
  documents.current = dbDocuments?.length ? dbDocuments : cachedDocuments

  return [documents.current, loading, error]
}

export default useFindAll
