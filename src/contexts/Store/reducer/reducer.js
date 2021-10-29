import createRecord from './createRecord'
import removeCollection from './removeCollection'
import removeRecord from './removeRecord'
import updateCollection from './updateCollection'
import updateRecord from './updateRecord'
import destroyRecord from './destroyRecord'
import destroyDirty from './destroyDirty'
import filterRecords from './filterRecords'

const reducer = (state, action) => {
  const { type, payload } = action

  const actionsMap = {
    createRecord,
    destroyRecord,
    removeCollection,
    removeRecord,
    updateCollection,
    updateRecord,
    destroyDirty,
    filterRecords
  }
  return actionsMap[type](state, payload)
}

export default reducer
