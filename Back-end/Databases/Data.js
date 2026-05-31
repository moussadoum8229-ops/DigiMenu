const mysql = require('mysql2/promise');
require('dotenv').config();

// Création du pool de connexions
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'digimenu_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fonction pour tester la connexion au démarrage et créer les tables requises
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connexion à la base de données MySQL réussie (XAMPP) !');
        // Création automatique de la table Commandes si elle n'existe pas
        const createCommandesTableQuery = `
            CREATE TABLE IF NOT EXISTS \`Commandes\` (
                \`id_commande\` INT AUTO_INCREMENT PRIMARY KEY,
                \`type_commande\` VARCHAR(20) NOT NULL,
                \`numero_table\` INT DEFAULT NULL,
                \`montant_total\` DECIMAL(10,2) NOT NULL,
                \`statut_commande\` VARCHAR(20) DEFAULT 'en_attente',
                \`date_commande\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;

        // Création automatique de la table Details_Commande si elle n'existe pas
        const createDetailsTableQuery = `
            CREATE TABLE IF NOT EXISTS \`Details_Commande\` (
                \`id_detail\` INT AUTO_INCREMENT PRIMARY KEY,
                \`id_commande\` INT NOT NULL,
                \`nom_produit\` VARCHAR(100) NOT NULL,
                \`quantite\` INT NOT NULL,
                \`prix_unitaire\` DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (\`id_commande\`) REFERENCES \`Commandes\`(\`id_commande\`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        
        await connection.query(createCommandesTableQuery);
        await connection.query(createDetailsTableQuery);
        console.log('✅ Tables "Commandes" et "Details_Commande" vérifiées / créées avec succès.');
        
        connection.release();
    } catch (err) {
        console.error('❌ Erreur de connexion à la base de données MySQL :', err.message);
        console.error('👉 Assurez-vous que XAMPP est démarré et que la base de données "' + (process.env.DB_NAME || 'digimenu_db') + '" existe.');
    }
}

testConnection();

module.exports = pool;
