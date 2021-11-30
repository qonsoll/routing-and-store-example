import { RuntimeCollection } from '../classes'

const execPeekCommands = (commands, runtimeStorage, models) => {
  let collection = null
  for (let i = 0; i < commands.length; i++) {
    const type = commands[i].type
    const value = commands[i].value
    if (type === 'createCollection' && !collection) {
      collection = new RuntimeCollection(value, models)
    } else {
      if (i === commands.length - 1) {
        const result = collection[type]({
          fieldPath: value,
          runtimeStorage,
          models
        })
        return result
      } else {
        collection[type]({ fieldPath: value, runtimeStorage, models })
      }
    }
  }
}

export default execPeekCommands
