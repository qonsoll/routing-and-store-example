import { model, attr, belongsTo, hasMany } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  firstName: yup.string().required().default('Alex'),
  lastName: yup.string().required().default('Pas'),
  birthDate: yup.date(),
  address: yup.string().required(),
  interests: yup.array()
})

const User = model(
  'user',
  {
    firstName: attr('string'),
    lastName: attr('string'),
    birthDate: attr('date'),
    address: belongsTo('address'),
    interests: hasMany('interest')
  },
  validationSchema
)

export default User
