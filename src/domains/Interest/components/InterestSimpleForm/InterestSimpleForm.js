import { Container, Row, Col, Input } from '@qonsoll/react-design'
import { useForm, Controller } from 'react-hook-form'
import { useCallback } from 'react'
import { useModel, useStore } from 'services/qonsoll-data/Store'

const InterestSimpleForm = ({ userId, state, setState }) => {
  const { runtimeStorage } = useStore()
  const [interestModel, getInterestId] = useModel('interest')

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = useCallback(
    (data) => {
      const interestId = getInterestId()
      runtimeStorage.push(`unsaved.users.${userId}.interests`, interestId)
      runtimeStorage.set(`unsaved.interests.${interestId}`, {
        id: interestId,
        ...data
      })

      const newInterests = [...state]
      newInterests.push(runtimeStorage.get(`unsaved.interests.${interestId}`))
      setState(newInterests)

      console.log(runtimeStorage)
    },
    [getInterestId, runtimeStorage, setState, state, userId]
  )

  const onEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSubmit(onSubmit)
      }
    },
    [handleSubmit, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row mb={3}>
          <Col>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onKeyDown={onEnterPress}
                  placeholder="Enter interest"
                />
              )}
            />
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default InterestSimpleForm
