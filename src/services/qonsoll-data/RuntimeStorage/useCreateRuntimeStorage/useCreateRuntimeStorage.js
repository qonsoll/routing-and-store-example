import { useReducer } from 'react'
import runtimeStorageReducer from './runtimeStorageReducer'

const useCreateRuntimeStorage = (initialState) => {
  const [store, dispatch] = useReducer(runtimeStorageReducer, initialState)

  const category = (name) => {
    const path = `${name}`
    return {
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      remove: () => dispatch({ type: 'remove', payload: { path } })
    }
  }

  const collection = (category, collectionName) => {
    const path = `${category}.${collectionName}`
    return {
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      update: (value) => dispatch({ type: 'update', payload: { path, value } }),
      remove: () => dispatch({ type: 'remove', payload: { path } }),
      get: () => dispatch({ type: 'get', payload: { path } })
    }
  }

  const document = (category, collectionName, id) => {
    const path = `${category}.${collectionName}.${id}`
    return {
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      set: (value) =>
        dispatch({
          type: 'update',
          payload: { path, value }
        }),
      update: (field, value) =>
        dispatch({
          type: 'update',
          payload: { path: field ? `${path}.${field}` : path, value }
        }),
      push: (field, value) =>
        dispatch({
          type: 'push',
          payload: { path: field ? `${path}.${field}` : path, value }
        }),
      remove: () => dispatch({ type: 'remove', payload: { path } }),
      get: (field) =>
        dispatch({
          type: 'get',
          payload: { path: field ? `${path}.${field}` : path }
        })
    }
  }

  return {
    store,
    category,
    collection,
    document
  }
}

export default useCreateRuntimeStorage
