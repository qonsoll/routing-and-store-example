import { Row, Col } from '@qonsoll/react-design'

const InterestSimpleView = ({ interest }) => {
  return (
    <Row>
      <Col>{interest?.name}</Col>
    </Row>
  )
}

export default InterestSimpleView
