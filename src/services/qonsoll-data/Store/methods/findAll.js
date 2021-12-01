import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

const findAll = async (query, adapter, models) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'findAll', models)
  console.log('🚀 ~ file: findAll.js ~ line 80 ~ findAll ~ commands', commands)

  const result = await execCommands(commands, adapter)
  console.log(
    '🚀 ~ file: findAll.js ~ line 10 ~ findAll ~ result',
    JSON.stringify(result)
  )

  return result
}

export default findAll
