const destroyRecord = (state, payload) => {
  const { collectionPath, id } = payload

  // Creating copy of the state
  const stateCopy = JSON.parse(JSON.stringify(state))

  // Check existing user
  if (stateCopy.structured[collectionPath][id]) {
    delete stateCopy.structured[collectionPath][id]
    stateCopy.ordered[collectionPath] = stateCopy.ordered[
      collectionPath
    ].filter((item) => item.id !== id)
  }

  return { ...stateCopy }
}

export default destroyRecord
