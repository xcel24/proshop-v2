import { Carousel, Image } from 'react-bootstrap'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'
import Loader from './Loader'
import Message from './Message'
import { Link } from 'react-router-dom'

const ProductCarousel = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery()
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={'danger'}>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
          <Carousel.Caption className='carousel-caption'>
            <h2>
              {product.name} &#8377;{product.price}
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
