const express = require('express');
const router = express.Router();
const { Auth } = require('../Controllers/Controller');

// Authentication Route (monté sur /Auth dans App.js)
router.post('/', Auth);
    
module.exports = router;
