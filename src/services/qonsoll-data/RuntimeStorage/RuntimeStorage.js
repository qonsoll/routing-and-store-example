import _ from 'lodash'
import validate from './validate'

class RuntimeStorage {
  /**
   * RuntimeStorage class
   * @constructor
   * @param {object} initialState - initial state of the storage
   */
  constructor(initialState) {
    validate.initialState(initialState)
    this.state = initialState || {}
  }

  /**
   * Method helps to get data from the runtime storage
   * @param {string} path - path to the document
   */
  get(path) {
    validate.path(path, 'get')
    return path ? _.get(this.state, path) : null
  }

  /**
   * Method helps to set data to the runtime storage
   * @param {string} path - path to the document
   * @param {string|object|array} value - value that should be pushed to the storage
   */
  set(path, value) {
    validate.path(path, 'set')
    validate.value(value, 'set')
    _.set(this.state, path, value)

    this.listener(path, this.copyState())
  }

  /**
   * Method helps to update data in runtime storage
   * @param {string} path - path to the document
   * @param {string|object|array} value - value that should be pushed to the storage
   */
  update(path, value) {
    validate.path(path, 'update')
    validate.value(value, 'update')
    const currentValue = _.get(this.state, path)
    const isIterrableCurrentValue =
      Array.isArray(currentValue) || typeof currentValue === 'object'
    const isIterrableValue = Array.isArray(value) || typeof value === 'object'
    const isIterrableBothValues = isIterrableCurrentValue && isIterrableValue
    const newValue = isIterrableBothValues
      ? { ...currentValue, ...value }
      : value
    _.set(this.state, path, newValue)
    this.listener(path, this.copyState())
  }

  /**
   * Method makes deep update
   * @param {object} value - value that should merged with the storage
   */
  deepUpdate(value) {
    validate.value(value, 'update')
    _.merge(this.state, value)
  }

  /**
   * Method helps to push data to the field of runtime storage
   * @param {string} path - path to the document
   * @param {string|object|array} value - value that should be pushed to the storage
   */
  push(path, value) {
    validate.path(path, 'push')
    validate.value(value, 'push')
    const currentValue = _.get(this.state, path) || []
    const isCurrentValueArray = Array.isArray(currentValue)
    isCurrentValueArray && currentValue.push(value)
    console.log('push')
    _.set(this.state, path, currentValue)
    console.log(this.state)

    this.listener(path, this.copyState())
  }

  /**
   * Method helps to remove data from the runtime storage
   * @param {string} path - path to the document
   */
  remove(path, id) {
    validate.path(path, 'remove')
    const currentValue = _.get(this.state, path) || {}
    if (Array.isArray(currentValue)) {
      const newValue =
        currentValue.filter((item) => item.id !== id) || currentValue
      console.log('newValue on Array ->>>>', newValue)
      _.set(this.state, path, newValue)
    } else _.unset(this.state, path)

    this.listener(path, this.copyState())
  }

  /**
   * Listener method
   * @param {string} path - path to the document
   * @param {object} newState - new state object
   */
  listener(path, newState) {}

  /**
   * Method helps to subscribe to the changes in runtime storage
   * @param {function} callback - initial state of the storage
   */
  subscribe(callback) {
    if (callback) {
      this.listener = callback
    }
  }

  /**
   * Remove subscriprion to the runtime storage
   */
  unsubscribe() {
    this.listener = (path, newState) => {}
  }

  /**
   * Make copy of the state
   */
  copyState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}

export default RuntimeStorage
