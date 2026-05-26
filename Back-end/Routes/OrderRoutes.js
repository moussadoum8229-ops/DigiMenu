const express = require('express');
const router = express.Router();
const { createOrder, getPendingOrders, markOrderAsReady } = require('../Controllers/OrderController');

// Routes pour les commandes (monté sur /api/orders dans App.js)
router.post('/', createOrder);
router.get('/', getPendingOrders);
router.put('/:id/ready', markOrderAsReady);

module.exports = router;
