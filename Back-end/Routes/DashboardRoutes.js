const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../Controllers/DashboardController');

// Route pour obtenir les statistiques du tableau de bord (monté sur /api/dashboard dans Serveur.js)
router.get('/stats', getDashboardStats);

module.exports = router;
