import { Product } from './models/Product'
import { connectDB } from './config/db'

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 2499,
    quantity: 50,
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    name: 'Cotton T-Shirt',
    category: 'Clothing',
    price: 599,
    quantity: 100,
    description: 'Comfortable pure cotton t-shirt available in multiple colors',
  },
  {
    name: 'Organic Green Tea',
    category: 'Food & Beverages',
    price: 299,
    quantity: 75,
    description: 'Premium organic green tea leaves from Assam',
  },
  {
    name: 'Running Shoes',
    category: 'Sports',
    price: 3499,
    quantity: 30,
    description: 'Lightweight running shoes with excellent cushioning',
  },
  {
    name: 'Stainless Steel Water Bottle',
    category: 'Home & Garden',
    price: 499,
    quantity: 60,
    description: '1.5L insulated water bottle, keeps drinks cold for 24 hours',
  },
  {
    name: 'Programming Fundamentals Book',
    category: 'Books',
    price: 899,
    quantity: 25,
    description: 'Complete guide to programming concepts and practices',
  },
  {
    name: 'Yoga Mat',
    category: 'Sports',
    price: 799,
    quantity: 40,
    description: 'Non-slip yoga mat with carrying strap',
  },
  {
    name: 'LED Desk Lamp',
    category: 'Electronics',
    price: 1299,
    quantity: 35,
    description: 'Adjustable LED desk lamp with multiple brightness levels',
  },
  {
    name: 'Denim Jeans',
    category: 'Clothing',
    price: 1499,
    quantity: 45,
    description: 'Classic fit denim jeans with stretch comfort',
  },
  {
    name: 'Coffee Maker',
    category: 'Home & Garden',
    price: 2499,
    quantity: 20,
    description: 'Automatic coffee maker with timer and thermal carafe',
  },
]

async function seed() {
  try {
    await connectDB()
    
    await Product.deleteMany({})
    console.log('Existing products deleted')
    
    await Product.insertMany(products)
    console.log('10 products seeded successfully')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding products:', error)
    process.exit(1)
  }
}

seed()