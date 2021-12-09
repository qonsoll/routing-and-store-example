import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { Select } from '@qonsoll/react-design'
import { useFindAll } from 'services/qonsoll-data/Store'

const query = `query {
      cities {
        id
        name
      }
  }`

const CitySelect = () => {
  const [citiesTransformed, setCitiesTransformed] = useState([])
  const [cities, loading, error] = useFindAll(query)

  useEffect(() => {
    if (Boolean(cities?.length)) {
      const citiesTransformed = cities.map((city) => ({
        label: city.name,
        value: city.id
      }))
      citiesTransformed && setCitiesTransformed(citiesTransformed)
    }
  }, [cities])

  return (
    <>
      {error ? error.toString() : null}
      <Form.Item name="city">
        <Select
          loading={loading}
          options={citiesTransformed}
          placeholder="Choose city"
        />
      </Form.Item>
    </>
  )
}

export default CitySelect
