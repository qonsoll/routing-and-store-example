import { useState, useEffect } from 'react'
import { useStore } from '../../../contexts/Store'

// Checks if model used in form is dirty or not
const useIsDirtyModel = ({ collectionPath, id }) => {
  const [isDirty, setIsDirty] = useState(false)
  const { store, getDirtyAttributes } = useStore()

  // Listening for updates in store and updating state
  useEffect(() => {
    setIsDirty(!!getDirtyAttributes({ store, collectionPath, id }))
  }, [store, collectionPath, id, getDirtyAttributes])

  return isDirty
}

export default useIsDirtyModel
