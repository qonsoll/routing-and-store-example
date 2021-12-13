import { validate } from '../../Store/helpers'

const findHasMany = (runtimeStorage, path, ids) => {
  const result = []
  validate('findHasMany', path, ids)

  ids?.forEach((id) => {
    result.push(runtimeStorage.get(`structured.${path}.${id}`))
  })

  return result
}

export default findHasMany
