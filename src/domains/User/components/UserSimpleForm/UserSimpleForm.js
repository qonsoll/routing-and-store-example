import { Container, Row, Col, Input, Title } from '@qonsoll/react-design'
import { Button, DatePicker } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useMutations } from 'services/qonsoll-data/Store'
import { useEffect } from 'react'

const UserSimpleForm = ({ title, form, onValuesChange }) => {
  const { add, remove, update } = useMutations()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {}
    }
  })

  const onAdd = (data) =>
    add('users', {
      firstName: data.firstName,
      lastName: data.lastName,
      birthData: data.birthData,
      address: 'address1',
      interests: ['interest1', 'interest2', 'interest3']
    })
  const onRemove = () => remove('If0ZCZ9ZFYEiJCwC2DX7', 'users')
  const onUpdate = (data) =>
    update('If0ZCZ9ZFYEiJCwC2DX7', 'users', {
      firstName: data.firstName,
      lastName: data.lastName,
      birthData: data.birthData,
      address: 'address1',
      interests: ['interest1', 'interest2', 'interest3']
    })

  return (
    <form onSubmit={handleSubmit(onAdd)}>
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
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter first name" />
              )}
            />
          </Col>
          <Col>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter last name" />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Controller
              name="birthData"
              control={control}
              render={({ field }) => (
                <DatePicker {...field} placeholder="Enter birthdate" />
              )}
            />
          </Col>
        </Row>
        <Row mt={3}>
          <Col>
            <Button onClick={handleSubmit(onAdd)} type="primary">
              Add
            </Button>
          </Col>
          <Col>
            <Button onClick={handleSubmit(onRemove)} type="primary">
              Remove
            </Button>
          </Col>
          <Col>
            <Button onClick={handleSubmit(onUpdate)} type="primary">
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default UserSimpleForm
