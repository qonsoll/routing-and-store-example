import { TempStorage } from '../classes'

const execCommands = async ({
  commands,
  adapter,
  runtimeStorage,
  conditionals
}) => {
  const storage = new TempStorage()

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    const { task } = command
    await storage[task]({ command, adapter, runtimeStorage, conditionals })
  }

  return storage.data
}

export default execCommands
