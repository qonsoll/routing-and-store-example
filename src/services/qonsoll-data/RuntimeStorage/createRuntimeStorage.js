import RuntimeStorage from './RuntimeStorage'

/**
 * createRuntimeStorage method creates instance of RuntimeStorage
 * @param {object} initialState - initial state of the RuntimeStorage
 */
const createRuntimeStorage = (initialState) => new RuntimeStorage(initialState)

export default createRuntimeStorage
