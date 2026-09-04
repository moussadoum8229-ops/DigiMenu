const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : MARQUER COMMANDE COMME PRÊTE (CUISINE)
// Change le statut d'une commande à 'prete' pour la comptabiliser au restaurant
// =========================================================================
const marquerCommandePrete = async (req, res) => {
    const { id } = req.params;

    try {
        const [resultat] = await pool.query(
            "UPDATE Commandes SET statut_commande = 'prete' WHERE id_commande = ?",
            [id]
        );

        if (resultat.affectedRows > 0) {
            return res.json({ message: "Commande marquée comme prête !" });
        } else {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
    } catch (erreur) {
        console.error("Erreur lors de la validation de la commande en cuisine :", erreur);
        return res.status(500).json({ message: "Erreur serveur lors de la mise à jour du statut." });
    }
};

module.exports = {
    marquerCommandePrete
};
