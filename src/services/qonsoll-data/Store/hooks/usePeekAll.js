import { useCallback } from 'react'
import { graphQlQueryToJson } from 'graphql-query-to-json'
import useStore from '../useStore'
import pluralize from 'pluralize'
import traverse from 'traverse'

const usePeekAll = () => {
  const { runtimeStorage, defaultAdapter, models } = useStore()

  const peekAll = useCallback(
    (query) => {
      let result = {}

      const queryJSON = graphQlQueryToJson(query)
      console.log('store ->>>>>', runtimeStorage)

      const modelName = queryJSON?.query && Object.keys(queryJSON.query)[0]

      const modelNameSingular = modelName && pluralize.singular(modelName)

      traverse(queryJSON.query[modelName]).forEach(function (field) {
        if (typeof field === 'object' || Array.isArray(field)) {
          console.log(this.key)
        }
      })
    },
    [runtimeStorage]
  )

  return peekAll
}

export default usePeekAll
