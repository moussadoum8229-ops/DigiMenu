const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionUri = process.env.MYSQL_URL || process.env.DATABASE_URL;

// Support SSL si requis par le cloud MySQL (ex: Aiven, TiDB Cloud, Clever Cloud)
const sslOptions = process.env.DB_SSL === 'true' || process.env.MYSQL_SSL === 'true'
    ? { rejectUnauthorized: false }
    : undefined;

// Création du pool de connexions
const pool = connectionUri
    ? mysql.createPool(connectionUri)
    : mysql.createPool({
        host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
        user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
        password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
        database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'digimenu_db',
        port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
        ssl: sslOptions,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

// Fonction pour tester la connexion au démarrage
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connexion à la base de données MySQL réussie !');
        connection.release();
    } catch (err) {
        console.error(' Erreur de connexion à la base de données MySQL :', err.message);
    }
}

testConnection();

module.exports = pool;
