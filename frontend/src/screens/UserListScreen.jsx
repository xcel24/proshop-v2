import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../slices/usersApiSlice'
import { useSelector } from 'react-redux'

const UserListScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const { data: users, isLoading, error, refetch } = useGetUsersQuery()

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()

  const deleteHandler = async (userId) => {
    if (window.confirm('Are you sure')) {
      try {
        const res = await deleteUser(userId)

        if (res.error) {
          toast.error(res.error.data.message)
        } else {
          toast.success(res.data.message)
        }
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table bordered striped responsive hover className='table-sm mt-3'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck color='green' />
                  ) : (
                    <FaTimes color='red' />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}`}>
                    <Button
                      variant='light'
                      className='btn-sm mx-2'
                      disabled={userInfo._id === user._id}
                    >
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                    disabled={userInfo._id === user._id}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
