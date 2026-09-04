// =========================================================================
// CONTRÔLEUR CENTRAL DES COMMANDES (DigiMenu)
// Ce fichier réexporte tous les contrôleurs individuels réorganisés par module
// avec des notations et documentations claires en français.
// =========================================================================

const { creerCommande } = require("./CreerCommandeController");
const { obtenirCommandesEnAttente } = require("./CommandesEnAttenteController");
const { obtenirToutesLesCommandes } = require("./ToutesLesCommandesController");
const { marquerCommandePrete } = require("./MarquerCommandePreteController");
const { mettreAJourStatutCommande } = require("./MettreAJourStatutController");

module.exports = {
    // Fonctions avec nommage en français
    creerCommande,
    obtenirCommandesEnAttente,
    obtenirToutesLesCommandes,
    marquerCommandePrete,
    mettreAJourStatutCommande,

    // Alias pour conserver la compatibilité avec les routes existantes
    createOrder: creerCommande,
    getPendingOrders: obtenirCommandesEnAttente,
    getAllOrders: obtenirToutesLesCommandes,
    markOrderAsReady: marquerCommandePrete,
    updateOrderStatus: mettreAJourStatutCommande
};

