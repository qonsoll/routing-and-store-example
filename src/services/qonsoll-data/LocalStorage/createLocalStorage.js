import LocalStorage from './LocalStorage'

/**
 * createLocalStorage method creates instance of LocalStorage
 * @param {object} key - key of the Local Storage Item
 */
const createLocalStorage = (key) => new LocalStorage(key)

export default createLocalStorage
