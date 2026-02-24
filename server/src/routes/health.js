const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const state = mongoose.connection.readyState;
    if (state !== 1) {
      return res.status(503).json({ status: 'unhealthy', db: 'disconnected' });
    }
    res.json({ status: 'healthy', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'unhealthy', error: err.message });
  }
});

module.exports = router;
