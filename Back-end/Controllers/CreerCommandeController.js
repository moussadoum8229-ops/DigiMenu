const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : CRÉATION D'UNE COMMANDE (CLIENT)
// Insère la commande et tous ses articles associés via une transaction SQL
// =========================================================================
const creerCommande = async (req, res) => {
    const { type_commande, numero_table, adresse_livraison, telephone_client, details_commande, montant_total } = req.body;

    // Validation des données requises
    if (!type_commande || !details_commande || !montant_total || !Array.isArray(details_commande) || details_commande.length === 0) {
        return res.status(400).json({ message: "Données de commande incomplètes ou invalides." });
    }

    const connection = await pool.getConnection();
    let isTransactionActive = false;
    
    try {
        await connection.beginTransaction();
        isTransactionActive = true;

        // 1. Insérer la commande principale dans la table Commandes
        const [resultatCommande] = await connection.query(
            "INSERT INTO Commandes (type_commande, numero_table, adresse_livraison, telephone_client, montant_total, statut_commande) VALUES (?, ?, ?, ?, ?, 'en_attente')",
            [type_commande, numero_table || null, adresse_livraison || null, telephone_client || null, montant_total]
        );

        const id_commande = resultatCommande.insertId;

        // 2. Insérer chaque ligne d'article dans la table Details_Commande
        const requeteDetails = "INSERT INTO Details_Commande (id_commande, nom_produit, quantite, prix_unitaire) VALUES ?";
        const valeursDetails = details_commande.map(item => [
            id_commande,
            item.name || item.nom,
            item.quantity || item.quantite,
            item.price || item.prix
        ]);

        await connection.query(requeteDetails, [valeursDetails]);

        // Valider la transaction complète
        await connection.commit();
        isTransactionActive = false;

        return res.status(201).json({ 
            message: "Commande créée avec succès !", 
            orderId: id_commande 
        });
    } catch (erreur) {
        // En cas d'erreur, annulation des opérations
        if (isTransactionActive) {
            try {
                await connection.rollback();
            } catch (rollbackErreur) {
                console.error("Erreur critique lors du rollback :", rollbackErreur);
            }
        }
        console.error("Erreur lors de la création de la commande :", erreur);
        return res.status(500).json({ message: "Erreur lors de l'enregistrement de la commande." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    creerCommande
};
