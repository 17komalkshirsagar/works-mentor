import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db'
import productRoutes from './routes/productRoutes'
import { errorHandler } from './middlewares/errorHandler'
import { FRONTEND_URL, NODE_ENV, PORT } from './config/env'

const app = express()

app.use(cors({ origin: FRONTEND_URL }))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' })
})

app.use('/api/products', productRoutes)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

app.use(errorHandler)

const startServer = async (): Promise<void> => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1)
  }
};

startServer()

export default app
