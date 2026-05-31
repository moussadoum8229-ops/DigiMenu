import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cuisine() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mettre à jour l'heure système chaque minute pour rafraîchir le calcul du temps écoulé
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Fonction pour charger les commandes
  const fetchOrders = async (silent = false) => {
    if (!silent) setLoading(true);
    setIsRefreshing(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Impossible de récupérer les commandes");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  // Chargement initial et Polling toutes les 5 secondes
  useEffect(() => {
    fetchOrders(orders.length > 0);
    const interval = setInterval(() => {
      fetchOrders(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshKey]);

  // Marquer une commande comme prête
  const handleMarkAsReady = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/ready`, {
        method: 'PUT',
      });

      if (response.ok) {
        setOrders(prev => prev.filter(order => order.id !== orderId));
      } else {
        alert("Erreur lors de la mise à jour de la commande.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert("Erreur réseau. Impossible de contacter le serveur.");
    }
  };

  // Calculer le temps écoulé depuis la création de la commande
  const getElapsedTime = (dateString) => {
    const orderTime = new Date(dateString);
    const diffMs = currentTime - orderTime;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    return `Il y a ${diffHours}h ${diffMins % 60}m`;
  };

  return (
    <div className="min-h-screen bg-orange-50/30 text-gray-800 font-sans pb-16">

      {/* ================= EN-TÊTE PREMIUM (ORANGE & BLANC) ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-orange-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

            {/* Logo & Titre */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-orange-600 flex items-center gap-2">
                  DigiMenu <span className="text-gray-800 font-medium lowercase text-lg sm:text-xl font-sans">cuisine</span>
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold tracking-wide">
                  Préparation & Suivi des Commandes Clients
                </p>
              </div>
            </div>

            {/* Badges et Refresh */}
            <div className="flex items-center gap-3">
              {/* Badge commandes actives */}
              <div className="bg-orange-50 px-4 py-2 rounded-2xl border border-orange-200 flex items-center gap-2.5 shadow-xs">
                <span className="flex h-3.5 w-3.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-600"></span>
                </span>
                <span className="text-sm font-black text-orange-700">
                  {orders.length} {orders.length > 1 ? 'Commandes Actives' : 'Commande Active'}
                </span>
              </div>

              {/* Bouton de rafraîchissement manuel */}
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="p-3 bg-white hover:bg-orange-50 active:bg-orange-100 rounded-2xl border-2 border-orange-200 text-orange-600 transition-all duration-200 cursor-pointer shadow-sm hover:shadow flex items-center justify-center group"
                title="Rafraîchir les commandes"
              >
                <svg className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-orange-500' : 'group-hover:rotate-12 transition-transform'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Zone de contenu principale */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {loading ? (
          /* ================= ÉTAT CHARGEMENT ================= */
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-orange-700 font-bold text-base">Chargement des plats commandés...</p>
          </div>
        ) : orders.length === 0 ? (
          /* ================= ÉTAT PAS DE COMMANDE ================= */
          <div className="flex flex-col items-center justify-center py-24 text-center border-3 border-dashed border-orange-200 rounded-3xl p-8 bg-white shadow-sm max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-500 shadow-inner">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-800">Cuisine Libre !</h2>
            <p className="text-gray-500 text-sm max-w-sm mt-3 font-medium">
              Toutes les commandes ont été servies. Prenez une pause ou préparez vos ingrédients en attendant la prochaine !
            </p>
          </div>
        ) : (
          /* ================= GRILLE DES COMMANDES ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => {
              const isDelivery = order.type_commande === 'livraison';
              return (
                <div
                  key={order.id_commande}
                  className="bg-white rounded-3xl border-2 border-orange-100 shadow-lg hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                >

                  {/* Tête de la carte (Vibrant Orange ou Cyan) */}
                  <div className={`p-5 flex justify-between items-start ${isDelivery ? 'bg-cyan-550/10 border-b border-cyan-100' : 'bg-orange-50 border-b border-orange-100'
                    }`}>
                    <div>
                      {/* Badge du mode */}
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2.5 shadow-xs ${isDelivery
                          ? 'bg-cyan-550 text-white'
                          : 'bg-orange-500 text-white'
                        }`}>
                        {order.type_commande === 'livraison' ? 'Livraison 🛵' :
                          order.type_commande === 'a_emporter' ? 'À emporter 🛍️' : 'Sur Place 🍽️'}
                      </span>

                      {/* Titre Table ou Type */}
                      <h3 className="text-xl font-extrabold text-gray-800">
                        {order.type_commande === 'sur_place' ? `Table N° ${order.numero_table || 'N/A'}` : 'Commande Externe'}
                      </h3>
                    </div>

                    {/* Temps écoulé (compteur live) */}
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Temps</span>
                      <span className="text-xs font-extrabold text-orange-600 bg-white border border-orange-200 px-2.5 py-1 rounded-xl mt-1.5 inline-block shadow-2xs">
                        {getElapsedTime(order.date_commande)}
                      </span>
                    </div>
                  </div>

                  {/* Corps de la commande : liste des articles */}
                  <div className="p-6 grow space-y-5">

                    {/* Liste des plats */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block pl-0.5">Détail des Plats</span>

                      <div className="divide-y divide-gray-100">
                        {order.details_commande && order.details_commande.map((item, idx) => (
                          <div key={idx} className="py-3 flex justify-between items-center gap-4">

                            {/* Photo du plat, Quantité & Nom */}
                            <div className="flex items-center gap-3">
                              {/* Photo du plat commandé */}
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-orange-100 shadow-inner">
                                <img
                                  src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80"}
                                  alt={item.nom_produit}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80";
                                  }}
                                />
                              </div>

                              {/* Quantité & Nom */}
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded-lg bg-orange-100 text-orange-600 border border-orange-200 font-extrabold text-xs">
                                    {item.quantite}x
                                  </span>
                                  <span className="font-extrabold text-gray-800 capitalize text-sm leading-snug">
                                    {item.nom_produit}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Prix total de la ligne */}
                            <span className="text-xs text-gray-500 font-bold">
                              {item.prix_unitaire * item.quantite} XOF
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Pied de la carte : total et bouton d'action */}
                  <div className="p-5 bg-orange-50/20 border-t border-orange-100/70 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-bold">Total Général</span>
                      <span className="text-lg font-black text-orange-600">{Math.round(order.montant_total)} XOF</span>
                    </div>

                    <button
                      onClick={() => handleMarkAsReady(order.id_commande)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg border-b-4 border-emerald-700 active:border-b-0 hover:-translate-y-0.5 active:translate-y-0.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                      Prêt !
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
