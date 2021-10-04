import useAddRecord from './useAddRecord'
import * as MODELS from '../../../models'

const useModel = (dispatch) => {
  const addRecord = useAddRecord(dispatch)

  function Model(modelName) {
    this.addRecord = () => addRecord(modelName, {})
  }

  return Model
}

export default useModel
