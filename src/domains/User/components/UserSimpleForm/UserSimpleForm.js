import { useEffect } from 'react'
import { Container, Row, Col, Input, Title } from '@qonsoll/react-design'
import { Form, DatePicker } from 'antd'
import { useModel } from 'services/qonsoll-data/Store'
import { useQForm } from '../UserAdvancedForm/hooks'

const UserSimpleForm = ({ id, title, user, form }) => {
  const [userModel] = useModel('user')
  const { initializeForm, updateCache } = useQForm({
    form,
    modelName: 'user',
    document: user,
    id
  })

  useEffect(() => {
    initializeForm()
  }, [form, initializeForm, updateCache, user, userModel?.defaultValues])

  return (
    <Form form={form} onValuesChange={updateCache} onFinish={() => {}}>
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
            <Form.Item name="firstName">
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="lastName">
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="birthDate">
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Enter birth date"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default UserSimpleForm
