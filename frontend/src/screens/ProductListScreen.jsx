import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../slices/productsApiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery()

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation()

  const deleteHandler = async (productId) => {
    try {
      const {
        data: { message },
      } = await deleteProduct(productId)

      refetch()

      toast.success(message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm'>
            <FaEdit /> Create Product
          </Button>
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>&#8377; {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen
