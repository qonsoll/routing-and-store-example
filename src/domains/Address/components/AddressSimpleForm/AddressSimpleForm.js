import { Container, Row, Col, Input, Title } from '@qonsoll/react-design'
import { DatePicker } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { CitySelect } from 'domains/City/components'
import { CountrySelect } from 'domains/Country/components'

const AddressSimpleForm = ({ title, form, onValuesChange }) => {
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
            <CountrySelect control={control} />
          </Col>
          <Col>
            <CitySelect control={control} />
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default AddressSimpleForm
