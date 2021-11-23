import { useState, useEffect } from 'react'
import useStore from '../useStore'

// Checks if model used in form is dirty or not
const useIsDirtyModel = ({ modelName, recordData }) => {
  const [isDirty, setIsDirty] = useState(false)
  const { store, getDirtyAttributes } = useStore()

  // Listening for updates in store and updating state
  useEffect(() => {
    setIsDirty(!!getDirtyAttributes({ store, modelName, ...recordData }))
  }, [store, recordData, getDirtyAttributes, modelName])

  return isDirty
}

export default useIsDirtyModel
