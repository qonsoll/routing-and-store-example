import { useEffect } from 'react'
import { Container, Row, Col, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { CitySelect } from 'domains/City/components'
import { CountrySelect } from 'domains/Country/components'
import { useQForm } from '../../../User/components/UserAdvancedForm/hooks'

const AddressSimpleForm = ({ title, address, form, id, userId }) => {
  const { initializeForm, updateCache, updateRelationshipCache } = useQForm({
    parentId: userId,
    id,
    modelName: 'address',
    document: address,
    form
  })

  useEffect(() => {
    initializeForm()
  }, [form, address, updateCache, initializeForm])

  return (
    <Form
      form={form}
      onFinish={() => {}}
      onValuesChange={() => {
        updateCache()
        updateRelationshipCache('user', userId)
      }}
    >
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
