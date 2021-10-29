import { RECORD_TYPES } from '../__constants__'
import { firestoreService } from 'services/firebase'

const { ORDERED, STRUCTURED } = RECORD_TYPES
const { queryDocuments } = firestoreService

const useFilterRecords = (state, dispatch) => {
  const filterRecords = async (collectionPath, params) => {
    const filteredRecords = []
    const conditions = { ...params }

    const query = await queryDocuments(collectionPath, [['age', '==', '23']])
    console.log(query)

    // Object.keys(conditions).map((item) => {
    //   if (item.includes('.')) {
    //     const fields = item.split('.')
    //     Object.keys(conditions[item]).map((cond) => {
    //       state[ORDERED][collectionPath].map((object) => {
    //         console.log(fields)
    //         console.log(
    //           object[fields[0]][fields[1]] + cond + conditions[item][cond]
    //         )
    //         if (
    //           eval(object[fields[0]][fields[1]] + cond + conditions[item][cond])
    //         )
    //           filteredRecords.push(object)
    //       })
    //     })
    //   } else {
    //     Object.keys(conditions[item]).map((cond) => {
    //       state[ORDERED][collectionPath].map((object) => {
    //         console.log(object[item] + cond + conditions[item][cond])
    //         if (eval(object[item] + cond + conditions[item][cond]))
    //           filteredRecords.push(object)
    //       })
    //     })
    //   }
    // })
  }

  return filterRecords
}

export default useFilterRecords
