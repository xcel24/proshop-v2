import { useEffect, useState } from 'react'
import { Col, Row, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useUpdateMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'

import { FaTimes } from 'react-icons/fa'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateMutation()

  const {
    data: orders,
    isLoading: ordersLoading,
    error,
  } = useGetMyOrdersQuery()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.name, userInfo.email])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap()

        dispatch(setCredentials(res))
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  console.log(orders)

  return (
    <Row className='mb-3'>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='my-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='my-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='my-3' controlId='name'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='my-3' controlId='name'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='text'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-2'>
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped responsive hover className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.orderItems.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{orders.createdAt.substr(0, 10)}</td>
                  <td>&#8377;{order.price}</td>
                  <td>
                    {orders.isPaid ? (
                      orders.paidAt
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {orders.isDelivered ? (
                      orders.deliveredAt
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
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
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
