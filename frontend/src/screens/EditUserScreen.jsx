import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../slices/usersApiSlice'

const EditUserScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { id: userId } = useParams()

  const navigate = useNavigate()

  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      }).unwrap()

      toast.success('User updated')
      refetch()
      navigate('/admin/userlist')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChecked = (e) => {
    console.log(e.target.checked)

    setIsAdmin(e.target.checked)
  }

  return (
    <>
      <Link to={'/admin/userlist'} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading || loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className='my-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter User name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={handleChecked}
              className='mb-3'
            ></Form.Check>

            <div className='d-grid gap-2'>
              <Button variant='primary' size='lg' type='submit'>
                Update User
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUserScreen
