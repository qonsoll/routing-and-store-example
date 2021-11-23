import { useReducer } from 'react'
import runtimeStorageReducer from './runtimeStorageReducer'

/**
 * This hook creates state for the runtime storage
 * @param {object} initialState - The title of the book
 */
const useCreateRuntimeStorage = (initialState) => {
  const [store, dispatch] = useReducer(runtimeStorageReducer, initialState)

  /**
   * Represents a book
   * @param {string} name - The title of the book.
   */
  const category = (name) => {
    const path = `${name}`
    return {
      /**
       * Represents a book.
       */
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      /**
       * Represents a book
       */
      remove: () => dispatch({ type: 'remove', payload: { path } })
    }
  }

<<<<<<< Updated upstream
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

=======
  /**
   * Represents a boo
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
>>>>>>> Stashed changes
  const collection = (category, collectionName) => {
    const path = `${category}.${collectionName}`
    return {
      /**
       * Represents a book.
       */
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      /**
       * Represents a book.
       * @param {object} value - The title of the book
       */
      update: (value) => dispatch({ type: 'update', payload: { path, value } }),
      /**
       * Represents a book
       */
      remove: () => dispatch({ type: 'remove', payload: { path } }),
      /**
       * Represents a book
       */
      get: () => dispatch({ type: 'get', payload: { path } })
    }
  }

  /**
   * Represents a boo
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  const document = (category, collectionName, id) => {
    const path = `${category}.${collectionName}.${id}`
    return {
      /**
       * Represents a book
       */
      create: () => dispatch({ type: 'update', payload: { path, value: {} } }),
      /**
       * Represents a book.
       * @param {string} title - The title of the book.
       * @param {string} author - The author of the book.
       */
      set: (value) =>
        dispatch({
          type: 'update',
          payload: { path, value }
        }),
      /**
       * Represents a book.
       * @param {string} title - The title of the book.
       * @param {string} author - The author of the book.
       */
      update: (field, value) =>
        dispatch({
          type: 'update',
          payload: { path: field ? `${path}.${field}` : path, value }
        }),
      /**
       * Represents a book.
       * @param {string} title - The title of the book.
       * @param {string} author - The author of the book.
       */
      push: (field, value) =>
        dispatch({
          type: 'push',
          payload: { path: field ? `${path}.${field}` : path, value }
        }),
      /**
       * Represents a book.
       * @param {string} title - The title of the book.
       * @param {string} author - The author of the book.
       */
      remove: () => dispatch({ type: 'remove', payload: { path } }),
      /**
       * Represents a book.
       * @param {string} title - The title of the book.
       * @param {string} author - The author of the book.
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
