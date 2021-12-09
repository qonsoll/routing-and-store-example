import useStore from '../useStore'
import { peekAll, construct } from '../methods'
import { useState, useEffect } from 'react'

const useFilter = (query, options, conditionals) => {
  const { runtimeStorage, adapter, models } = useStore()
  const [error] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const peekAllFetcher = async () => {
      const dbData = await peekAll({ query, runtimeStorage, models })

      const constructedData = construct(dbData, query, models)
      setDocuments(constructedData)
    }
    peekAllFetcher()
  }, [models, query, runtimeStorage, adapter])

  return [documents, error]
}

export default useFilter
