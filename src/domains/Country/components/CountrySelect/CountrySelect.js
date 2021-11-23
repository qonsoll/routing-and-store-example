import { Controller } from 'react-hook-form'
import { Select } from '@qonsoll/react-design'

const CountrySelect = ({ control }) => {
  const countries = [
    { label: 'Ukraine', value: 'ukraine' },
    { label: 'Norway', value: 'norway' }
  ]
  return (
    <Controller
      name="country"
      control={control}
      render={({ field }) => (
        <Select {...field} options={countries} placeholder="Choose country" />
      )}
    />
  )
}

export default CountrySelect
