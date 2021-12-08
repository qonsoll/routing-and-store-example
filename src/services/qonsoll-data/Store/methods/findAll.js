import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildCommandsStack, execCommands } from '../helpers'
import construct from './construct'

/**
 * Method helps to find all data in DB by query
 * @param {*} query graphql like query
 * @param {*} adapter DB adapter that will help to make requests
 * @param {*} models models collection to check relationships
 * @param {*} options { construct } - choose the way how to receive response
 * @returns {object}
 */
const findAll = async ({ query, adapter, models, options }) => {
  // Converting graphql like query to json
  const queryJSON = graphQlQueryToJson(query)

  // Building commands order (information what to call, when and with what payload)
  const commands = buildCommandsStack(queryJSON.query, 'findAll', models)

  // Executing commands one-by-one and making requests to the DB throw adapter
  const data = await execCommands({ commands, adapter })

  // Choosing the way how to return data
  const result = options?.construct ? construct(data, query, models) : data

  return result
}

export default findAll
