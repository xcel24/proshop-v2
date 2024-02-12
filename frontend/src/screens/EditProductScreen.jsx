import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useEffect, useState } from 'react'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const { id: productId } = useParams()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId)

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()

  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
      setCategory(product.category)
      setDescription(product.description)
    }
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        countInStock,
        category,
        description,
      }).unwrap()

      toast.success('Product updated')
      refetch()
      navigate('/admin/productlist')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()

    formData.append('image', e.target.files[0])
    try {
      const res = await uploadImage(formData).unwrap()
      setImage(res.image)
      toast.success(res.message)
    } catch (error) {
      toast.error(error.error)
    }
  }

  return (
    <>
      <Link to={'/admin/productlist'} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoading || loadingUpdate || uploadLoading ? (
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
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter product price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='my-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Upload Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='choose file'
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-3' controlId='count-in-stock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-2'>
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProductScreen
