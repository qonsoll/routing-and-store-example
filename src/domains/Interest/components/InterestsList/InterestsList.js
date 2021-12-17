import { useEffect, useRef, useState, useCallback } from 'react'
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
import { useStore } from 'services/qonsoll-data/Store'

const InterestsList = ({ title, interests, userId }) => {
  const { runtimeStorage } = useStore()
  const [isInitialized, setIsInitialized] = useState(true)

  const [state, setState] = useState([])

  const updateCache = useCallback(() => {
    interests?.forEach((interest) => {
      runtimeStorage.push(`unsaved.users.${userId}.interests`, interest.id)
      runtimeStorage.set(`unsaved.interests.${interest.id}`, interest)
    })
  }, [interests, runtimeStorage, userId])

  useEffect(() => {
    console.log('useEffect update state', state)
    if (interests && isInitialized) {
      setState(interests)
      setIsInitialized(false)
    }
    updateCache()
  }, [updateCache, interests, runtimeStorage, userId, isInitialized, state])

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
              overlay={
                <InterestSimpleForm
                  state={state}
                  setState={setState}
                  userId={userId}
                />
              }
            >
              <Button type="primary" size="small">
                Add interest
              </Button>
            </Dropdown>
          </Col>
        </Row>
      ) : null}
      {!state?.length ? (
        <Row>
          <Col>No interests</Col>
        </Row>
      ) : null}
      {state?.map((interest) => {
        console.log('interest ID ---->', interest?.id)
        return <InterestSimpleView key={interest?.id} interest={interest} />
      })}
    </Container>
  )
}

export default InterestsList
