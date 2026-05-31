const pool = require("../Databases/Data");

// Enregistrer une nouvelle commande (relationnelle)
const createOrder = async (req, res) => {
    const { type_commande, numero_table, details_commande, montant_total } = req.body;

    if (!type_commande || !details_commande || !montant_total || !Array.isArray(details_commande)) {
        return res.status(400).json({ message: "Données de commande incomplètes ou invalides." });
    }

    const connection = await pool.getConnection();
    try {
        // Commencer une transaction SQL pour s'assurer que si une insertion échoue, tout s'annule
        await connection.beginTransaction();

        // 1. Insérer la commande principale
        const [orderResult] = await connection.query(
            "INSERT INTO Commandes (type_commande, numero_table, montant_total, statut_commande) VALUES (?, ?, ?, 'en_attente')",
            [type_commande, numero_table || null, montant_total]
        );

        const id_commande = orderResult.insertId;

        // 2. Insérer chaque ligne du panier dans Details_Commande
        const insertDetailsQuery = "INSERT INTO Details_Commande (id_commande, nom_produit, quantite, prix_unitaire) VALUES ?";
        const detailsValues = details_commande.map(item => [
            id_commande,
            item.name,
            item.quantity,
            item.price
        ]);

        await connection.query(insertDetailsQuery, [detailsValues]);

        // Valider la transaction
        await connection.commit();

        return res.status(201).json({ 
            message: "Commande créée avec succès !", 
            orderId: id_commande 
        });
    } catch (error) {
        // En cas d'erreur, on annule toutes les modifications faites lors de cette tentative
        await connection.rollback();
        console.error("Erreur lors de la création de la commande :", error);
        return res.status(500).json({ message: "Erreur lors de l'enregistrement de la commande." });
    } finally {
        connection.release();
    }
};

// Récupérer les commandes en attente avec leurs détails associés
const getPendingOrders = async (req, res) => {
    try {
        // 1. Récupérer les commandes principales
        const [orders] = await pool.query(
            "SELECT * FROM Commandes WHERE statut_commande = 'en_attente' ORDER BY date_commande ASC"
        );

        if (orders.length === 0) {
            return res.json([]);
        }

        // 2. Récupérer tous les détails de commandes en une seule fois
        const orderIds = orders.map(o => o.id_commande);
        const [details] = await pool.query(
            "SELECT * FROM Details_Commande WHERE id_commande IN (?)",
            [orderIds]
        );

        // Groupement des détails par ID de commande pour les attacher proprement
        const ordersWithDetails = orders.map(order => {
            const orderDetails = details.filter(d => d.id_commande === order.id_commande);
            return {
                ...order,
                details_commande: orderDetails
            };
        });

        return res.json(ordersWithDetails);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
    }
};

// Marquer une commande comme prête (et donc la retirer de l'écran cuisine)
const markOrderAsReady = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            "UPDATE Commandes SET statut_commande = 'prete' WHERE id_commande = ?",
            [id]
        );

        if (result.affectedRows > 0) {
            return res.json({ message: "Commande marquée comme prête !" });
        } else {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour du statut." });
    }
};

module.exports = {
    createOrder,
    getPendingOrders,
    markOrderAsReady
};
