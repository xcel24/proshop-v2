import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

//@desc - Fetch all products
//@route - GET /api/products
//@access - public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

//@desc - Fetch product based on id
//@route - GET /api/products/:id
//@access - public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    return res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc - Create new product
//@route - POST /api/products
//@access - Private and Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()

  res.status(201).json(createdProduct)
})

//@desc - Delete product based on id
//@route - DELETE /api/products/:id
//@access - Private and Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.deleteOne({ id: req.params.id })
    res.status(202).json({
      message: 'Successfully deleted',
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc - Update product based on id
//@route - PUT /api/products/:id
//@access - Private and Admin
const updateProductById = asyncHandler(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.description = description
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()

    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  createProduct,
}
