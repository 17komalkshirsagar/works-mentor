import { Types } from 'mongoose';

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
}

export interface IProductQuery {
  search?: string;
  category?: string;
  page?: string;
  limit?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
