import { usePeekAll, usePeekRecord, useFindAll, useFindRecord } from '../hooks'

const useQueries = () => {
  return { usePeekAll, usePeekRecord, useFindAll, useFindRecord }
}

export default useQueries
