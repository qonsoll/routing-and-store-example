import traverse from 'traverse'
import pluralize from 'pluralize'

// const buildCommandsStack2 = (queryJSON, task, models) => {
//   const commands = []
//   traverse(queryJSON).forEach(function () {
//     const isValidPath = this.path.length > 0
//     if (isValidPath) {
//       const isEntryCollection = this.path.length === 1
//       const collectionName = pluralize(this.path[0])
//       if (isEntryCollection) {
//         commands.push({
//           type: 'createCollection',
//           value: collectionName
//         })
//         commands.push({ type: task })
//       } else {
//         this.path.shift()
//         commands.push({ type: 'useField', value: this.path.join('.') })
//       }
//     }
//   })
//   commands.push({
//     type: 'getResult'
//   })
//   return commands
// }

const getRelationshipType = (parent, child, models) => {
  const singularParentName = pluralize.singular(parent)
  return parent && child && models[singularParentName]?.fields[child]?.dataType
}

const buildCommandsStack = (queryJSON, task, models) => {
  const commands = []
  traverse(queryJSON).forEach(function () {
    const isValidPath = this.path.length > 0
    if (isValidPath) {
      const isEntryCollection = this.path.length === 1
      const collectionName = pluralize(this.path[0])
      if (isEntryCollection) {
        commands.push({ task, collectionName, field: this.key, context: false })
      } else {
        const context = pluralize(this.path[this.path.length - 2])
        const relationshipType = getRelationshipType(context, this.key, models)
        const relationshipTypeTaskMap = {
          belongsTo: 'findBelongsTo',
          hasMany: 'findHasMany'
        }
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
