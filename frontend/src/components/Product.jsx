import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </Link>
      <Card.Body>
        <Card.Title as={'div'}>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
          >
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>

        <Card.Text as={'div'}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as={'h3'} className='mt-2'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
