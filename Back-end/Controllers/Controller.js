const pool = require("../Databases/Data");

const Auth = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "les données saisies sont fausses, cuisinier inconnu" });
    }

    try {
        // Recherche dans la table cuisine si le nom d'utilisateur et le mot de passe correspondent
        const [rows] = await pool.query(
            "SELECT * FROM cuisine WHERE Username = ? AND password = ?",
            [username, password]
        );

        if (rows.length > 0) {
            return res.json({ message: "success" });
        } else {
            return res.status(401).json({ message: "les données saisies sont fausses, cuisinier inconnu" });
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    Auth
};
