import { useState, useEffect, useMemo } from 'react'
import * as models from 'models'
import { useStore } from '../../../contexts/Store'
import useIsDirtyModel from './useIsDirtyModel'

const { user } = models

const useUserForm = (form, id) => {
  const [initialized, setInitialized] = useState(false)
  const { addRecord, rollbackAttributes, fetchRecord, findRecord } = useStore()
  const collectionPath = user.collectionPath
  const userId = id || user.newId
  const userData = useMemo(
    () => ({ collectionPath, id: userId }),
    [collectionPath, userId]
  )
  const isDirty = useIsDirtyModel({ ...userData })

  const onFormValuesChange = (changedValues, allValues) => {
    addRecord({
      ...userData,
      values: {
        ...user.defaultValues,
        ...allValues
      }
    })
  }

  const rollbackChanges = () => {
    const initialValues = id ? findRecord(userData) : user.defaultValues
    rollbackAttributes({
      ...userData,
      values: initialValues
    })
    form.setFieldsValue(initialValues)
  }

  useEffect(() => {
    const setInitialValues = async () => {
      const initialValues = id
        ? findRecord(userData) || (await fetchRecord(userData))
        : user.defaultValues

      form.setFieldsValue(initialValues)
      setInitialized(true)
    }
    !initialized && setInitialValues()
  }, [id, findRecord, fetchRecord, userData, form, initialized])

  return {
    onFormValuesChange,
    rollbackChanges,
    isDirty
  }
}

export default useUserForm
