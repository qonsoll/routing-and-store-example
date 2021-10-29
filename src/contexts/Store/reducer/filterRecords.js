const filterRecords = (state, payload) => {
  const { filteredRecords, collectionPath } = payload

  const stateCopy = { ...state }
  state.filtered = {}
  stateCopy.filtered[collectionPath] = filteredRecords

  return { ...stateCopy }
}

export default filterRecords
