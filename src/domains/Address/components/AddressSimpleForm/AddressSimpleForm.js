import { useEffect, useCallback } from 'react'
import { Container, Row, Col, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { CitySelect } from 'domains/City/components'
import { CountrySelect } from 'domains/Country/components'
import { useStore } from 'services/qonsoll-data/Store'

const AddressSimpleForm = ({ title, address, form, id }) => {
  const { runtimeStorage } = useStore()

  const updateCache = useCallback(() => {
    runtimeStorage.set(
      `unsaved.addresses.${address?.id || id}`,
      form.getFieldsValue()
    )
    console.log('-----> updateRuntimeStorage', runtimeStorage)
  }, [address?.id, form, id, runtimeStorage])

  useEffect(() => {
    console.log('address ---->', address)
    address &&
      form.setFieldsValue({
        city: address?.city?.id,
        country: address?.country?.id
      })
    address?.id && updateCache()
  }, [form, address, updateCache])

  return (
    <Form form={form} onFinish={() => {}} onValuesChange={updateCache}>
      <Container mb={4}>
        {title ? (
          <Row mb={3}>
            <Col>
              <Title level={5}>{title}</Title>
            </Col>
          </Row>
        ) : null}
        <Row mb={3}>
          <Col>
            <CountrySelect selectedCountry={address?.country} />
          </Col>
          <Col>
            <CitySelect selectedCity={address?.city} />
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default AddressSimpleForm
