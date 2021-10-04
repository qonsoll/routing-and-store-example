import addRecord from './addRecord'
import updateRecord from './updateRecord'
import createRecord from './createRecord'
import removeRecord from './removeRecord'
import updateCollection from './updateCollection'

const storeReducer = (state, action) => {
  const { type, payload } = action
  const actionsMap = {
    addRecord,
    createRecord,
    updateCollection,
    removeRecord,
    updateRecord
  }

  return actionsMap[type](state, payload)
}

export default storeReducer
