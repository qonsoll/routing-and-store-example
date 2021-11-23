import _ from 'lodash'

function runtimeStorageReducer(state, action) {
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

export default runtimeStorageReducer
