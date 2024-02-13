import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../slices/productsApiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from './Paginate'

const ProductListScreen = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  })

  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation()

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

  const createProductHandler = async () => {
    try {
      await createProduct()

      refetch()

      toast.success('Product Created Successfully')
    } catch (error) {}
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading || deleteLoading || createProductLoading ? (
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
            {data.products.map((product) => (
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
      <Paginate pages={data.pages} page={data.page} isAdmin={true} />
    </>
  )
}

export default ProductListScreen
