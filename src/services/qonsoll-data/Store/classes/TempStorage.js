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
      const documents = runtimeStorage.get(`structured.${collectionName}`)
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
      const doc = runtimeStorage.get(`structured.${collectionName}.${id}`)
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
    const { collectionName, args } = command
    const { id } = args
    const doc = runtimeStorage.get(`structured.${collectionName}.${id}`)
    if (doc) {
      this.data[collectionName]
        ? (this.data[collectionName][id] = doc)
        : (this.data[collectionName] = { [id]: doc })
    }
  }

  async findRecord({ command, adapter }) {
    const { collectionName, args } = command
    const { id } = args
    const doc = await adapter.findRecord(collectionName, id)
    if (doc) {
      this.data[collectionName]
        ? (this.data[collectionName][id] = doc)
        : (this.data[collectionName] = { [id]: doc })
    }
  }

  async query({ command, adapter, conditionals }) {
    const { collectionName } = command
    const queriedDocuments = await adapter.queryRecords(
      collectionName,
      conditionals
    )
    this.data[collectionName] = docArrayToObject(queriedDocuments)
  }

  filter({ command, runtimeStorage, conditionals }) {
    const conditionalsOperators = {
      '>': (field, value) => (field > value ? true : false),
      '>=': (field, value) => (field >= value ? true : false),
      '<': (field, value) => (field < value ? true : false),
      '<=': (field, value) => (field <= value ? true : false),
      '!=': (field, value) => (field !== value ? true : false),
      '==': (field, value) => (field === value ? true : false)
    }

    const { collectionName, context } = command

    if (!context) {
      const documents = runtimeStorage.get(`structured.${collectionName}`)
      if (documents) {
        this.data[collectionName] = {}
      }
      Object.keys(documents).forEach((id) => {
        conditionals.forEach((conditional) => {
          const [conditionalField, conditionalOperator, conditionalValue] =
            conditional
          if (
            conditionalsOperators[conditionalOperator](
              documents[id][conditionalField],
              conditionalValue
            )
          )
            this.data[collectionName][id] = documents[id]
        })
      })
    }
  }
}

export default TempStorage
