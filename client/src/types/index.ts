export interface Product {
  id?: string;
  _id?: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
  pagination?: Pagination;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
