import { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    //here we are just defining the function
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    //let's call the function
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
