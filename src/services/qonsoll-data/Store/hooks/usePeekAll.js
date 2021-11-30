import useStore from '../useStore'
import { peekAll } from '../methods'

const usePeekAll = (query, config) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()

  peekAll(query, runtimeStorage, models)
}

export default usePeekAll
