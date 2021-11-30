import _ from 'lodash'
import pluralize from 'pluralize'
import { docArrayToObject } from '../helpers'
import { findHasMany } from '../../RuntimeStorage/hooks'

class RuntimeDocument {
  constructor(data) {
    this.data = data
  }

  fetchBelongsTo(path, id, runtimeStorage) {
    const document = runtimeStorage.get(`${path}.${id}`)
    return document
  }

  async fetchHasMany(path, ids, runtimeStorage) {
    const documents = findHasMany(runtimeStorage, path, ids)
    return documents
  }

  getField({ fieldPath, runtimeStorage, collectionName, models }) {
    const path = fieldPath.split('.')
    const fieldName = path[path.length - 1]
    const parentName = path[path.length - 2]
    const relationshipType = models.getRelationshipType(
      parentName || collectionName,
      fieldName
    )
    if (relationshipType === 'belongsTo') {
      const document = this.fetchBelongsTo(
        pluralize(fieldName),
        _.get(this.data, fieldPath),
        runtimeStorage
      )
      _.set(this.data, fieldPath, document)
      return document
    } else if (relationshipType === 'hasMany') {
      const documents = this.fetchHasMany(
        pluralize(fieldName),
        _.get(this.data, fieldPath),
        runtimeStorage
      )
      _.set(this.data, fieldPath, docArrayToObject(documents))
      return documents
    } else {
      return _.get(this.data, fieldPath)
    }
  }
}

export default RuntimeDocument
