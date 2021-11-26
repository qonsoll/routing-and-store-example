import { PageWrapper, Button } from '@qonsoll/react-design'
import PATHS from '../../../paths'
import { Link } from 'react-router-dom'
import UsersList from '../../../../domains/User/components/UsersList'
// import { useUserActions } from '../../../../domains/User/hooks'

const { USER_CREATE } = PATHS.AUTHENTICATED

const Users = () => {
  // const { redirectToCreate, destroyDirtyUsers } = useUserActions()

  const redirectToCreate = () => {}
  const destroyDirtyUsers = () => {}

  return (
    <PageWrapper
      headingProps={{
        textAlign: 'left',
        title: 'Users',
        titleSize: 3
      }}
      action={
        <>
          <Button onClick={destroyDirtyUsers} mr={'8px'}>
            Clean dirty
          </Button>
          <Link to={USER_CREATE}>
            <Button type="primary" onClick={redirectToCreate}>
              Create
            </Button>
          </Link>
        </>
      }
    >
      <UsersList />
    </PageWrapper>
  )
}

export default Users
