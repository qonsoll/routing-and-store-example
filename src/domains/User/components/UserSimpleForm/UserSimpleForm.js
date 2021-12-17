import { useEffect, useCallback } from 'react'
import { Container, Row, Col, Input, Title } from '@qonsoll/react-design'
import { Form, DatePicker } from 'antd'
import { useModel, useStore } from 'services/qonsoll-data/Store'
import moment from 'moment'

const UserSimpleForm = ({ id, title, user, form }) => {
  const [userModel, getUserId] = useModel('user')
  const { runtimeStorage } = useStore()

  const updateCache = useCallback(() => {
    runtimeStorage.set(`unsaved.users.${id}`, form.getFieldsValue())
    console.log('-----> updateRuntimeStorage', runtimeStorage)
  }, [form, id, runtimeStorage])

  useEffect(() => {
    user
      ? form.setFieldsValue({
          firstName: user?.firstName,
          lastName: user?.lastName,
          birthDate: moment(user?.birthDate)
        })
      : form.setFieldsValue(userModel?.defaultValues)
    updateCache()
  }, [form, updateCache, user, userModel?.defaultValues])

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
