import useStore from '../useStore'
import { peekAll, construct } from '../methods'
import { useState, useEffect } from 'react'

const usePeekAll = (query, config, disabled) => {
  const { runtimeStorage, models } = useStore()
  const [error] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const peekAllFetcher = async () => {
      const dbData = await peekAll({ query, runtimeStorage, models })

      const constructedData = construct(dbData, query, models)
      setDocuments(constructedData)
    }
    if (!disabled) peekAllFetcher()
  }, [models, query, runtimeStorage, disabled])

  return [documents, error]
}

export default usePeekAll
