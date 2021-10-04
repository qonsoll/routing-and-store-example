const addRecord = (state, payload) => {
  const stateCopy = state
  stateCopy.dirty = stateCopy.dirty || {}
  stateCopy.dirty[payload._typeOf] = stateCopy.dirty[payload._typeOf] || {}
  return {
    ...stateCopy,
    dirty: {
      ...stateCopy.dirty,
      [payload._typeOf]: {
        ...stateCopy.dirty[payload._typeOf],
        [payload._id]: payload
      }
    }
  }
}

export default addRecord
