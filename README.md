# Contoso Electronics — Monolith

A full-stack e-commerce application built as a single deployable unit. React frontend, Express.js backend, and MongoDB for data storage — all packaged together.

---

## Application Overview

This is a traditional monolithic web application for an electronics store. The **Express.js server** handles all API logic (products, orders) and also serves the **React frontend** as static files. The entire application connects to a **single MongoDB database** and runs on **one port**.

From a deployment perspective — there is **one codebase, one Dockerfile, one image, one running process**. Everything lives together.

---

## Architecture

```
┌─────────────────────────────────────┐
│            Docker Container         │
│                                     │
│   React (static)  ──►  Express.js  │
│                         (port 3000) │
│                            │        │
│                            ▼        │
│                        MongoDB      │
│                     (external DB)   │
└─────────────────────────────────────┘
```

- The React frontend is built at **Docker build time** and bundled into the image.
- The Express server serves both the static frontend and the REST API.
- MongoDB runs externally — the app connects via a connection string.

---

## Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| React Frontend | `client/` | User-facing storefront (products, cart, orders) |
| Express Backend | `server/` | REST API for products and orders |
| Mongoose Models | `server/src/models/` | Database schemas for Product and Order |
| Dockerfile | `Dockerfile` | Multi-stage build — compiles React, then packages the server |
| Tests | `tests/` | API integration tests using Jest |

---

## What You Should Know

- The app exposes port **3000**.
- It requires **one environment variable** to connect to a database: `MONGO_URI`.
- The `Dockerfile` is a **multi-stage build** — stage 1 builds the React app, stage 2 runs the Node.js server with the compiled frontend.
- A `/health` endpoint is available — useful for liveness and readiness probes.
- The application is compatible with **Azure Cosmos DB (MongoDB API)** — no code changes needed.
- Tests run in isolation using an in-memory MongoDB instance — no external database required for testing.

---

## Project Structure

```
├── client/               # React frontend source
│   ├── src/
│   │   ├── pages/        # Home, Admin, Cart, OrderConfirmation
│   │   ├── api.js        # API client (calls /api/*)
│   │   └── App.js        # Main app with routing
│   └── package.json
├── server/               # Express backend
│   └── src/
│       ├── server.js     # Entry point
│       ├── app.js        # Express setup + middleware
│       ├── config/       # Database connection logic
│       ├── models/       # Product.js, Order.js (Mongoose)
│       ├── controllers/  # Business logic handlers
│       └── routes/       # API route definitions
├── tests/                # Integration tests
├── Dockerfile            # Multi-stage Docker build
├── .env.example          # Environment variable reference
└── package.json          # Root package.json with scripts
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create a product |
| `DELETE` | `/api/products/:id` | Delete a product |
| `POST` | `/api/orders` | Place an order |
| `GET` | `/api/orders/:id` | Get order details |
| `GET` | `/health` | Health check |

---

## Hints

- Look at the `Dockerfile` to understand how the image is assembled.
- Check `.env.example` to see what configuration the app expects at runtime.
- The application listens on a single port — keep that in mind when configuring services, load balancers, or ingress rules.
- For Azure deployments, the only thing that changes is the `MONGO_URI` — point it to Cosmos DB.
