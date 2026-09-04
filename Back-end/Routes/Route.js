const express = require('express');
const router = express.Router();
const { Auth } = require('../Controllers/Controller');
const { AddAdministrateur } = require('../Controllers/AddAdministrateur');
const { AddCuisinier, GetCuisiniers } = require('../Controllers/AddCuisinier');

// Route d'authentification (POST /Auth)
router.post('/', Auth);

// Routes Administrateurs
router.post('/add-admin', AddAdministrateur);

// Routes Cuisiniers
router.post('/add-cuisinier', AddCuisinier);
router.get('/cuisiniers', GetCuisiniers);
    
module.exports = router;


