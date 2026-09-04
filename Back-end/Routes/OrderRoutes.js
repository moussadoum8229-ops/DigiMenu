const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getPendingOrders, 
    getAllOrders, 
    markOrderAsReady, 
    updateOrderStatus 
} = require('../Controllers/OrderController');

// Routes pour les commandes (monté sur /api/orders dans Serveur.js)
router.post('/', createOrder);
router.get('/', getPendingOrders); // Commandes en attente (ex: Cuisine)
router.get('/all', getAllOrders); // Toutes les commandes (pour l'administration)
router.put('/:id/ready', markOrderAsReady);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
