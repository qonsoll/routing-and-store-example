import { docArrayToObject } from '../helpers'

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
    const promises = []
    const contextIds = Object.keys(this.data[context])
    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const id = this.data?.[context]?.[parentId]?.[field]
      const promise = adapter.findBelongsTo(collectionName, id)
      promises.push(promise)
    }
    const documents = await Promise.all(promises)
    this.data[collectionName] = docArrayToObject(documents)
  }

  async findHasMany({ command, adapter }) {
    const { field, collectionName, context } = command
    const promises = []
    const contextIds = Object.keys(this.data[context])
    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const ids = this.data?.[context]?.[parentId]?.[field]
      const promise = adapter.findHasMany(collectionName, ids)
      promises.push(promise)
    }
    let documents = await Promise.all(promises)
    this.data[collectionName] = docArrayToObject(documents.flat())
  }
}

export default TempStorage
