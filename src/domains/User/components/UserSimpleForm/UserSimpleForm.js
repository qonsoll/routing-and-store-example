import { Container, Row, Col } from '@qonsoll/react-design'
import { Form, Input, Button } from 'antd'
import { useStore } from 'contexts/Store'

const UserSimpleForm = ({ id }) => {
  const { useGetId, addRecord, saveRecord, findRecord, updateRecord } =
    useStore()
  const newId = useGetId('users')
  const recordId = id || newId
  return (
    <Form
      layout="vertical"
      initialValues={findRecord({ collectionPath: 'users', id: recordId })}
      onValuesChange={(changedValues, allValues) =>
        addRecord({
          collectionPath: 'users',
          id: recordId,
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
            <Button>Cancel</Button>
          </Col>
          <Col cw="auto">
            <Button
              type="primary"
              onClick={() => {
                if (!id) {
                  saveRecord({ collectionPath: 'users', id: recordId })
                } else {
                  updateRecord({ collectionPath: 'users', id: recordId })
                }
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
