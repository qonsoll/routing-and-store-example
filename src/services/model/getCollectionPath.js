import pluralize from 'pluralize'

const getCollectionPath = (name) => {
  return pluralize(name)
}

export default getCollectionPath
