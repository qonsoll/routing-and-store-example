import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

const findAll = async (query, adapter, models) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'findAll')
  console.log('🚀 ~ file: findAll.js ~ line 80 ~ findAll ~ commands', commands)

  const result = await execCommands(commands, adapter, models)
  console.log('🚀 ~ file: findAll.js ~ line 10 ~ findAll ~ result', result)

  return commands
}

export default findAll
