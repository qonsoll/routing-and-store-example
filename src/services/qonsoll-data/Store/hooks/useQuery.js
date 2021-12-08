import useStore from '../useStore'
import { peekAll, construct, queries } from '../methods'
import { useState, useEffect } from 'react'

const useQuery = (query, config) => {
  const { runtimeStorage, adapter, models } = useStore()
  const [error] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const queriesFetcher = async () => {
      const dbData = await queries({ query, runtimeStorage, models })
    }
  }, [])
}

export default useQuery
