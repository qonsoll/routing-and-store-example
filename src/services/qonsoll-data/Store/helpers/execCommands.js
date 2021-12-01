// import { Collection } from '../classes'

// const execCommands = async (commands, adapter, models) => {
//   let collection = null
//   for (let i = 0; i < commands.length; i++) {
//     const type = commands[i].type
//     const value = commands[i].value
//     if (type === 'createCollection' && !collection) {
//       collection = new Collection(value, models)
//     } else {
//       if (i === commands.length - 1) {
//         const result = await collection[type]({
//           fieldPath: value,
//           adapter,
//           models
//         })
//         return result
//       } else {
//         await collection[type]({ fieldPath: value, adapter, models })
//       }
//     }
//   }
// }

import { TempStorage } from '../classes'

const execCommands = async (commands, adapter) => {
  const storage = new TempStorage()

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    const { task } = command
    await storage[task]({ command, adapter })
  }

  return storage.data
}

export default execCommands
