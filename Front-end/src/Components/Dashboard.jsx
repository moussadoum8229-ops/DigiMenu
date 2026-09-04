import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { 
  Banknote, 
  Wallet, 
  TrendingUp, 
  Receipt, 
  CheckCircle, 
  Hourglass,
  Ban,
  Clock,
  RefreshCw,
  AlertTriangle,
  X
} from 'lucide-react';

export default function Dashboard() {
  // ==========================================
  // ÉTATS GLOBAUX DU DASHBOARD
  // ==========================================
  const [loady, setloady] = useState(true);
  const [stats, setStats] = useState({
    revenuJournalier: 0,
    revenuMensuel: 0,
    revenuSemestriel: 0,
    commandesTotales: 0,
    commandesTerminees: 0,
    commandesEnCours: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null); // Confirmation modale d'annulation

  // ==========================================
  // 1. EFFET INITIAL : Splash Loader
  // ==========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setloady(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ==========================================
  // 2. RÉCUPÉRATION DES DONNÉES (STATS + COMMANDES)
  // ==========================================
  const fetchDashboardData = async () => {
    setLoadingStats(true);
    try {
      // 1. Récupérer les statistiques calculées par le backend
      const statsRes = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(statsRes.data);

      // 2. Récupérer la liste des commandes récentes pour permettre la gestion et annulation
      const ordersRes = await axios.get('http://localhost:5000/api/orders/all');
      if (Array.isArray(ordersRes.data)) {
        setRecentOrders(ordersRes.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données du dashboard :", error);
    } finally {
      setLoadingStats(false);
    }
  };

  // Chargement et rafraîchissement automatique toutes les 15 secondes
  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // 3. ACTION : ANNULER UNE COMMANDE
  // Déclenche la mise à jour immédiate du statut en BDD 
  // et soustrait le montant des relevés / stats du Dashboard
  // ==========================================
  const handleCancelOrder = async (orderId) => {
    setCancellingId(orderId);
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        statut_commande: 'annulee'
      });

      if (response.status === 200) {
        // Recharger immédiatement les statistiques et les commandes pour recalculer les totaux
        await fetchDashboardData();
        setOrderToCancel(null);
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation de la commande :", error);
    } finally {
      setCancellingId(null);
    }
  };

  // Formatage de l'heure
  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calcul du pourcentage des commandes prêtes
  const pourcentageTerminees = stats.commandesTotales > 0 
    ? Math.round((stats.commandesTerminees / stats.commandesTotales) * 100) 
    : 0;

  if (loady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loader animate-fade-in">
          <img src="/Digiload.svg" alt="loader" width="200" />
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto pb-12">
        
        {/* En-tête de la page */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[Open_Sans] text-gray-900 tracking-tight">Aperçu de l'Activité</h1>
            <p className="text-gray-500 font-[Open_Sans] text-sm mt-1">
              Suivi en temps réel. Seules les commandes validées et prêtes en cuisine sont comptabilisées dans le chiffre d'affaires.
            </p>
          </div>

          <button 
            onClick={fetchDashboardData}
            disabled={loadingStats}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw size={15} className={`${loadingStats ? 'animate-spin text-[#ff7a00]' : ''}`} />
            <span>{loadingStats ? 'Actualisation...' : 'Actualiser'}</span>
          </button>
        </div>

        {/* ========================================== */}
        {/* CARTES 1 : REVENUS & FINANCES             */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Revenu Journalier */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">Revenu Journalier</h3>
                <p className="text-3xl font-extrabold font-[Open_Sans] text-gray-900">{parseFloat(stats.revenuJournalier).toFixed(2)} FCFA</p>
                <span className="text-[11px] text-green-600 font-semibold mt-1 block">Commandes prêtes du jour</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff7a00] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Banknote size={24} />
              </div>
            </div>
          </div>

          {/* Revenu Mensuel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">Revenu Mensuel</h3>
                <p className="text-3xl font-extrabold font-[Open_Sans] text-gray-900">{parseFloat(stats.revenuMensuel).toFixed(2)} FCFA</p>
                <span className="text-[11px] text-gray-400 font-medium mt-1 block">Mois en cours</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <Wallet size={24} />
              </div>
            </div>
          </div>

          {/* Revenu Semestriel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">Revenu Semestriel</h3>
                <p className="text-3xl font-extrabold font-[Open_Sans] text-gray-900">{parseFloat(stats.revenuSemestriel).toFixed(2)} FCFA</p>
                <span className="text-[11px] text-gray-400 font-medium mt-1 block">Semestre actuel</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* CARTES 2 : STATISTIQUES DES COMMANDES     */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Commandes Totales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">Commandes Totales</h3>
                <p className="text-3xl font-extrabold font-[Open_Sans] text-gray-900">{stats.commandesTotales}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <Receipt size={24} />
              </div>
            </div>
            <div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gray-900 h-full w-full"></div>
              </div>
              <p className="text-right text-xs text-gray-500 font-medium">Aujourd'hui (hors annulées)</p>
            </div>
          </div>

          {/* Terminées / Prêtes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">Terminées / Prêtes</h3>
                <p className="text-3xl font-extrabold font-[Open_Sans] text-gray-900">{stats.commandesTerminees}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <CheckCircle size={24} />
              </div>
            </div>
            <div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-green-600 h-full rounded-full transition-all duration-500" style={{ width: `${pourcentageTerminees}%` }}></div>
              </div>
              <p className="text-right text-xs text-green-700 font-medium">{pourcentageTerminees}% des commandes</p>
            </div>
          </div>

          {/* En Cours / Cuisine */}
          <div className="bg-[#a35200] rounded-2xl p-6 shadow-md flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="text-xs font-[Open_Sans] text-white/80 uppercase tracking-wider mb-2">En Attente Cuisine</h3>
                <p className="text-3xl font-extrabold font-[Open_Sans] text-white">{stats.commandesEnCours}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Hourglass size={24} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-white h-full w-full rounded-full"></div>
              </div>
              <p className="text-right font-[Open_Sans] text-white/80 font-medium text-xs">
                {stats.commandesEnCours > 0 ? "Non encore facturées" : "Aucune commande en attente"}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION : GESTION DES COMMANDES & ANNULATION */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-[Open_Sans] text-gray-900">Commandes & Révélés</h2>
              <p className="text-xs text-gray-500">
                Vous pouvez annuler une commande ici. La déduction sera instantanément répercutée sur les chiffres ci-dessus.
              </p>
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-[Open_Sans]">
              <thead className="bg-[#f8f9fc] text-gray-600 font-bold border-b border-gray-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Table / Type</th>
                  <th className="p-4">Articles</th>
                  <th className="p-4">Montant</th>
                  <th className="p-4">Heure</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => {
                    const isCancelled = order.statut_commande === 'annulee';
                    const isReady = order.statut_commande === 'prete';

                    return (
                      <tr key={order.id_commande} className={`hover:bg-gray-50/80 transition-colors ${isCancelled ? 'opacity-50 bg-gray-50/50' : ''}`}>
                        <td className="p-4 font-bold text-gray-900">
                          {order.id_commande}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-800">
                            {order.numero_table ? `Table ${order.numero_table}` : 'À Emporter'}
                          </div>
                          <div className="text-[10px] text-gray-400 capitalize">
                            {order.type_commande || 'Sur place'}
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 max-w-xs truncate">
                          {order.details_commande && order.details_commande.length > 0 ? (
                            order.details_commande.map(d => `${d.quantite}x ${d.nom_produit}`).join(', ')
                          ) : (
                            <span className="text-gray-400 italic">Aucun détail</span>
                          )}
                        </td>
                        <td className={`p-4 font-bold ${isCancelled ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {parseFloat(order.montant_total).toFixed(2)} FCFA
                        </td>
                        <td className="p-4 text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400" />
                            <span>{formatTime(order.date_commande)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {isReady && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                              <CheckCircle size={11} className="text-green-500" />
                              Prête (Comptabilisée)
                            </span>
                          )}
                          {order.statut_commande === 'en_attente' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                              En attente cuisine
                            </span>
                          )}
                          {isCancelled && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200">
                              Annulée (Déduite)
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {!isCancelled ? (
                            <button
                              onClick={() => setOrderToCancel(order)}
                              disabled={cancellingId === order.id_commande}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold rounded-lg border border-red-200 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <Ban size={13} />
                              <span>Annuler</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">Annulée</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-400">
                      Aucune commande enregistrée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* MODALE DE CONFIRMATION D'ANNULATION       */}
      {/* ========================================== */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setOrderToCancel(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold font-[Open_Sans] text-gray-900 mb-2">
              Annuler la commande #{orderToCancel.id_commande} ?
            </h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Êtes-vous sûr de vouloir annuler cette commande d'un montant de <strong className="text-gray-900">{parseFloat(orderToCancel.montant_total).toFixed(2)} FCFA</strong> ?
              Ce montant sera <span className="text-red-600 font-bold">immédiatement soustrait</span> des relevés et revenus du Dashboard.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOrderToCancel(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Retour
              </button>
              <button
                onClick={() => handleCancelOrder(orderToCancel.id_commande)}
                disabled={cancellingId === orderToCancel.id_commande}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {cancellingId === orderToCancel.id_commande ? 'Annulation...' : 'Confirmer l\'annulation'}
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
