import { useState, useEffect } from 'react'
import useStore from '../useStore'
import { findAll, peekAll, construct } from '../methods'

const useFindAll = (query, options) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error] = useState(null)

  useEffect(() => {
    const smartDataFetcher = async () => {
      const cachedData = await peekAll({ query, runtimeStorage, models })
      if (Object.values(cachedData).length) {
        console.log('take from cache 🔥')
        const constructedData = construct(cachedData, query, models)
        setDocuments(constructedData)
      } else {
        setLoading(true)
        const dbData = await findAll({
          query,
          adapter: defaultAdapter,
          models,
          options: {
            construct: false
          }
        })
        console.log('loading data 🔥')
        const constructedData = construct(dbData, query, models)
        setDocuments(constructedData)
        setLoading(false)
        if (dbData) {
          runtimeStorage.deepUpdate(dbData)
          console.log(runtimeStorage)
        }
      }
    }
    smartDataFetcher()
  }, [query, defaultAdapter, runtimeStorage, models])

  return [documents, loading, error]
}

export default useFindAll
