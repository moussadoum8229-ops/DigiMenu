const pool = require("../Databases/Data");

const Auth = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Les données saisies sont incorrectes." });
    }

    try {
        // 1. Recherche dans la table cuisine
        const [cuisineRows] = await pool.query(
            "SELECT * FROM cuisine WHERE Username = ? AND password = ?",
            [username, password]
        );

        if (cuisineRows.length > 0) {
            return res.json({ message: "success", role: "cuisine" });
        }

        // 2. Recherche dans la table admin
        const [adminRows] = await pool.query(
            "SELECT * FROM admin WHERE Username = ? AND Password = ?",
            [username, password]
        );

        if (adminRows.length > 0) {
            const admin = adminRows[0];
            const nameToDisplay = admin.Nom || admin.Username || 'Administrateur';
            return res.json({ message: "success", role: "admin", adminName: nameToDisplay });
        }

        // Si aucun n'est trouvé
        return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });

    } catch (error) {
        console.error("Erreur d'authentification :", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    Auth
};
