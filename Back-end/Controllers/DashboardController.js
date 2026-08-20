const pool = require("../Databases/Data");

const getDashboardStats = async (req, res) => {
    try {
        // Obtenir la date d'aujourd'hui pour MySQL
        const todayStr = new Date().toISOString().split('T')[0];
        
        // Requête pour Revenu Journalier (Commandes d'aujourd'hui)
        const [dailyRevResult] = await pool.query(
            "SELECT COALESCE(SUM(montant_total), 0) AS total FROM Commandes WHERE DATE(date_commande) = ?",
            [todayStr]
        );
        const revenuJournalier = dailyRevResult[0].total;

        // Requête pour Revenu Mensuel
        const [monthlyRevResult] = await pool.query(
            "SELECT COALESCE(SUM(montant_total), 0) AS total FROM Commandes WHERE MONTH(date_commande) = MONTH(CURRENT_DATE()) AND YEAR(date_commande) = YEAR(CURRENT_DATE())"
        );
        const revenuMensuel = monthlyRevResult[0].total;

        // Requête pour Revenu Semestriel (6 derniers mois ou semestre actuel)
        // On va utiliser une approche simple : commandes dont la date est dans l'année en cours pour le semestre
        // Ou plus précis : de Janvier à Juin, ou Juillet à Décembre
        const currentMonth = new Date().getMonth() + 1;
        const startMonth = currentMonth <= 6 ? 1 : 7;
        const endMonth = currentMonth <= 6 ? 6 : 12;
        
        const [semesterRevResult] = await pool.query(
            "SELECT COALESCE(SUM(montant_total), 0) AS total FROM Commandes WHERE YEAR(date_commande) = YEAR(CURRENT_DATE()) AND MONTH(date_commande) BETWEEN ? AND ?",
            [startMonth, endMonth]
        );
        const revenuSemestriel = semesterRevResult[0].total;

        // Commandes Totales (Aujourd'hui)
        const [totalOrdersResult] = await pool.query(
            "SELECT COUNT(id_commande) AS count FROM Commandes WHERE DATE(date_commande) = ?",
            [todayStr]
        );
        const commandesTotales = totalOrdersResult[0].count;

        // Commandes Terminées (Aujourd'hui, statut_commande = 'prete')
        const [completedOrdersResult] = await pool.query(
            "SELECT COUNT(id_commande) AS count FROM Commandes WHERE statut_commande = 'prete' AND DATE(date_commande) = ?",
            [todayStr]
        );
        const commandesTerminees = completedOrdersResult[0].count;

        // Commandes En Cours (statut_commande = 'en_attente')
        const [pendingOrdersResult] = await pool.query(
            "SELECT COUNT(id_commande) AS count FROM Commandes WHERE statut_commande = 'en_attente'"
        );
        const commandesEnCours = pendingOrdersResult[0].count;

        res.json({
            revenuJournalier,
            revenuMensuel,
            revenuSemestriel,
            commandesTotales,
            commandesTerminees,
            commandesEnCours
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques du dashboard :", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des statistiques" });
    }
};

module.exports = { getDashboardStats };
