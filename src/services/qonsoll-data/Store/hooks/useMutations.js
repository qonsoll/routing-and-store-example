import useStore from '../useStore'
import moment from 'moment'
import pluralize from 'pluralize'

const useMutation = () => {
  const { runtimeStorage, defaultAdapter, models } = useStore()

  const validateData = async (modelNameSingular, data) => {
    console.log(data)
    const isValid = await models[modelNameSingular].validationSchema.isValid(
      data
    )
    return isValid
  }

  const add = async (model, data) => {
    const id = await defaultAdapter.generateId('users')
    const modelNameSingular = model && pluralize.singular(model)

    Object.keys(data).forEach((field) => {
      if (moment.isMoment(data[field]))
        data[field] = moment(data[field]).format() || null
    })

    const isValid = await validateData(modelNameSingular, data)

    if (isValid) {
      data.id = id
      runtimeStorage.set(`structured.${model}.${id}`, data)
      runtimeStorage.push(`ordered.${model}`, data)
      defaultAdapter.createRecord(model, id, data)
    } else {
      throw new Error('Invalid data')
    }
  }

  const update = async (id, model, data) => {
    const modelNameSingular = model && pluralize.singular(model)

    Object.keys(data).forEach((field) => {
      if (moment.isMoment(data[field]))
        data[field] = moment(data[field]).format() || null
    })

    const isValid = await validateData(modelNameSingular, data)

    if (isValid) {
      runtimeStorage.update(`structured.${model}.${id}`, data)
      runtimeStorage.update(`ordered.${model}`, data)

      defaultAdapter.updateRecord(model, id, data)
    } else {
      throw new Error('Invalid data')
    }
    console.log(runtimeStorage)
  }

  const remove = (id, model) => {
    runtimeStorage.remove(`structured.${model}.${id}`)
    runtimeStorage.remove(`ordered.${model}`, id)

    defaultAdapter.destroyRecord(model, id)

    console.log(runtimeStorage)
  }

  return { add, remove, update }
}

export default useMutation
