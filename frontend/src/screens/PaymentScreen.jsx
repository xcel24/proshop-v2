import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'
import { Button, Col, Form, Row } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod({ paymentMethod }))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as={'legend'}>Select Method</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type='radio'
                className='my-2'
                label='Paypal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value={'PayPal'}
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Row>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
