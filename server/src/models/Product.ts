import mongoose, { Schema, Document, Model } from 'mongoose';
import { IProduct } from '../types';

export interface ProductDocument extends Omit<IProduct, '_id'>, Document { }

interface ProductModel extends Model<ProductDocument> { }

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      integer: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
  },
  { timestamps: true, }
);

productSchema.index({ name: 'text', category: 1 })
productSchema.index({ name: 1 })
productSchema.index({ category: 1 })

export const Product = mongoose.model<ProductDocument, ProductModel>('Product', productSchema)
