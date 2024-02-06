import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { saveShippingAddress } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress({ address, city, postalCode, country }))

    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className='mt-3'>Shipping Address</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='my-3' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-3' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-2'>
          Checkout
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
