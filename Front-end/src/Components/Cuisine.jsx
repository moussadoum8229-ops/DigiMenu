import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Dictionnaire de correspondance entre les noms de plats et leurs images réelles (dossier public)
const getDishImage = (name) => {
  if (!name) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80";
  
  // Normalisation du nom pour éviter les problèmes d'accents ou de casse
  const cleanName = name.toLowerCase().trim().replace(/è/g, 'e').replace(/é/g, 'e').replace(/à/g, 'a');
  
  const mapping = {
    "humberger": "./humberger.jpg",
    "cheeseberger": "./Cheeseburger.jpg",
    "cheeseburger": "./Cheeseburger.jpg",
    "humberger au fromage": "./Burger-poulet.jpg",
    "humburger au poisson": "./Berger-poisson.jpg",
    "poulet roti": "./P-4.jpg",
    "poulet panne": "./P-1.jpg",
    "poulet braiser": "./P-2.jpg",
    "poulet braise": "./P-2.jpg",
    "poulet dg": "./P-3.jpg",
    "tacos boeuf": "./Tacos.jpg",
    "tacos mexicain": "./Tacos-poulet.jpg",
    "tacos poisson": "./Tacos-poisson.jpg",
    "tacos vegetarien": "./Tacos-V.jpg",
    "steack de boeuf": "./St-1.jpg",
    "grillade de mouton": "./St-2.jpg",
    "cotelettes d'agneau": "./St-3.jpg",
    "boullete de boeuf": "./St-4.jpg",
    "poisson braise": "./Poisson-braisé.jpg",
    "poisson braise": "./Poisson-braisé.jpg",
    "soupe de poisson": "./Soupe-de-poisson.jpg",
    "boullete de poisson": "./Boullete-de-poisson.jpg",
    "saumon grec": "./saumon-grec.jpg",
    "gateau chocolat": "./Gateau-chocolat.jpg",
    "gateau framboise": "./gateau-framboise.jpg",
    "gateau-fraise": "./Gateau-fraise.jpg",
    "gateau a la banane": "./Gateau-banane.jpg",
    "crepe au chocolat": "./Crepe-chocolat.jpg",
    "crepe a la banane": "./Crepe-banane.jpg",
    "crepe au chocolat fraise": "./Crepe-chocolat fraise.jpg",
    "glace chocolat": "./Glace-chocolat.jpg",
    "glace fraise": "./Glace fraise.jpg",
    "glace caramel": "./Glace-caramel.jpg",
    "glace a la banane": "./Glace-banane.jpg",
    "coca cola": "./Coca cola.jpg",
    "fanta": "./Fanta.jpg",
    "sprite": "./Sprite.jpg",
    "double seven": "./Double7.jpg"
  };

  return mapping[cleanName] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80";
};

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
        setOrders(prev => prev.filter(order => order.id_commande !== orderId));
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
   const [loady, setloady] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setloady(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);
    if (loady) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="loader">
            <img src="/Digiload.svg" alt="loader" width="200" />
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-orange-50/30 text-gray-800 font-[Open_Sans] pb-16">

      {/* ================= EN-TÊTE FIGMA ================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">

            {/* Logo & Titre */}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                <span className="text-orange-500 mr-2">DIGIMENU</span>
                <span className="text-gray-700 font-medium">Cuisine</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Préparation & Suivi des Commandes Clients
              </p>
            </div>

            {/* Statut & Bouton Refresh */}
            <div className="flex items-center gap-3">
              <span className="text-orange-500 font-bold text-lg">
                {orders.length} {orders.length > 1 ? 'Commandes en cours' : 'Commande en cours'}
              </span>
              
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                title="Rafraîchir"
              >
                <svg 
                  className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-orange-500' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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

                  {/* Tête de la carte (Fond blanc uni) */}
                  <div className="p-5 flex justify-between items-start bg-white border-b border-gray-100">
                    <div>
                      {/* Badge du mode */}
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2.5 shadow-xs ${isDelivery
                          ? 'bg-white text-black'
                          : 'bg-white text-black'
                        }`}>
                        {order.type_commande === 'livraison' ? 'Livraison ' : 
                          order.type_commande === 'a_emporter' ? 'À emporter ' : 'Sur Place'}
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
                                  src={getDishImage(item.nom_produit)}
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
                      className="btn btn-active btn-success btn-sm w-20 rounded-full "
                    >
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
