import _ from 'lodash'

const findHasMany = (runtimeStorage, path, ids) => {
  const result = []

  ids.forEach((id) => {
    result.push(runtimeStorage.get(`${path}.${id}`))
  })

  return result
}

export default findHasMany
