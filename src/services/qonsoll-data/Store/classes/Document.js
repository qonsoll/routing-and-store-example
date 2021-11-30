import _ from 'lodash'
import pluralize from 'pluralize'
import { docArrayToObject } from '../helpers'

class Document {
  constructor(data) {
    this.data = data
  }

  async fetchBelongsTo(path, id, adapter) {
    const document = await adapter.findRecord(path, id)
    return document
  }

  async fetchHasMany(path, ids, adapter) {
    const documents = await adapter.findHasMany(path, ids)
    return documents
  }

  async getField({ fieldPath, adapter, collectionName, models }) {
    const path = fieldPath.split('.')
    const fieldName = path[path.length - 1]
    const parentName = path[path.length - 2]
    const relationshipType = models.getRelationshipType(
      parentName || collectionName,
      fieldName
    )
    if (relationshipType === 'belongsTo') {
      const document = await this.fetchBelongsTo(
        pluralize(fieldName),
        _.get(this.data, fieldPath),
        adapter
      )
      _.set(this.data, fieldPath, document)
      return document
    } else if (relationshipType === 'hasMany') {
      const documents = await this.fetchHasMany(
        pluralize(fieldName),
        _.get(this.data, fieldPath),
        adapter
      )
      _.set(this.data, fieldPath, docArrayToObject(documents))
      return documents
    } else {
      return _.get(this.data, fieldPath)
    }
  }
}

export default Document
