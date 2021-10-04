import createRecord from './createRecord'
import removeCollection from './removeCollection'
import removeRecord from './removeRecord'
import updateCollection from './updateCollection'
import updateRecord from './updateRecord'

const reducer = (state, action) => {
  const { type, payload } = action

  const actionsMap = {
    createRecord,
    removeCollection,
    removeRecord,
    updateCollection,
    updateRecord
  }

  return actionsMap[type](state, payload)
}

export default reducer
