const createRecord = (state, payload) => {
  const stateCopy = state
  stateCopy[payload._typeOf] = stateCopy[payload._typeOf] || []
  return {
    ...stateCopy,
    [payload._typeOf]: [...stateCopy[payload._typeOf], payload]
  }
}

export default createRecord
