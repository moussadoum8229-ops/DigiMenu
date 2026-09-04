const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : TOUTES LES COMMANDES (ESPACE ADMIN)
// Récupère l'ensemble des commandes avec leurs articles pour le suivi
// =========================================================================
const obtenirToutesLesCommandes = async (req, res) => {
    try {
        // 1. Récupérer toutes les commandes triées de la plus récente à la plus ancienne
        const [commandes] = await pool.query(
            "SELECT * FROM Commandes ORDER BY date_commande DESC"
        );

        if (commandes.length === 0) {
            return res.json([]);
        }

        // 2. Récupérer les détails de toutes ces commandes
        const identifiantsCommandes = commandes.map(c => c.id_commande);
        const [details] = await pool.query(
            "SELECT * FROM Details_Commande WHERE id_commande IN (?)",
            [identifiantsCommandes]
        );

        // Grouper les détails pour chaque commande
        const commandesAvecDetails = commandes.map(commande => {
            const detailsDeLaCommande = details.filter(d => d.id_commande === commande.id_commande);
            return {
                ...commande,
                details_commande: detailsDeLaCommande
            };
        });

        return res.json(commandesAvecDetails);
    } catch (erreur) {
        console.error("Erreur lors de la récupération de toutes les commandes :", erreur);
        return res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
    }
};

module.exports = {
    obtenirToutesLesCommandes
};
