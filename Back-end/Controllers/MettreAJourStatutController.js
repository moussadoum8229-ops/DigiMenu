const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : MISE À JOUR DU STATUT D'UNE COMMANDE (ANNULATION / ADMIN)
// Permet de modifier le statut d'une commande (ex: 'annulee', 'prete', 'en_attente')
// =========================================================================
const mettreAJourStatutCommande = async (req, res) => {
    const { id } = req.params;
    const { statut_commande } = req.body;

    if (!statut_commande) {
        return res.status(400).json({ message: "Le statut est obligatoire." });
    }

    try {
        const [resultat] = await pool.query(
            "UPDATE Commandes SET statut_commande = ? WHERE id_commande = ?",
            [statut_commande, id]
        );

        if (resultat.affectedRows > 0) {
            return res.json({ 
                message: `Statut mis à jour à '${statut_commande}' avec succès !` 
            });
        } else {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
    } catch (erreur) {
        console.error("Erreur lors de la mise à jour du statut :", erreur);
        return res.status(500).json({ message: "Erreur serveur lors de la modification du statut." });
    }
};

module.exports = {
    mettreAJourStatutCommande
};
