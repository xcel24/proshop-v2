import express from 'express'
import {
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../controller/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProductById)

export default router
