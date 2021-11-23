import { Controller } from 'react-hook-form'
import { Select } from '@qonsoll/react-design'

const CitySelect = ({ control }) => {
  const cities = [
    { label: 'Kyiv', value: 'kyiv' },
    { label: 'Khmelnytskii', value: 'khmelnytskii' }
  ]
  return (
    <Controller
      name="city"
      control={control}
      render={({ field }) => (
        <Select {...field} options={cities} placeholder="Choose city" />
      )}
    />
  )
}

export default CitySelect
