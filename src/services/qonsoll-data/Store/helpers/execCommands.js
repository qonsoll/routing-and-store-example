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
