import { useState, useEffect } from 'react'
import useLocalStorage from '../useLocalStorage'

/**
 * Subscribe to the Local Storage updates
 * @param {string} path - path to the document
 */
const useListenLocalStorage = (storage, path) => {
  // Get storage current state
  // Local state
  const [localStorage, setLocalStorage] = useState(storage?.state)

  useEffect(() => {
    // Subscribing to the storage updates
    storage.subscribe((updatedPath, newState) => {
      // Validating path that user subscribed to
      const isPathMatches =
        path && (path === updatedPath || updatedPath.includes(path))

      // Updating local storage with new values
      setLocalStorage(isPathMatches ? storage.get(path) : newState)
    })

    return () => {
      storage.unsubscribe()
    }
  }, [path, storage])

  return localStorage
}

export default useListenLocalStorage
