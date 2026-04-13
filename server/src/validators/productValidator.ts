import { body, param, query, ValidationChain } from 'express-validator';

export const createProductValidation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 100 }).withMessage('Product name cannot exceed 100 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
]

export const updateProductValidation: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid product ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Product name cannot exceed 100 characters'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
]

export const getProductValidation: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid product ID'),
]

export const deleteProductValidation: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid product ID'),
]

export const searchProductsValidation: ValidationChain[] = [
  query('search').optional().trim(),
  query('category').optional().trim(),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
]
