import { useCallback, useEffect } from 'react'
import { useModel, useStore } from 'services/qonsoll-data/Store'
import moment from 'moment'
import pluralize from 'pluralize'
import { useUpdateRecord, useCreateRecord } from './'

/**
 * Method helps to find record data by query in cache or in DB
 * @param {string} parentId id of the parent model
 * @param {string} id id of the relationship model
 * @param {object} document instance of the current model (parent or relationship)
 * @param {string} modelName name of the current model
 * @param {object} form instance of the form
 * @param {array} relationshipModels names of the relationship models
 * @returns { initializeForm, updateCache, updateRelationshipCache, submit }
 */
const useQForm = ({
  parentId,
  actionType,
  id,
  document,
  modelName,
  form,
  relationshipModels
}) => {
  // Getting runtime storage for working with cache
  const { runtimeStorage } = useStore()
  // Getting a model for used model fields default values
  const [model] = useModel(modelName)
  // Pluralized model name
  const pluralizedModelName = pluralize(modelName)

  // Getting updateRecord method from hook
  const updateRecord = useUpdateRecord(
    { id: parentId, modelName },
    relationshipModels
  )
  // Getting createRecord method from hook
  const createRecord = useCreateRecord(
    { id: parentId, modelName },
    relationshipModels
  )

  //Getting form initial values
  const getInitialValues = useCallback(() => {
    // Checking id document and model name are not undefined
    if (document && modelName) {
      // Initial values object
      const initialValues = {}

      // Getting initial values from document or using default model field values
      form &&
        Object.keys(model?.fields)?.forEach((fieldName) => {
          // If relationship is belongsTo set id to form initial values
          if (model?.fields[fieldName].dataType === 'belongsTo') {
            initialValues[fieldName] = document[fieldName]?.id
          }
          // If field type is date transform string to moment
          else if (model?.fields[fieldName].dataType === 'date')
            initialValues[fieldName] = moment(document[fieldName])
          else initialValues[fieldName] = document[fieldName]
        })
      return initialValues
    }
    // If document is undefined returns model default values
    return model?.defaultValues
  }, [form, model, modelName, document])

  // Initializing form values
  const initializeForm = useCallback(() => {
    form?.setFieldsValue(getInitialValues())
  }, [form, getInitialValues])

  // Method for cache updating
  const updateCache = useCallback(() => {
    // If document are array (hasMany relationship) updating cache for each one
    if (document && Array.isArray(document)) {
      document.forEach((item) => {
        const { id } = item
        runtimeStorage.set(`unsaved.${pluralizedModelName}.${id}`, item)
      })
    }
    // Else take value from form
    else
      runtimeStorage.set(
        `unsaved.${pluralizedModelName}.${id}`,
        form?.getFieldsValue()
      )
    console.log(runtimeStorage)
  }, [id, form, document, pluralizedModelName, runtimeStorage])

  // If relationship is hasMany getting array of all ids
  const getIds = useCallback(() => {
    const ids = document.reduce((idsArray, item) => {
      const { id } = item
      idsArray.push(id)
      return idsArray
    }, [])
    return ids
  }, [document])

  // Update cache for every relationship model
  const updateRelationshipCache = useCallback(
    (parentModelName, parentId) => {
      // Pluralized model name
      const pluralizedParentModelName =
        parentModelName && pluralize(parentModelName)
      // If relationship is hasMany getting array of ids
      const cacheId = Array.isArray(document) ? getIds() : id
      runtimeStorage.set(
        `unsaved.${pluralizedParentModelName}.${parentId}.${modelName}`,
        cacheId
      )
    },
    [getIds, id, modelName, document, runtimeStorage]
  )

  // Clearing cache after form unmount
  const clearCache = useCallback(
    () => runtimeStorage.remove('unsaved'),
    [runtimeStorage]
  )

  // Form submit by action type
  const submit = () =>
    actionType === 'create' ? createRecord() : updateRecord()

  useEffect(() => clearCache(), [clearCache])

  return { initializeForm, updateCache, updateRelationshipCache, submit }
}

export default useQForm
