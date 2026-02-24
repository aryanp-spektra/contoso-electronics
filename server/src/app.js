const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const healthRoute = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('short'));
app.use(express.json());

app.use('/health', healthRoute);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const clientBuild = path.join(__dirname, '../../client/build');
app.use(express.static(clientBuild));
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

app.use(errorHandler);

module.exports = app;
