import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { Select } from '@qonsoll/react-design'
import { useFindAll } from 'services/qonsoll-data/Store'

const query = `query {
      countries {
        id
        name
      }
  }`

const CountrySelect = () => {
  const [countriesTransformed, setCountriesTransformed] = useState([])
  const [countries, loading, error] = useFindAll(query)

  useEffect(() => {
    if (Boolean(countries?.length)) {
      const citiesTransformed = countries.map((country) => ({
        label: country.name,
        value: country.id
      }))
      citiesTransformed && setCountriesTransformed(citiesTransformed)
    }
  }, [countries])

  return (
    <>
      {error ? error.toString() : null}
      <Form.Item name="country">
        <Select
          loading={loading}
          options={countriesTransformed}
          placeholder="Choose country"
        />
      </Form.Item>
    </>
  )
}

export default CountrySelect
