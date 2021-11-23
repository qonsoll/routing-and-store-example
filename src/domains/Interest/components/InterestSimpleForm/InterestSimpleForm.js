import { Container, Row, Col, Input } from '@qonsoll/react-design'
import { useForm, Controller } from 'react-hook-form'

const InterestSimpleForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row mb={3}>
          <Col>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter interest" />
              )}
            />
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default InterestSimpleForm
