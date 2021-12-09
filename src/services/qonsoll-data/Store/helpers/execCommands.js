import { TempStorage } from '../classes'

/**
 * Method executes commands created by buildCommandsStack method
 * @param {array} commands array of commands
 * @param {object} adapter adapter to make requests to the database
 * @param {object} runtimeStorage instance of runtimeStorage
 * @returns {object}
 */
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
