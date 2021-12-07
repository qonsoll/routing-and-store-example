import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

const findRecord = async ({ query, adapter, models }) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'findRecord', models)
  const result = await execCommands({ commands, adapter })

  return result
}

export default findRecord
