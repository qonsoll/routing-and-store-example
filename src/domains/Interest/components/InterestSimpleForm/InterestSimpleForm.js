import { Container, Row, Col, Input } from '@qonsoll/react-design'
import { useCallback } from 'react'
import { useModel } from 'services/qonsoll-data/Store'
import { Form } from 'antd'

const InterestSimpleForm = ({ state, setState, form }) => {
  const [, getInterestId] = useModel('interest')
  const interestId = getInterestId()

  const onEnterPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const newInterests = [...state]
        newInterests.push({ id: interestId, name: e.target.value })
        setState([...newInterests])
        form.resetFields()
      }
    },
    [form, interestId, setState, state]
  )

  return (
    <Form form={form}>
      <Container>
        <Row mb={3}>
          <Col>
            <Form.Item name="name">
              <Input onKeyDown={onEnterPress} placeholder="Enter interest" />
            </Form.Item>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default InterestSimpleForm
