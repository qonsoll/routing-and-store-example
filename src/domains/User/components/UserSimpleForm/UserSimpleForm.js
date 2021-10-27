import { Container, Row, Col } from '@qonsoll/react-design'
import { Form, Input, Button } from 'antd'
import { useStore } from 'contexts/Store'
import useUserActions from './../../hooks/useUserActions'

const UserSimpleForm = ({ id }) => {
  const {
    useGetId,
    addRecord,
    saveRecord,
    findRecord,
    updateRecord,
    rollbackAttributes
  } = useStore()
  const { redirectToAll } = useUserActions()
  const newId = useGetId('users')
  const recordId = id || newId
  const submitButton = id ? updateRecord : saveRecord
  const userData = { collectionPath: 'users', id: recordId }
  return (
    <Form
      layout="vertical"
      initialValues={findRecord(userData)}
      onValuesChange={(changedValues, allValues) =>
        addRecord({
          ...userData,
          values: allValues
        })
      }
    >
      <Container bounded>
        <Row>
          <Col cw={[12, 6]}>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col cw={[12, 6]}>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row h="right">
          <Col cw="auto">
            <Button
              onClick={() => {
                redirectToAll()
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col cw="auto">
            <Button
              onClick={() => {
                //cancel
                rollbackAttributes(userData)
              }}
            >
              Rollback
            </Button>
          </Col>
          <Col cw="auto">
            <Button
              type="primary"
              onClick={() => {
                submitButton(userData)
                redirectToAll()
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default UserSimpleForm
