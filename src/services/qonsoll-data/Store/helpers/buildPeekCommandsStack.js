import traverse from 'traverse'
import pluralize from 'pluralize'

const buildPeekCommandsStack = (queryJSON, task) => {
  const commands = []
  traverse(queryJSON).forEach(function () {
    const isValidPath = this.path.length > 0
    if (isValidPath) {
      const isEntryCollection = this.path.length === 1
      const collectionName = pluralize(this.path[0])
      if (isEntryCollection) {
        commands.push({
          type: 'createCollection',
          value: collectionName
        })
        commands.push({ type: task })
      } else {
        this.path.shift()
        commands.push({ type: 'useField', value: this.path.join('.') })
      }
    }
  })
  commands.push({
    type: 'getResult'
  })
  return commands
}

export default buildPeekCommandsStack
