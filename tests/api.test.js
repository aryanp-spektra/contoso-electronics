require('./setup');
const request = require('supertest');
const app = require('../server/src/app');
const Product = require('../server/src/models/Product');
const Order = require('../server/src/models/Order');

describe('Products API', () => {
  it('GET /api/products returns empty array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/products creates a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Test Product', price: 29.99, description: 'A test item' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price).toBe(29.99);
    expect(res.body._id).toBeDefined();
  });

  it('GET /api/products returns created products', async () => {
    await Product.create({ name: 'Item A', price: 10 });
    await Product.create({ name: 'Item B', price: 20 });
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('DELETE /api/products/:id deletes a product', async () => {
    const product = await Product.create({ name: 'To Delete', price: 5 });
    const res = await request(app).delete(`/api/products/${product._id}`);
    expect(res.status).toBe(200);
    const check = await Product.findById(product._id);
    expect(check).toBeNull();
  });

  it('DELETE /api/products/:id returns 404 for missing product', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).delete(`/api/products/${fakeId}`);
    expect(res.status).toBe(404);
  });
});

describe('Orders API', () => {
  it('POST /api/orders creates an order', async () => {
    const p1 = await Product.create({ name: 'Widget', price: 15 });
    const p2 = await Product.create({ name: 'Gadget', price: 25 });

    const res = await request(app)
      .post('/api/orders')
      .send({
        items: [
          { productId: p1._id, quantity: 2 },
          { productId: p2._id, quantity: 1 }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body.totalAmount).toBe(55);
    expect(res.body.items).toHaveLength(2);
  });

  it('POST /api/orders rejects empty items', async () => {
    const res = await request(app).post('/api/orders').send({ items: [] });
    expect(res.status).toBe(400);
  });

  it('GET /api/orders/:id returns an order', async () => {
    const p = await Product.create({ name: 'Thing', price: 10 });
    const order = await Order.create({
      items: [{ productId: p._id, quantity: 3 }],
      totalAmount: 30
    });

    const res = await request(app).get(`/api/orders/${order._id}`);
    expect(res.status).toBe(200);
    expect(res.body.totalAmount).toBe(30);
  });

  it('GET /api/orders/:id returns 404 for missing order', async () => {
    const res = await request(app).get('/api/orders/507f1f77bcf86cd799439011');
    expect(res.status).toBe(404);
  });
});

describe('Health endpoint', () => {
  it('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.db).toBe('connected');
  });
});
