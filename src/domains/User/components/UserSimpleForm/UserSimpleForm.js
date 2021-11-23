import { Container, Row, Col, Input, Title } from '@qonsoll/react-design'
import { DatePicker } from 'antd'
import { useForm, Controller } from 'react-hook-form'

const UserSimpleForm = ({ title, form, onValuesChange }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {}
    }
  })

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      </Container>
    </form>
  )
}

export default UserSimpleForm
