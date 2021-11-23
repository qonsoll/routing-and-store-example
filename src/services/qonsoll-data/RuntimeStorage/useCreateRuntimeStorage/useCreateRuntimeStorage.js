import { useReducer } from 'react'
import runtimeStorageReducer from './runtimeStorageReducer'

/**
 * This hook creates state for the runtime storage
 * @param {object} initialState - The object of the initial state
 */
const useCreateRuntimeStorage = (initialState) => {
  const [store, dispatch] = useReducer(runtimeStorageReducer, initialState)

  /**
   * This function returns methods for working with categories
   * @param {string} name - The name of the category
   */
  const category = (name) => {
    const path = `${name}`
    return {
      /**
       * Create a category
       */
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      /**
       * Delete a category
       */
      remove: () => dispatch({ type: 'remove', payload: { path } })
    }
  }

  /**
   * This function returns methods for working with storages
   */
  const storage = () => {
    return {
      create: (path) =>
        dispatch({ type: 'update', payload: { path, value: {} } }),
      update: (path, value) =>
        dispatch({ type: 'update', payload: { path, value } }),
      remove: (path) => dispatch({ type: 'remove', payload: { path } }),
      get: (path) => dispatch({ type: 'get', payload: { path } })
    }
  }

  /**
   * This function returns methods for working with collections
   * @param {string} category - The name of the category
   * @param {string} collectionName - The name of the collection
   */
  const collection = (category, collectionName) => {
    const path = `${category}.${collectionName}`
    return {
      /**
       * Create a collection
       */
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      /**
       * Update a collection
       * @param {string} value - The name of the collection
       */
      update: (value) => dispatch({ type: 'update', payload: { path, value } }),
      /**
       * Remove a collection
       */
      remove: () => dispatch({ type: 'remove', payload: { path } }),
      /**
       * Return a collection
       */
      get: () => dispatch({ type: 'get', payload: { path } })
    }
  }

  /**
   * This function returns methods for working with documents
   * @param {string} category - The category name of the documents category.
   * @param {string} collectionName - The collection name of the documents category.
   * @param {string} id - The id of the document.
   */
  const document = (category, collectionName, id) => {
    const path = `${category}.${collectionName}.${id}`
    return {
      /**
       * Create a document
       */
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      /**
       * Set a document value.
       * @param {object} value - The value which will be set.
       */
      set: (value) =>
        dispatch({
          type: 'update',
          payload: { path, value }
        }),
      /**
       * Update a document.
       * @param {string} field - The field which will be changed.
       * @param {object} value - The new value of the field.
       */
      update: (field, value) =>
        dispatch({
          type: 'update',
          payload: { path: field ? `${path}.${field}` : path, value }
        }),
      /**
       * Push a value to field.
       * @param {string} field - The name of the field.
       * @param {object} value - The value which will be pushed.
       */
      push: (field, value) =>
        dispatch({
          type: 'push',
          payload: { path: field ? `${path}.${field}` : path, value }
        }),
      /**
       * Remove a document.
       */
      remove: () => dispatch({ type: 'remove', payload: { path } }),
      /**
       * Remove a field value.
       * @param {string} field - The name of the returned field.
       */
      get: (field) =>
        dispatch({
          type: 'get',
          payload: { path: field ? `${path}.${field}` : path }
        })
    }
  }

  return {
    store,
    storage,
    category,
    collection,
    document
  }
}

export default useCreateRuntimeStorage
