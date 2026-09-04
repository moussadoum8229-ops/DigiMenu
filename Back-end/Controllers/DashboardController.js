const pool = require("../Databases/Data");

// =========================================================================
// RÉCUPÉRATION DES STATISTIQUES DU DASHBOARD
// RÈGLE : Seules les commandes dont le statut est 'prete' sont comptabilisées 
// dans le chiffre d'affaires et le total des commandes validées.
// Les commandes 'en_attente' et 'annulee' sont exclues des revenus.
// =========================================================================
const getDashboardStats = async (req, res) => {
    try {
        // Date du jour au format YYYY-MM-DD
        const todayStr = new Date().toISOString().split('T')[0];
        
        // 1. REVENU JOURNALIER : Somme des commandes PRÊTES uniquement créées aujourd'hui
        const [dailyRevResult] = await pool.query(
            "SELECT COALESCE(SUM(montant_total), 0) AS total FROM Commandes WHERE statut_commande = 'prete' AND DATE(date_commande) = ?",
            [todayStr]
        );
        const revenuJournalier = dailyRevResult[0].total;

        // 2. REVENU MENSUEL : Somme des commandes PRÊTES du mois et de l'année en cours
        const [monthlyRevResult] = await pool.query(
            "SELECT COALESCE(SUM(montant_total), 0) AS total FROM Commandes WHERE statut_commande = 'prete' AND MONTH(date_commande) = MONTH(CURRENT_DATE()) AND YEAR(date_commande) = YEAR(CURRENT_DATE())"
        );
        const revenuMensuel = monthlyRevResult[0].total;

        // 3. REVENU SEMESTRIEL : Somme des commandes PRÊTES du semestre en cours (Jan-Juin ou Juil-Déc)
        const currentMonth = new Date().getMonth() + 1;
        const startMonth = currentMonth <= 6 ? 1 : 7;
        const endMonth = currentMonth <= 6 ? 6 : 12;
        
        const [semesterRevResult] = await pool.query(
            "SELECT COALESCE(SUM(montant_total), 0) AS total FROM Commandes WHERE statut_commande = 'prete' AND YEAR(date_commande) = YEAR(CURRENT_DATE()) AND MONTH(date_commande) BETWEEN ? AND ?",
            [startMonth, endMonth]
        );
        const revenuSemestriel = semesterRevResult[0].total;

        // 4. COMMANDES TERMINÉES / PRÊTES (Aujourd'hui)
        const [completedOrdersResult] = await pool.query(
            "SELECT COUNT(id_commande) AS count FROM Commandes WHERE statut_commande = 'prete' AND DATE(date_commande) = ?",
            [todayStr]
        );
        const commandesTerminees = completedOrdersResult[0].count;

        // 5. COMMANDES EN COURS (statut_commande = 'en_attente')
        const [pendingOrdersResult] = await pool.query(
            "SELECT COUNT(id_commande) AS count FROM Commandes WHERE statut_commande = 'en_attente'"
        );
        const commandesEnCours = pendingOrdersResult[0].count;

        // 6. COMMANDES TOTALES ACTIVES D'AUJOURD'HUI (Prêtes + En Attente, exclut les annulées)
        const [totalOrdersResult] = await pool.query(
            "SELECT COUNT(id_commande) AS count FROM Commandes WHERE statut_commande IN ('prete', 'en_attente') AND DATE(date_commande) = ?",
            [todayStr]
        );
        const commandesTotales = totalOrdersResult[0].count;

        // Réponse JSON avec tous les indicateurs
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

