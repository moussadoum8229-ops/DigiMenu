const pool = require("../Databases/Data");

// =========================================================================
// CONTRÔLEUR : AJOUT D'UN NOUVEL ADMINISTRATEUR (DigiMenu)
// Table : admin (id, Username, Password, Telephone)
// =========================================================================
const AddAdministrateur = async (req, res) => {
    const { Username, Password, Telephone } = req.body;

    // 1. Validation des champs obligatoires
    if (!Username || !Password) {
        return res.status(400).json({ 
            message: "Le nom d'utilisateur et le mot de passe sont obligatoires." 
        });
    }

    try {
        // 2. Vérifier si le nom d'utilisateur existe déjà
        const [existingAdmin] = await pool.query(
            "SELECT * FROM admin WHERE Username = ?",
            [Username.trim()]
        );

        if (existingAdmin.length > 0) {
            return res.status(409).json({ 
                message: "Ce nom d'utilisateur est déjà utilisé par un autre administrateur." 
            });
        }

        // 3. Insertion du nouvel administrateur dans la table 'admin'
        const [result] = await pool.query(
            "INSERT INTO admin (Username, Password, Telephone) VALUES (?, ?, ?)",
            [Username.trim(), Password, Telephone ? Telephone.trim() : null]
        );

        return res.status(201).json({
            message: "Administrateur ajouté avec succès !",
            adminId: result.insertId
        });

    } catch (error) {
        console.error("Erreur lors de l'ajout de l'administrateur :", error);
        return res.status(500).json({ 
            message: "Erreur serveur lors de la création de l'administrateur." 
        });
    }
};

module.exports = {
    AddAdministrateur
};
