import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

const peekAll = (query, runtimeStorage, adapter, models) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'peekAll', models)

  const result = execCommands(commands, adapter, runtimeStorage)

  return result
}

export default peekAll
