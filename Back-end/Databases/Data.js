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

// Fonction pour tester la connexion au démarrage
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connexion à la base de données MySQL réussie (XAMPP) !');
        connection.release();
    } catch (err) {
        console.error(' Erreur de connexion à la base de données MySQL :', err.message);
        console.error(' Assurez-vous que XAMPP est démarré et que la base de données "' + (process.env.DB_NAME || 'digimenu_db') + '" existe.');
    }
}

testConnection();

module.exports = pool;
