const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : COMMANDES EN ATTENTE (CUISINE)
// Récupère uniquement les commandes en attente avec leurs détails associés
// =========================================================================
const obtenirCommandesEnAttente = async (req, res) => {
    try {
        // 1. Récupérer les commandes principales dont le statut est 'en_attente'
        const [commandes] = await pool.query(
            "SELECT * FROM Commandes WHERE statut_commande = 'en_attente' ORDER BY date_commande ASC"
        );

        if (commandes.length === 0) {
            return res.json([]);
        }

        // 2. Récupérer tous les détails des commandes trouvées
        const identifiantsCommandes = commandes.map(c => c.id_commande);
        const [details] = await pool.query(
            "SELECT * FROM Details_Commande WHERE id_commande IN (?)",
            [identifiantsCommandes]
        );

        // Grouper les détails avec chaque commande
        const commandesAvecDetails = commandes.map(commande => {
            const detailsDeLaCommande = details.filter(d => d.id_commande === commande.id_commande);
            return {
                ...commande,
                details_commande: detailsDeLaCommande
            };
        });

        return res.json(commandesAvecDetails);
    } catch (erreur) {
        console.error("Erreur lors de la récupération des commandes en attente :", erreur);
        return res.status(500).json({ message: "Erreur lors de la récupération des commandes en attente." });
    }
};

module.exports = {
    obtenirCommandesEnAttente
};
