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
      if (documents.length) {
        this.data[collectionName] = docArrayToObject(documents)
      }
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
      if (documents) {
        this.data[collectionName] = documents
      }
    }
    // TODO handle nested collection (not id ref)
  }

  peekBelongsTo({ command, runtimeStorage }) {
    const { field, collectionName, context } = command
    const contextIds =
      (this.data?.[context] && Object.keys(this.data[context])) || 0
    const documents = []
    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const id = this.data?.[context]?.[parentId]?.[field]
      const doc = runtimeStorage.get(`${collectionName}.${id}`)
      documents.push(doc)
    }

    if (documents.length) {
      this.data[collectionName] = docArrayToObject(documents)
    }
  }

  peekHasMany({ command, runtimeStorage }) {
    const { field, collectionName, context } = command
    const contextIds =
      (this.data?.[context] && Object.keys(this.data[context])) || 0
    const documents = []

    for (let i = 0; i < contextIds.length; i++) {
      const parentId = contextIds[i]
      const ids = this.data?.[context]?.[parentId]?.[field]
      const promise = findHasMany(runtimeStorage, collectionName, ids)
      documents.push(promise)
    }

    if (documents.length) {
      this.data[collectionName] = docArrayToObject(documents.flat())
    }
  }

  peekRecord({ command, runtimeStorage }) {
    console.log(
      '🚀 ~ file: TempStorage.js ~ line 94 ~ TempStorage ~ peekRecord ~ runtimeStorage',
      runtimeStorage.state
    )
    const { collectionName, id } = command
    console.log('PeekRecord data ', collectionName, id)
    console.log(runtimeStorage)
    const doc = runtimeStorage.state.users
    console.log('Document', doc)
    if (document) this.data[collectionName] = doc
  }
}

export default TempStorage
