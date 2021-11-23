import { useState, useEffect } from 'react'
import useStore from '../useStore'

const transformModelToState = (model) => {
  let state = {}

  Object.keys(model.fields).forEach((field) => {
    const { type, dataType, defaultValue } = model.fields[field]
    state[field].type = type || null
    state[field].dataType = dataType || null
    state[field].value = defaultValue || null
  })

  return state
}

const useTransformModelToState = ({ modelName }) => {
  const [state, setState] = useState()
  const { models } = useStore()

  useEffect(() => {
    const model = models[modelName]
    const newState = transformModelToState(model)
    setState(newState)
  }, [models, modelName])

  return [state, setState]
}

export default useTransformModelToState
