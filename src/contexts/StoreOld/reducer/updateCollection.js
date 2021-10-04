const updateCollection = (state, payload) => {
  const { collection, data } = payload
  return {
    ...state,
    [collection]: data
  }
}

export default updateCollection
