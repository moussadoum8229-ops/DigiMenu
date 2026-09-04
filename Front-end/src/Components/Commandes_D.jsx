import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { 
  Receipt,
  ClipboardList,
  ArrowUp,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Eye,
  X,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';

export default function Commandes_D() {
  // ==========================================
  // ÉTATS GLOBAUX DU COMPOSANT
  // ==========================================
  const [loady, setloady] = useState(true); // Gestion du premier écran de chargement (loader animé)
  const [orders, setOrders] = useState([]); // Liste complète des commandes récupérées du backend
  const [loadingOrders, setLoadingOrders] = useState(false); // Indicateur de rechargement des données
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche (ID ou Table)
  const [statusFilter, setStatusFilter] = useState('all'); // Filtre par statut (toutes, en_attente, prete, etc.)
  const [selectedOrder, setSelectedOrder] = useState(null); // Commande sélectionnée pour la modale de détails
  const [updatingId, setUpdatingId] = useState(null); // ID de commande en cours de mise à jour

  // ==========================================
  // 1. EFFET INITIAL : Affichage du Splash Loader
  // ==========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setloady(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ==========================================
  // 2. RÉCUPÉRATION DES COMMANDES DU BACK-END
  // ==========================================
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      // Appel de l'API backend pour obtenir toutes les commandes avec leurs détails
      const response = await axios.get('http://localhost:5000/api/orders/all');
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Charger les commandes dès le montage et actualiser automatiquement toutes les 15 secondes
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // Polling automatique
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // 3. MISE À JOUR DU STATUT D'UNE COMMANDE
  // ==========================================
  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        statut_commande: newStatus
      });
      if (response.status === 200) {
        // Mise à jour locale de l'état sans recharger toute la page
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id_commande === orderId ? { ...order, statut_commande: newStatus } : order
          )
        );
        // Mettre à jour aussi la modale si elle est ouverte
        if (selectedOrder && selectedOrder.id_commande === orderId) {
          setSelectedOrder(prev => ({ ...prev, statut_commande: newStatus }));
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // 4. CALCUL DES STATISTIQUES (KPIs)
  // ==========================================
  const totalCommandes = orders.length;
  const enAttenteCount = orders.filter(o => o.statut_commande === 'en_attente').length;
  const pretesCount = orders.filter(o => o.statut_commande === 'prete').length;

  // ==========================================
  // 5. FILTRAGE ET RECHERCHE DES COMMANDES
  // ==========================================
  const filteredOrders = orders.filter(order => {
    // Filtre par statut
    const matchesStatus = statusFilter === 'all' || order.statut_commande === statusFilter;
    
    // Filtre par recherche textuelle (ID ou Table ou Type)
    const matchesSearch = 
      order.id_commande.toString().includes(searchTerm.trim()) ||
      (order.numero_table && order.numero_table.toString().toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
      (order.type_commande && order.type_commande.toLowerCase().includes(searchTerm.toLowerCase().trim()));

    return matchesStatus && matchesSearch;
  });

  // ==========================================
  // 6. FORMATAGE DES HEURES & DATES
  // ==========================================
  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // ==========================================
  // 7. RENDU DU BADGE DE STATUT
  // ==========================================
  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            En attente
          </span>
        );
      case 'en_preparation':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <ChefHat size={13} className="text-blue-500" />
            En cuisine
          </span>
        );
      case 'prete':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 size={13} className="text-green-500" />
            Prête
          </span>
        );
      case 'annulee':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            Annulée
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  // Affichage du Splash Loader initial
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
        
        {/* ========================================== */}
        {/* EN-TÊTE DE LA PAGE AVEC EFFET GLOW       */}
        {/* ========================================== */}
        <div className="relative mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative z-10">
            {/* Effet lumineux de fond */}
            <div className="absolute -left-10 -top-10 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
            
            <h1 className="text-3xl font-[Open_Sans] font-bold text-gray-900 tracking-tight">Commandes en cours</h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="font-[Open_Sans]">Service Journalier</span>
              <span className="text-gray-400">•</span>
              <span className="font-[Open_Sans] font-semibold text-gray-800">{orders.length} commande{orders.length > 1 ? 's' : ''} au total</span>
            </div>
          </div>

          {/* Bouton de rafraîchissement manuel */}
          <div className="relative z-10 flex items-center gap-3">
            <button 
              onClick={fetchOrders}
              disabled={loadingOrders}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 shadow-sm transition-all cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={15} className={`${loadingOrders ? 'animate-spin text-red-500' : ''}`} />
              <span>{loadingOrders ? 'Actualisation...' : 'Actualiser'}</span>
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* CARTES INDICATEURS (KPIs)                 */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* 1. Carte Total Commandes */}
          <div className="bg-[#f0f1f5] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-gray-100/50 shadow-sm">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#e2e4e9] rounded-full opacity-60 pointer-events-none"></div>
            <div className="relative z-10 flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[11px] font-[Open_Sans] font-bold text-gray-500 uppercase tracking-wider mb-2">Total Commandes</h3>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-extrabold font-[Open_Sans] text-gray-900">{totalCommandes}</p>
                  <div className="flex items-center text-[10px] font-bold text-green-600 mb-1.5">
                    <ArrowUp size={12} strokeWidth={3} />
                    <span>Actif</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl text-[#a35200] shadow-sm">
                <Receipt size={22} />
              </div>
            </div>
          </div>

          {/* 2. Carte En Attente */}
          <div className="bg-[#f0f1f5] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-gray-100/50 shadow-sm">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#e2e4e9] rounded-full opacity-60 pointer-events-none"></div>
            <div className="relative z-10 flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[11px] font-[Open_Sans] font-bold text-gray-500 uppercase tracking-wider mb-2">En Attente</h3>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-extrabold font-[Open_Sans] text-red-600">{enAttenteCount}</p>
                  {enAttenteCount > 0 ? (
                    <span className="text-[10px] font-semibold text-red-600 mb-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                      Attention requise
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-gray-500 mb-1.5">Tout est à jour</span>
                  )}
                </div>
              </div>
              <div className="relative p-3 bg-white/70 rounded-xl text-red-600 shadow-sm">
                <ClipboardList size={22} />
                {enAttenteCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
                )}
              </div>
            </div>
          </div>

          {/* 3. Carte Prêtes pour Service */}
          <div className="bg-[#f0f1f5] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-gray-100/50 shadow-sm">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#e2e4e9] rounded-full opacity-60 pointer-events-none"></div>
            <div className="relative z-10 flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[11px] font-[Open_Sans] font-bold text-gray-500 uppercase tracking-wider mb-2">Prêtes / Cuisine</h3>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-extrabold font-[Open_Sans] text-green-700">{pretesCount}</p>
                  <span className="text-[10px] font-semibold text-green-600 mb-1.5">Prêtes à servir</span>
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl text-green-600 shadow-sm">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>

        </div>

        {/* ========================================== */}
        {/* BARRE D'ACTION : Recherche & Filtres      */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/70 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Champ de recherche */}
          <div className="relative flex-1">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par #ID, Table ou Type (ex: Sur place)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtres par boutons de statut */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-gray-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal size={13} />
              Statut:
            </span>
            {[
              { label: 'Toutes', value: 'all' },
              { label: 'En attente', value: 'en_attente' },
              { label: 'Prêtes', value: 'prete' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.value
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* ========================================== */}
        {/* TABLEAU DES COMMANDES                     */}
        {/* ========================================== */}
        <div className="bg-[#fdfdfd] rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden min-h-125">
          
          {/* En-tête du tableau (Grille) */}
          <div className="bg-[#f8f9fc] grid grid-cols-12 p-4 sm:p-5 text-xs font-bold font-[Open_Sans] text-gray-600 border-b border-gray-200/70">
            <div className="col-span-2 sm:col-span-1">ID</div>
            <div className="col-span-3 sm:col-span-2">Table / Type</div>
            <div className="col-span-4 sm:col-span-4">Articles</div>
            <div className="col-span-3 sm:col-span-2">Montant</div>
            <div className="hidden sm:block sm:col-span-1">Heure</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Statut</div>
          </div>

          {/* Corps du tableau */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const itemsCount = order.details_commande ? order.details_commande.reduce((sum, item) => sum + item.quantite, 0) : 0;
                
                return (
                  <div 
                    key={order.id_commande}
                    className="grid grid-cols-12 p-4 sm:p-5 text-xs text-gray-700 items-center hover:bg-gray-50/80 transition-colors"
                  >
                    {/* Colonne 1 : ID */}
                    <div className="col-span-2 sm:col-span-1 font-bold text-gray-900">
                      {order.id_commande}
                    </div>

                    {/* Colonne 2 : Table & Type */}
                    <div className="col-span-3 sm:col-span-2">
                      <div className="font-bold text-gray-800">
                        {order.numero_table ? `Table ${order.numero_table}` : 'À Emporter'}
                      </div>
                      <div className="text-[11px] text-gray-500 capitalize">
                        {order.type_commande || 'Sur place'}
                      </div>
                    </div>

                    {/* Colonne 3 : Articles / Résumé */}
                    <div className="col-span-4 sm:col-span-4 pr-2">
                      <div className="font-medium text-gray-800 line-clamp-1">
                        {order.details_commande && order.details_commande.length > 0 ? (
                          order.details_commande.map(d => `${d.quantite}x ${d.nom_produit}`).join(', ')
                        ) : (
                          <span className="text-gray-400 italic">Aucun détail</span>
                        )}
                      </div>
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-[11px] text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 mt-0.5 cursor-pointer"
                      >
                        <Eye size={12} />
                        Voir détails ({itemsCount} article{itemsCount > 1 ? 's' : ''})
                      </button>
                    </div>

                    {/* Colonne 4 : Montant */}
                    <div className="col-span-3 sm:col-span-2 font-bold text-gray-900">
                      {parseFloat(order.montant_total).toFixed(2)} FCFA
                    </div>

                    {/* Colonne 5 : Heure */}
                    <div className="hidden sm:flex sm:col-span-1 items-center gap-1 text-gray-500">
                      <Clock size={13} className="text-gray-400" />
                      <span>{formatTime(order.date_commande)}</span>
                    </div>

                    {/* Colonne 6 : Statut (En lecture seule pour l'Admin) */}
                    <div className="col-span-12 sm:col-span-2 mt-3 sm:mt-0 flex sm:justify-end">
                      {getStatusBadge(order.statut_commande)}
                    </div>
                  </div>
                );
              })
            ) : (
              /* État vide si aucune commande ne correspond */
              <div className="py-16 text-center text-gray-500">
                <AlertCircle size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-semibold text-gray-700">Aucune commande trouvée</p>
                <p className="text-xs text-gray-400 mt-1">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Essayez de modifier vos filtres ou termes de recherche."
                    : "Les nouvelles commandes des clients apparaîtront ici automatiquement."}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* MODALE DE DÉTAILS D'UNE COMMANDE          */}
      {/* ========================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 overflow-hidden relative animate-scale-up">
            
            {/* Bouton Fermer */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* En-tête de la modale */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold font-[Open_Sans] text-gray-900">
                  Commande {selectedOrder.id_commande}
                </h3>
                {getStatusBadge(selectedOrder.statut_commande)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedOrder.numero_table ? `Table n°${selectedOrder.numero_table}` : selectedOrder.type_commande === 'livraison' ? 'Commande livraison' : 'Commande à emporter'} • {formatTime(selectedOrder.date_commande)}
              </p>

              {selectedOrder.type_commande === 'livraison' && (
                <div className="mt-3 p-3 bg-red-50/50 rounded-xl border border-red-100 text-xs space-y-1">
                  {selectedOrder.telephone_client && (
                    <p className="font-medium text-gray-700">📞 Téléphone: <span className="font-bold text-gray-900">{selectedOrder.telephone_client}</span></p>
                  )}
                  {selectedOrder.adresse_livraison && (
                    <p className="font-medium text-gray-700">📍 Quartier / Adresse: <span className="font-bold text-gray-900">{selectedOrder.adresse_livraison}</span></p>
                  )}
                </div>
              )}
            </div>

            {/* Liste des articles commandés */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Articles commandés
              </h4>
              
              <div className="bg-gray-50 rounded-2xl p-4 divide-y divide-gray-200/60 max-h-60 overflow-y-auto">
                {selectedOrder.details_commande && selectedOrder.details_commande.length > 0 ? (
                  selectedOrder.details_commande.map((item, idx) => (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-red-100 text-red-600 font-bold flex items-center justify-center text-[11px]">
                          {item.quantite}x
                        </span>
                        <span className="font-semibold text-gray-800">{item.nom_produit}</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {(item.prix_unitaire * item.quantite).toFixed(2)} FCFA
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">Aucun détail disponible</p>
                )}
              </div>
            </div>

            {/* Récapitulatif Total */}
            <div className="bg-gray-900 text-white rounded-2xl p-4 mb-6 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Montant Total</span>
                <span className="text-xl font-bold font-[Open_Sans]">
                  {parseFloat(selectedOrder.montant_total).toFixed(2)} FCFA
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 block font-medium">Type</span>
                <span className="text-xs font-semibold capitalize bg-white/10 px-2.5 py-1 rounded-lg">
                  {selectedOrder.type_commande || 'Sur place'}
                </span>
              </div>
            </div>

            {/* Bouton de fermeture de la modale */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
