const removeRecord = (state, payload) => {
  const { collection, id } = payload
  const stateCopy = state
  const recordIndex = stateCopy[collection].findIndex(
    (record) => record._id === id
  )
  stateCopy[collection].splice(recordIndex, 1)
  return {
    ...stateCopy,
    [collection]: [...stateCopy[collection]]
  }
}

export default removeRecord
