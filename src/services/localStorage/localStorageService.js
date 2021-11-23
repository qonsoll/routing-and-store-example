import _ from 'lodash'

const localStorageService = () => {
  const actions = {
    get: (path) => JSON.parse(localStorage.getItem(path)),
    update: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    push: (key, path, value) => {
      const currentValue = JSON.parse(localStorage.getItem(key))
      console.log(currentValue)
      Array.isArray(currentValue) && currentValue.push(value)
      _.set(currentValue, path, value)
      localStorage.setItem(key, JSON.stringify(currentValue))
    },
    remove: (path) => localStorage.removeItem(path)
  }

  return actions
}

export default localStorageService
