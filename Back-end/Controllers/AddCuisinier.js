const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : AJOUT D'UN NOUVEAU CUISINIER (DigiMenu)
// Table : cuisine (Username, Password, Telephone)
// =========================================================================
const AddCuisinier = async (req, res) => {
    const { Username, Password, Telephone } = req.body;

    // 1. Validation des champs obligatoires
    if (!Username || !Password) {
        return res.status(400).json({ 
            message: "Le nom d'utilisateur et le mot de passe sont obligatoires." 
        });
    }

    try {
        // 2. Vérifier si le cuisinier existe déjà
        const [existingCuisine] = await pool.query(
            "SELECT * FROM cuisine WHERE Username = ?",
            [Username.trim()]
        );

        if (existingCuisine.length > 0) {
            return res.status(409).json({ 
                message: "Ce nom d'utilisateur est déjà utilisé par un autre cuisinier." 
            });
        }

        // 3. Insertion du cuisinier dans la table 'cuisine'
        const [result] = await pool.query(
            "INSERT INTO cuisine (Username, password, Telephone) VALUES (?, ?, ?)",
            [Username.trim(), Password, Telephone ? Telephone.trim() : null]
        );

        return res.status(201).json({
            message: "Cuisinier ajouté avec succès !",
            cuisinierId: result.insertId
        });

    } catch (error) {
        console.error("Erreur lors de l'ajout du cuisinier :", error);
        return res.status(500).json({ 
            message: "Erreur serveur lors de la création du cuisinier." 
        });
    }
};

// Obtenir le nombre et la liste des cuisiniers
const GetCuisiniers = async (req, res) => {
    try {
        const [cuisiniers] = await pool.query(
            "SELECT Username, Telephone FROM cuisine ORDER BY Username ASC"
        );
        return res.json(cuisiniers);
    } catch (error) {
        console.error("Erreur lors de la récupération des cuisiniers :", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    AddCuisinier,
    GetCuisiniers
};
