import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  Card,
  Container,
  Row,
  Col,
  Title,
  Text,
  Button
} from '@qonsoll/react-design'
import { useHistory } from 'react-router-dom'
// import { useUserActions } from '../../hooks'

const UserSimpleView = ({ id, firstName, lastName, age }) => {
  const history = useHistory()
  // const { remove, redirectToEdit, destroy, update } = useUserActions(id)
  const remove = () => {}
  const redirectToEdit = () => {
    history.push(`/users/${id}/edit`)
  }
  const destroy = () => {}
  return (
    <Card mb={3}>
      <Container>
        <Row h="between" v="center">
          <Col cw="auto">
            <Row>
              <Col cw="12">
                <Title level={5}>
                  {firstName} {lastName}
                </Title>
              </Col>
              <Col cw="12">
                <Text>Age: {age}</Text>
              </Col>
            </Row>
          </Col>
          <Col cw="auto">
            <Row noGutters v="center">
              <Col mr={3}>
                <Button icon={<EditOutlined />} onClick={redirectToEdit} />
              </Col>
              <Col mr={3}>
                <Button icon={<DeleteOutlined />} onClick={remove} />
              </Col>
              <Col>
                <Button
                  icon={<DeleteOutlined />}
                  type="danger"
                  onClick={destroy}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}

export default UserSimpleView
