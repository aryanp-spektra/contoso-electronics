const Product = require('../models/Product');

const defaultProducts = [
{
    name: 'Surface Laptop Studio 2',
    description: 'Powerful performance meets versatile design. 14.4" touchscreen, Intel Core i7, 16GB RAM.',
    price: 1599.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/8246861544098682105_0'
  },
  {
    name: 'Xbox Wireless Controller',
    description: 'Enhanced comfort and grip with textured triggers. Bluetooth and USB-C connectivity.',
    price: 59.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/15409931682576260248_0'
  },
  {
    name: 'Surface Pro 10',
    description: 'Ultra-light 2-in-1 laptop with 13" PixelSense display. Built for business with AI-powered features.',
    price: 1199.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/8481336471245134340_0'
  },
  {
    name: 'Arc Mouse',
    description: 'Sleant, ergonomic mouse that snaps flat for easy portability. Bluetooth connectivity.',
    price: 79.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/17144921386577908548_0'
  },
  {
    name: 'Surface Headphones 2+',
    description: 'Premium noise-cancelling headphones with 13 levels of adjustable ANC and rich Omnisonic sound.',
    price: 299.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/8156465538663653765_0'
  },
  {
    name: 'Surface Dock 2',
    description: 'Transform your Surface into a full desktop. Dual 4K monitor support, USB-C, and 199W power.',
    price: 259.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/10736618224728523630_0'
  },
  {
    name: 'Ergonomic Keyboard',
    description: 'Split keyset design with cushioned palm rest for all-day comfort. Bluetooth wireless.',
    price: 129.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/5772874934767036295_0'
  },
  {
    name: 'Surface Thunderbolt 4 Dock',
    description: 'Connect to multiple displays and accessories with Thunderbolt 4. Compact, enterprise-grade dock.',
    price: 349.99,
    imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/9399113908891571601_0'
  }
];

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(defaultProducts);
      console.log(`Seeded ${defaultProducts.length} default products`);
    } else {
      console.log(`Database already has ${count} products — skipping seed`);
    }
  } catch (err) {
    console.error('Seed failed:', err.message);
  }
};

module.exports = seedProducts;
