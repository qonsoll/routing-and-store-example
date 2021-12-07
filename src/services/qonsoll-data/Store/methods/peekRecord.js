import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

const peekRecord = async ({ query, runtimeStorage, models }) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'peekRecord', models)
  const result = await execCommands({ commands, runtimeStorage })

  return result
}

export default peekRecord
