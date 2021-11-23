import { model, attr, belongsTo } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  street: yup.string(),
  zipCode: yup.string(),
  city: yup.string().required(),
  country: yup.string().required()
})

const Address = model(
  'address',
  {
    street: attr('string'),
    zipCode: attr('number'),
    city: belongsTo('city'),
    country: belongsTo('country')
  },
  validationSchema
)

export default Address
