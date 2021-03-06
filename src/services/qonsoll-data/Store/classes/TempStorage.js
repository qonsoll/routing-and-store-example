import { docArrayToObject } from '../helpers'
import { findHasMany } from '../../RuntimeStorage/methods'
import { validate } from '../helpers'

/**
 * @class TempStorage helps to collect data fetched from the DB
 * This class is using by execCommands
 */
class TempStorage {
  constructor() {
    this.data = {}
  }

  // Find all (get collection data)
  async findAll({ command, adapter }) {
    validate('findAll', {
      command,
      adapter
    })

    const { collectionName, context } = command
    if (!context) {
      const documents = await adapter.findAll(collectionName)
      if (documents.length) {
        this.data[collectionName] = docArrayToObject(documents)
      }
    }
  }

  // Fetch all
  async fetchAll({ command, adapter }) {
    validate('fetchAll', {
      command,
      adapter
    })

    const { collectionName, context } = command
    if (!context) {
      const documents = await adapter.findAll(collectionName)
      if (documents.length) {
        this.data[collectionName] = docArrayToObject(documents)
      }
    }
  }

  // Fetch record by id
  async fetchRecord({ command, adapter }) {
    validate('fetchRecord', {
      command,
      adapter
    })

    const { collectionName, args } = command
    validate('fetchRecord', {
      collectionName,
      args
    })

    const { id } = args
    const doc = await adapter.findRecord(collectionName, id)
    if (doc) {
      this.data[collectionName]
        ? (this.data[collectionName][id] = doc)
        : (this.data[collectionName] = { [id]: doc })
    }
  }

  // Find belongsTo relationship data
  async findBelongsTo({ command, adapter }) {
    validate('findBelongsTo', {
      command,
      adapter
    })

    const { field, collectionName, context } = command
    const promises = []
    const contextIds = this.data?.[context] && Object.keys(this.data[context])
    if (contextIds) {
      for (let i = 0; i < contextIds.length; i++) {
        const parentId = contextIds[i]
        const id = this.data?.[context]?.[parentId]?.[field]
        const promise = adapter.findBelongsTo(collectionName, id)
        promises.push(promise)
      }
      const documents = await Promise.all(promises)
      this.data[collectionName] = docArrayToObject(documents)
    }
  }

  // Find hasMany relationship data
  async findHasMany({ command, adapter }) {
    validate('findHasMany', {
      command,
      adapter
    })

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
    validate('peekAll', {
      command,
      runtimeStorage
    })

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
    validate('peekBelongsTo', {
      command,
      runtimeStorage
    })

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
    validate('peekHasMany', {
      command,
      runtimeStorage
    })

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
    validate('peekRecord', {
      command,
      runtimeStorage
    })

    const { collectionName, args } = command
    const { id } = args
    const doc = runtimeStorage.get(`structured.${collectionName}.${id}`)
    if (doc) {
      this.data[collectionName]
        ? (this.data[collectionName][id] = doc)
        : (this.data[collectionName] = { [id]: doc })
    }
  }

  // async fetchRecord({ command, adapter }) {
  //   validate('findRecord', {
  //     command,
  //     adapter
  //   })

  //   const { collectionName, args } = command
  //   validate('findRecord', {
  //     collectionName,
  //     args
  //   })

  //   const { id } = args
  //   const doc = await adapter.findRecord(collectionName, id)
  //   if (doc) {
  //     this.data[collectionName]
  //       ? (this.data[collectionName][id] = doc)
  //       : (this.data[collectionName] = { [id]: doc })
  //   }
  // }

  async query({ command, adapter, conditionals }) {
    validate('query', {
      command,
      adapter,
      conditionals
    })

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

    validate('filter', {
      command,
      runtimeStorage,
      conditionals
    })

    const { collectionName, context } = command

    if (!context) {
      const documents = runtimeStorage.get(`structured.${collectionName}`)
      if (documents) {
        this.data[collectionName] = {}
      }
      documents &&
        Object.keys(documents).forEach((id) => {
          conditionals.forEach((conditional) => {
            const [conditionalField, conditionalOperator, conditionalValue] =
              conditional

            validate('filter', {
              conditionalField,
              conditionalOperator,
              conditionalValue
            })

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
