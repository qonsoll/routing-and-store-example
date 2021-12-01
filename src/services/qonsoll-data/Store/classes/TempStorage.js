import { docArrayToObject } from '../helpers'
import pluralize from 'pluralize'
// import _ from 'lodash'

class TempStorage {
  constructor() {
    this.data = {}
  }
  async findAll({ command, adapter }) {
    const { collectionName, context } = command
    if (!context) {
      const documents = await adapter.findAll(collectionName)
      this.data[collectionName] = docArrayToObject(documents)
    }
    // TODO handle nested collection (not id ref)
  }

  async findBelongsTo({ command, adapter }) {
    const { field, collectionName, context } = command
    console.log(
      '🚀 ~ file: TempStorage.js ~ line 19 ~ TempStorage ~ findBelongsTo ~ command',
      command
    )
    const promises = []
    const contextIds = Object.keys(this.data[context])
    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const id = this.data[context][parentId][field]
      const promise = adapter.findBelongsTo(collectionName, id)
      promises.push(promise)
    }
    const documents = await Promise.all(promises)
    console.log(
      '🚀 ~ file: TempStorage.js ~ line 39 ~ TempStorage ~ findBelongsTo ~ documents',
      documents
    )
    this.data[collectionName] = docArrayToObject(documents)
    console.log('--->>>>', this.data)
  }

  async findHasMany({ command, adapter }) {
    const { field, collectionName, context } = command
    const promises = []
    const contextIds = Object.keys(this.data[context])
    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const ids = this.data[context][parentId][field]
      const promise = adapter.findHasMany(collectionName, ids)
      promises.push(promise)
    }
    const documents = await Promise.all(promises)
    console.log(
      '🚀 ~ file: TempStorage.js ~ line 52 ~ TempStorage ~ findHasMany ~ documents',
      documents
    )
    this.data[collectionName] = docArrayToObject(documents.flat())
  }
}

export default TempStorage
