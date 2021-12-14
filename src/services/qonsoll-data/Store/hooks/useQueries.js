import { peekAll, peekRecord, findAll, findRecord, construct } from '../methods'

const useQueries = (query) => {
  return { peekAll, peekRecord, findAll, findRecord, construct }
}

export default useQueries
