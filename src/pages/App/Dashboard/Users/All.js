import { PageWrapper, Button } from '@qonsoll/react-design'
import UsersList from '../../../../domains/User/components/UsersList'
// import { useUserActions } from '../../../../domains/User/hooks'

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
          <Button type="primary" onClick={redirectToCreate}>
            Create
          </Button>
        </>
      }
    >
      <UsersList />
    </PageWrapper>
  )
}

export default Users
