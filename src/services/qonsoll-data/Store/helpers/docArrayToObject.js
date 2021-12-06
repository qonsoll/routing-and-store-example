const docArrayToObject = (docs, customValue) => {
  const result = {}
  if (docs) {
    docs.forEach((doc) => {
      result[doc?.id || doc?.data?.id] = customValue || doc
    })
  }
  return result
}

export default docArrayToObject
