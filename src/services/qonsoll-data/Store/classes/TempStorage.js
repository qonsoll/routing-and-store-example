import { docArrayToObject } from '../helpers'
import { findHasMany } from '../../RuntimeStorage/methods'

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

  peekAll({ command, runtimeStorage }) {
    const { collectionName, context } = command
    if (!context) {
      const documents = runtimeStorage.get(collectionName)
      this.data[collectionName] = documents
    }
    // TODO handle nested collection (not id ref)
  }

  peekBelongsTo({ command, runtimeStorage }) {
    const { field, collectionName, context } = command
    const contextIds = Object.keys(this.data[context])
    const documents = []
    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const id = this.data?.[context]?.[parentId]?.[field]
      const doc = runtimeStorage.get(`${collectionName}.${id}`)
      documents.push(doc)
    }
    this.data[collectionName] = docArrayToObject(documents)
  }

  peekHasMany({ command, runtimeStorage }) {
    const { field, collectionName, context } = command
    const contextIds = Object.keys(this.data[context])
    const documents = []

    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const ids = this.data?.[context]?.[parentId]?.[field]
      const promise = findHasMany(runtimeStorage, collectionName, ids)
      documents.push(promise)
    }
    this.data[collectionName] = docArrayToObject(documents.flat())
  }
}

export default TempStorage
