import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

const peekAll = async ({ query, runtimeStorage, models }) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'peekAll', models)
  const result = await execCommands({ commands, runtimeStorage })

  return result
}

export default peekAll
