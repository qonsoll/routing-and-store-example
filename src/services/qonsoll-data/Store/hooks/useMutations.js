import useStore from '../useStore'
import pluralize from 'pluralize'

/* 
  This hook returns methods add, update and remove which work with
  runtimeStorage and DB (using adapter)
*/
const useMutation = () => {
  const { runtimeStorage, defaultAdapter, models } = useStore()

  /**
   * Method that helps to check if received data is correct
   * @param {string} modelName collection name (firestore/runtimeStorage)
   * @param {object} data data you want to validate using model validation schema
   * @returns {boolean}
   */
  const validateData = async (modelName, data) => {
    const modelNameSingular = modelName && pluralize.singular(modelName)
    const isValid = await models[modelNameSingular].validationSchema.isValid(
      data
    )
    return isValid
  }

  /**
   * Method helps to normalize modelName to the format required by DB and runtimeStorage
   * @param {string} modelName collection name (firestore/runtimeStorage)
   * @returns {string}
   */
  const normalizeModelName = (modelName) => modelName && pluralize(modelName)

  /**
   *
   * @param {string} modelName collection name (firestore/runtimeStorage)
   * @param {object} data data you want to add
   */
  const add = async (modelName, id, data) => {
    const normalizedModelName = normalizeModelName(modelName)
    const documentId =
      id || (await defaultAdapter.generateId(normalizedModelName))
    const isValid = await validateData(modelName, data)

    if (isValid) {
      data.id = documentId

      // Add data to the runtime storage
      runtimeStorage.set(
        `structured.${normalizedModelName}.${documentId}`,
        data
      )

      // Create record in DB (depends on adapter)
      await defaultAdapter.createRecord(normalizedModelName, documentId, data)
    } else {
      throw new Error('Invalid data')
    }
  }

  /**
   *
   * @param {string} modelName collection name (DB/runtimeStorage)
   * @param {string} id document id
   * @param {object} data data you want to update
   */
  const update = async (modelName, id, data) => {
    const normalizedModelName = normalizeModelName(modelName)
    const isValid = await validateData(modelName, data)

    if (isValid) {
      // Update data in runtime storage
      runtimeStorage.update(`structured.${normalizedModelName}.${id}`, data)

      // Update data in DB (depends on adapter)
      await defaultAdapter.updateRecord(normalizedModelName, id, data)
    } else {
      throw new Error('Invalid data')
    }
  }

  /**
   *
   * @param {string} modelName collection name (DB/runtimeStorage)
   * @param {string} id document id
   */
  const remove = async (modelName, id) => {
    const normalizedModelName = normalizeModelName(modelName)

    // Remove data from runtime storage
    runtimeStorage.remove(`structured.${normalizedModelName}.${id}`)

    // Remove data from DB (depends on adapter)
    await defaultAdapter.destroyRecord(normalizedModelName, id)
  }

  return { add, remove, update }
}

export default useMutation
