import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'

/**
 * Method helps to find all data in DB by query
 * @param {string} query graphql like query
 * @param {object} runtimeStorage runtimeStorage instance
 * @param {object} models models collection to check relationships
 * @param {array} conditionals filter options
 * @returns {object}
 */
const filter = async ({ query, runtimeStorage, models, conditionals }) => {
  // Converting graphql like query to json
  const queryJSON = graphQlQueryToJson(query)

  // Building commands order (information what to call, when and with what payload)
  const commands = buildCommandsStack(queryJSON.query, 'filter', models)

  // Executing commands one-by-one and making requests to the DB throw adapter
  const data = await execCommands({ commands, runtimeStorage, conditionals })

  return data
}

export default filter
