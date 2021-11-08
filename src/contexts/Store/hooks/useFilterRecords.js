import { firestoreService } from 'services/firebase'
import { RECORD_TYPES } from '../__constants__'

const { DIRTY, ORDERED, STRUCTURED } = RECORD_TYPES
const { queryDocuments } = firestoreService

const above = (object, field, value) => {
  return object[field] > value ? true : false
}

const aboveEqual = (object, field, value) => {
  return object[field] >= value ? true : false
}

const less = (object, field, value) => {
  return object[field] < value ? true : false
}

const lessEqual = (object, field, value) => {
  return object[field] <= value ? true : false
}

const equal = (object, field, value) => {
  return object[field] === value ? true : false
}

const notEqual = (object, field, value) => {
  return object[field] !== value ? true : false
}

const filterCollection = (state, collectionPath, params) => {
  console.log(state)
  const filteredItems = []

  const logicOperands = {
    '>': above,
    '<': less,
    '>=': aboveEqual,
    '<=': lessEqual,
    '==': equal,
    '!=': notEqual
  }

  params.map((item) => {
    state[ORDERED][collectionPath].map((object) => {
      if (logicOperands[item[1]](object, item[0], item[2]))
        filteredItems.push(object)
    })
  })

  return filteredItems
}

const useFilterRecords = (state, dispatch) => {
  const filterRecords = async (collectionPath, params) => {
    const filteredRecords = await queryDocuments(collectionPath, [...params])
    const payload = {
      filteredRecords,
      collectionPath
    }
    dispatch({ type: 'filterRecords', payload })
    const filteredElements = filterCollection(state, collectionPath, [
      ...params
    ])
    console.log(filteredElements)
  }
  return filterRecords
}

export default useFilterRecords
