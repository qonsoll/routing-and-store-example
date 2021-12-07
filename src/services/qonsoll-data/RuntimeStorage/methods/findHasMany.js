const findHasMany = (runtimeStorage, path, ids) => {
  const result = []

  ids.forEach((id) => {
    result.push(runtimeStorage.get(`structured.${path}.${id}`))
  })

  return result
}

export default findHasMany
