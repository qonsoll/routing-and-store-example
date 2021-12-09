/**
 * Converts array of documents from firestore to object
 * @param {array} docs array of docs from firestore
 * @param {any} customValue custom value to override
 * @returns {object}
 */
const docArrayToObject = (docs, customValue) => {
  const result = {}
  if (docs) {
    docs.forEach((doc) => {
      result[doc?.id || doc?.data?.id] = customValue || doc
    })
  }
  return result
}

export default docArrayToObject
