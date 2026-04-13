import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT || '5000', 10)
export const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : "http://localhost:5173"
