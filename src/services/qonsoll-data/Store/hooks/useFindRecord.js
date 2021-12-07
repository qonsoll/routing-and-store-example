import { useState, useEffect } from 'react'
import useStore from '../useStore'
import { findRecord, peekRecord, construct } from '../methods'

const useFindRecord = (query, options) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error] = useState(null)

  useEffect(() => {
    const smartDataFetcher = async () => {
      const cachedData = await peekRecord({ query, runtimeStorage, models })
      console.log('Take from cache')
      const constructedData = construct(cachedData, query, models)
      setDocument(constructedData)
      console.log(constructedData)
    }

    smartDataFetcher()
  }, [models, query, runtimeStorage])

  return [document, loading, error]
}

export default useFindRecord
