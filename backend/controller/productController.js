import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

//@desc - Fetch all products
//@route - GET /api/products
//@access - public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  console.log('params are', req.params)
  console.log('query are', req.query)

  const count = await Product.countDocuments()
  const products = await Product.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

//@desc - Create review of product
//@route - POST /api/products/:id/reviews
//@access - Private and Admin
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    } else {
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.numReviews

      await product.save()

      res.status(201).json({ message: 'Review added' })
    }
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
  createProductReview,
}
