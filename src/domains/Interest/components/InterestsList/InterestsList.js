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
import { useStore } from 'services/qonsoll-data/Store'
import { useQForm } from '../../../User/components/UserAdvancedForm/hooks'

const InterestsList = ({ title, interests, userId, form }) => {
  const { runtimeStorage } = useStore()
  const [isInitialized, setIsInitialized] = useState(true)
  console.log('parrent id in interest list', userId)

  const [state, setState] = useState([])

  const { updateCache, updateRelationshipCache } = useQForm({
    parentId: userId,
    modelName: 'interests',
    document: state
  })

  useEffect(() => {
    if (interests && isInitialized) {
      setState(interests)
      setIsInitialized(false)
    }
    if (state.length !== 0) {
      updateCache()
      updateRelationshipCache('user', userId)
    }
  }, [
    updateCache,
    interests,
    runtimeStorage,
    userId,
    isInitialized,
    state,
    updateRelationshipCache
  ])

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
                  form={form}
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
      {state?.map((interest) => (
        <InterestSimpleView key={interest?.id} interest={interest} />
      ))}
    </Container>
  )
}

export default InterestsList
