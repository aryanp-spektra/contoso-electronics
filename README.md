# E-Commerce Lite (Monolith)

Full-stack e-commerce application — React frontend, Express backend, MongoDB database. Single deployable service.

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Copy env and configure
cp .env.example .env

# Build the React client
npm run build

# Start the server
npm start
```

The app runs at `http://localhost:3000`.

## Development

```bash
# Terminal 1 — backend with hot reload
npm run dev:server

# Terminal 2 — React dev server (proxies API to :3000)
npm run dev:client
```

## Environment Variables

| Variable    | Description              | Default                                  |
|-------------|--------------------------|------------------------------------------|
| `PORT`      | Server port              | `3000`                                   |
| `MONGO_URI` | MongoDB connection string| `mongodb://localhost:27017/ecommerce`    |

## API Endpoints

| Method | Path                | Description         |
|--------|---------------------|---------------------|
| GET    | `/api/products`     | List all products   |
| POST   | `/api/products`     | Create a product    |
| DELETE | `/api/products/:id` | Delete a product    |
| POST   | `/api/orders`       | Place an order      |
| GET    | `/api/orders/:id`   | Get order details   |
| GET    | `/health`           | Health check        |

## Tests

```bash
npm test
```

Uses Jest + supertest with mongodb-memory-server (no external DB required).

## Docker

```bash
docker build -t ecommerce-monolith .
docker run -p 3000:3000 -e MONGO_URI=mongodb://host.docker.internal:27017/ecommerce ecommerce-monolith
```

## Project Structure

```
├── client/              React frontend
│   ├── public/
│   └── src/
│       ├── pages/       Route pages (Home, Admin, Cart, OrderConfirm)
│       ├── api.js       API client
│       ├── CartContext.js
│       └── App.js
├── server/
│   └── src/
│       ├── app.js       Express app setup
│       ├── server.js    Entry point
│       ├── config/      DB connection
│       ├── controllers/ Route handlers
│       ├── middleware/   Error handler
│       ├── models/      Mongoose schemas
│       └── routes/      Express routes
├── tests/               API tests
├── Dockerfile           Multi-stage Docker build
└── package.json
```
