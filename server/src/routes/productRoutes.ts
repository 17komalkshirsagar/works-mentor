import { Router } from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories, } from '../controllers/productController'
import { validate } from '../middlewares/validate'
import { createProductValidation, updateProductValidation, getProductValidation, deleteProductValidation, searchProductsValidation, } from '../validators/productValidator'

const router = Router()

router.get('/', searchProductsValidation, validate, getProducts)
router.get('/categories', getCategories)
router.get('/:id', getProductValidation, validate, getProductById)
router.post('/', createProductValidation, validate, createProduct)
router.put('/:id', updateProductValidation, validate, updateProduct)
router.delete('/:id', deleteProductValidation, validate, deleteProduct)

export default router
