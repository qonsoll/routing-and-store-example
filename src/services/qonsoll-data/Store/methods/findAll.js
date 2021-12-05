import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'
import construct from './construct'

const findAll = async (query, adapter, models, options) => {
  const queryJSON = graphQlQueryToJson(query)
  const commands = buildCommandsStack(queryJSON.query, 'findAll', models)
  const data = await execCommands(commands, adapter)
  const result = options?.construct ? construct(data, query, models) : data

  return result
}

export default findAll
