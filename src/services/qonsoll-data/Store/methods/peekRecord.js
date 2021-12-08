import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'
import construct from './construct'

/**
 * Method helps to peek record data from runtimeStorage by query
 * @param {string} query graphql like query
 * @param {object} runtimeStorage runtimeStorage instance
 * @param {object} models models collection to check relationships
 * @param {object} options { construct } - choose the way how to receive response
 * @returns {object}
 */
const peekRecord = async ({ query, runtimeStorage, models, options }) => {
  // Converting graphql like query to json
  const queryJSON = graphQlQueryToJson(query)

  // Building commands order (information what to call, when and with what payload)
  const commands = buildCommandsStack(queryJSON.query, 'peekRecord', models)

  // Executing commands one-by-one and making requests to the DB throw adapter
  const data = await execCommands({ commands, runtimeStorage })

  // Choosing the way how to return data
  const result = options?.construct ? construct(data, query, models) : data

  return result
}

export default peekRecord
