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
    lastName: attr('string'),
    age: attr('number'),
    birthDate: attr('date'),
    address: belongsTo('address'),
    interests: hasMany('interest')
  },
  validationSchema
)

export default User
