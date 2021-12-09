import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Title,
  Button,
  Dropdown
} from '@qonsoll/react-design'
import InterestSimpleView from '../InterestSimpleView'
import InterestSimpleForm from '../InterestSimpleForm'

const InterestsList = ({ title, interests }) => {
  const [state, setState] = useState([])

  useEffect(() => {
    interests && setState(interests)
  }, [interests])

  return (
    <Container>
      {title ? (
        <Row mb={3}>
          <Col>
            <Title level={5}>{title}</Title>
          </Col>
          <Col cw="auto">
            <Dropdown
              onVisibleChange={function noRefCheck() {}}
              overlay={<InterestSimpleForm />}
            >
              <Button type="primary" size="small">
                Add interest
              </Button>
            </Dropdown>
          </Col>
        </Row>
      ) : null}
      {!interests?.length ? (
        <Row>
          <Col>No interests</Col>
        </Row>
      ) : null}
      {state?.map((interest) => (
        <InterestSimpleView key={interest?.id} interest={interest} />
      ))}
    </Container>
  )
}

export default InterestsList
