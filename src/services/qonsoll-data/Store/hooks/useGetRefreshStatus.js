import { useCallback } from 'react'
import useStore from '../useStore'

const useGetRefreshStatus = () => {
  const { runtimeStorage } = useStore()
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
          return true
        }
      } else {
        return true
      }
    },
    [runtimeStorage]
  )

  return getRefreshStatus
}

export default useGetRefreshStatus
