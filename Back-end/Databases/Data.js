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
        
        // Création automatique de la table orders si elle n'existe pas
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS \`orders\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`order_type\` VARCHAR(50) NOT NULL,
                \`table_number\` VARCHAR(50) DEFAULT NULL,
                \`delivery_address\` TEXT DEFAULT NULL,
                \`phone_number\` VARCHAR(50) DEFAULT NULL,
                \`items\` LONGTEXT NOT NULL,
                \`total\` INT NOT NULL,
                \`status\` VARCHAR(50) DEFAULT 'en_attente',
                \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await connection.query(createTableQuery);
        console.log('✅ Table "orders" vérifiée / créée avec succès.');
        
        connection.release();
    } catch (err) {
        console.error('❌ Erreur de connexion à la base de données MySQL :', err.message);
        console.error('👉 Assurez-vous que XAMPP est démarré et que la base de données "' + (process.env.DB_NAME || 'digimenu_db') + '" existe.');
    }
}

testConnection();

module.exports = pool;
