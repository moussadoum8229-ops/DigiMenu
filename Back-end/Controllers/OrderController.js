const pool = require("../Databases/Data");

// Enregistrer une nouvelle commande
const createOrder = async (req, res) => {
    const { order_type, table_number, delivery_address, phone_number, items, total } = req.body;

    if (!order_type || !items || !total) {
        return res.status(400).json({ message: "Données de commande incomplètes." });
    }

    try {
        const itemsString = JSON.stringify(items);
        const [result] = await pool.query(
            "INSERT INTO orders (order_type, table_number, delivery_address, phone_number, items, total, status) VALUES (?, ?, ?, ?, ?, ?, 'en_attente')",
            [order_type, table_number || null, delivery_address || null, phone_number || null, itemsString, total]
        );

        return res.status(201).json({ 
            message: "Commande créée avec succès !", 
            orderId: result.insertId 
        });
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        return res.status(500).json({ message: "Erreur lors de l'enregistrement de la commande." });
    }
};

// Récupérer les commandes en attente (ordonnées par les plus anciennes d'abord)
const getPendingOrders = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM orders WHERE status = 'en_attente' ORDER BY created_at ASC"
        );

        // Décoder les articles au format JSON pour chaque commande
        const orders = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items)
        }));

        return res.json(orders);
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
            "UPDATE orders SET status = 'pret' WHERE id = ?",
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
