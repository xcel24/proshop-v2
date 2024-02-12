import { Button, Container, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetAllOrdersQuery } from '../slices/orderApiSlice'
import { FaTimes } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery()

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
  ) : (
    <Container>
      <h2 className='mb-3'>Orders</h2>
      <Table striped responsive hover className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>{order.createdAt.substr(0, 10)}</td>
              <td> &#8377; {order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substr(0, 10)
                ) : (
                  <FaTimes color='red' />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substr(0, 10)
                ) : (
                  <FaTimes color='red' />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default OrderListScreen
