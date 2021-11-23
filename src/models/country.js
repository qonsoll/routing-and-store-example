import { model, attr } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup.string().required()
})

const Country = model(
  'country',
  {
    name: attr('string')
  },
  validationSchema
)

export default Country
