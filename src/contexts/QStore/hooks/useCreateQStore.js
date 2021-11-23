import { useReducer } from 'react'
import _ from 'lodash'

function reducer(state, action) {
  const map = {
    get: (state, payload) => _.get(state, payload.path),
    update: (state, payload) =>
      _.set(JSON.parse(JSON.stringify(state)), payload.path, payload.value),
    push: (state, payload) => {
      var newState = JSON.parse(JSON.stringify(state))
      const currentValue = _.get(newState, payload.path)
      Array.isArray(currentValue) && currentValue.push(payload.value)

      return _.set(newState, payload.path, currentValue)
    },
    remove: (state, payload) => {
      var newState = JSON.parse(JSON.stringify(state))
      _.unset(newState, payload.path)

      return newState
    }
  }

  return map[action.type](state, action.payload)
}

const useCreateQStore = (initialState) => {
  const [store, dispatch] = useReducer(reducer, initialState)

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

export default useCreateQStore
