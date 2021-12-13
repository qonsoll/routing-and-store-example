import traverse from 'traverse'
import pluralize from 'pluralize'

/**
 * Method helps to find relationship type between two models
 * @param {string} parent name of the parent model
 * @param {string} child name of the child model
 * @param {object} models app models
 * @returns {string}
 */
const getRelationshipType = (parent, child, models) => {
  const singularParentName = pluralize.singular(parent)
  return parent && child && models[singularParentName]?.fields[child]?.dataType
}

/**
 * Relationship type - method map
 */
const relationshipType = {
  peekAll: {
    belongsTo: 'peekBelongsTo',
    hasMany: 'peekHasMany'
  },
  peekRecord: {
    belongsTo: 'peekBelongsTo',
    hasMany: 'peekHasMany'
  },
  findAll: {
    belongsTo: 'findBelongsTo',
    hasMany: 'findHasMany'
  },
  findRecord: {
    belongsTo: 'findBelongsTo',
    hasMany: 'findHasMany'
  },
  fetchAll: {
    belongsTo: 'findBelongsTo',
    hasMany: 'findHasMany'
  },
  fetchRecord: {
    belongsTo: 'findBelongsTo',
    hasMany: 'findHasMany'
  },
  query: {
    belongsTo: 'findBelongsTo',
    hasMany: 'findHasMany'
  },
  filter: {
    belongsTo: 'peekBelongsTo',
    hasMany: 'peekHasMany'
  }
}

/**
 *
 * @param {object} queryJSON transformed query to the json format
 * @param {string} task global task that should be done (findAll, findRecord etc)
 * @param {object} models app models
 * @returns {array}
 */
const buildCommandsStack = (queryJSON, task, models) => {
  const commands = []
  let relationshipTypeTaskMap = {}
  /**
   * Deep reading of queryJSON and searching for relationships
   */
  traverse(queryJSON).forEach(function () {
    // traverse method produces "bug" with empty state on first iteration
    const isValidPath = this.path.length > 0
    if (isValidPath) {
      // Entry collection will first
      const isEntryCollection = this.path.length === 1

      // Get correct collectionName (pluralized)
      const collectionName = pluralize(this.path[0])

      if (isEntryCollection) {
        // Push entry command (like findAll, findRecord)
        commands.push({
          task,
          collectionName,
          field: this.key,
          context: false,
          args: this.node?.__args || null
        })
        relationshipTypeTaskMap = relationshipType[task]
      } else {
        // Push relationship command
        const context = pluralize(this.path[this.path.length - 2])
        const relationshipType = getRelationshipType(context, this.key, models)
        const task = relationshipTypeTaskMap[relationshipType]
        const collectionName = task && pluralize(this.key)

        task &&
          commands.push({ task, collectionName, field: this.key, context })
      }
    }
  })

  return commands
}

export default buildCommandsStack
