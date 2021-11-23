import {
  LayoutSystemProvider,
  Layout,
  Container,
  Row,
  Col
} from '@qonsoll/react-design'
import AppHeader from '../AppHeader'

const AppLayout = ({ children }) => {
  return (
    <LayoutSystemProvider>
      <Layout header={<AppHeader />}>
        <Container bounded>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </Layout>
    </LayoutSystemProvider>
  )
}

export default AppLayout
