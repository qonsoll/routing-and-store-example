import { graphQlQueryToJson } from 'graphql-query-to-json'
import { buildPeekCommandsStack, execPeekCommands } from '../helpers'

const peekAll = (query, runtimeStorage, models) => {
  //   const queryJSON = graphQlQueryToJson(query)
  //   const commands = buildPeekCommandsStack(queryJSON.query, 'findAll')
  //   console.log('peekAll commandStack ---->', commands)

  //   const result = execPeekCommands(commands, runtimeStorage, models)
  //   console.log(
  //     'peekResult ------> 🚀 ~ file: findAll.js ~ line 10 ~ findAll ~ result',
  //     result
  //   )
  console.log('runtimeStorage ---->', runtimeStorage)
}

export default peekAll
