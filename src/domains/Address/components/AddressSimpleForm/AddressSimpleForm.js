import { useEffect } from 'react'
import { Container, Row, Col, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { CitySelect } from 'domains/City/components'
import { CountrySelect } from 'domains/Country/components'

const AddressSimpleForm = ({ title, address }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    address &&
      form.setFieldsValue({
        city: address?.city?.id,
        country: address?.country?.id
      })
  }, [form, address])
  return (
    <Form form={form} onFinish={() => {}}>
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
