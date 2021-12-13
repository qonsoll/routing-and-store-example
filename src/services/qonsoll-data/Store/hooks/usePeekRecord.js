import useStore from '../useStore'
import { peekRecord, construct } from '../methods'
import { useState, useEffect } from 'react'

const usePeekRecord = (query, config, disabled) => {
  const { runtimeStorage, models } = useStore()
  const [error] = useState(null)
  const [document, setDocuments] = useState([])

  useEffect(() => {
    const peekRecordFetcher = async () => {
      const data = await peekRecord({ query, runtimeStorage, models })
      const constructedData = construct(data, query, models)
      setDocuments(constructedData)
    }
    if (!disabled) peekRecordFetcher()
  }, [models, query, runtimeStorage, disabled])

  return [document, error]
}

export default usePeekRecord
