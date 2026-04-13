# Works Mentor Task

A full-stack product inventory management application with React frontend and Node.js/Express backend.

## Project Structure

```
works-mentor/
├── client/          # React + TypeScript frontend
├── server/          # Node.js + Express backend
├── README.md        # This file
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Environment Setup

Copy the example environment files and update with your values:

### Server

```bash
cp server/.env.example server/.env
```

Update `MONGODB_URI` in `server/.env` to point to your MongoDB instance (local or MongoDB Atlas).

### Client

```bash
cp client/.env.example client/.env
```

Update the URLs in `client/.env` if your server runs on a different port.

## Installation

### Install Server Dependencies

```bash
cd server
npm install
```

### Install Client Dependencies

```bash
cd client
npm install
```

## Database Seeding

To seed the database with 10 sample products:

```bash
cd server
npm run seed
```

This will:
1. Connect to MongoDB
2. Delete all existing products
3. Insert 10 new sample products

## Starting the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173` (or next available port)

## Available Scripts

### Server

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Seed database with sample products |

### Client

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports pagination, search, category filter) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/categories` | Get all unique categories |

### Query Parameters for GET /products

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `search` | string | Search by name or description |
| `category` | string | Filter by category |

## Features

- **Product Management**: Create, read, update, delete products
- **Search & Filter**: Search by name/description, filter by category
- **Pagination**: Backend-powered pagination with limit selector (5/10/15/20)
- **Debounced Search**: 300ms debounce on search input
- **Toast Notifications**: Success/error feedback using Sonner
- **Responsive UI**: Mobile-friendly design with shadcn/ui components

## Technology Stack

### Frontend
- React 19
- TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS
- shadcn/ui
- Sonner (toast notifications)
- React Hook Form + Zod

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- TypeScript
- Express Validator