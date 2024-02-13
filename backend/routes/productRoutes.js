import express from 'express'
import {
  createProduct,
  createProductReview,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../controller/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProductById)

router.post('/:id/reviews', protect, createProductReview)

export default router
