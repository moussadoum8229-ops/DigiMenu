import React, { useState } from 'react';

function Admin() {
  // États de la barre latérale et de la navigation
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // États de l'ajout de cuisinier interactif
  const [cookUsername, setCookUsername] = useState('');
  const [cookPassword, setCookPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cooksCount, setCooksCount] = useState(12);
  const [toastMessage, setToastMessage] = useState(null);
  
  // États des notifications interactives
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouvelle commande #1026 par Jean Dupont", time: "Il y a 2 min", read: false },
    { id: 2, text: "Le cuisinier Sophie Martin a validé la commande #1024", time: "Il y a 10 min", read: false },
    { id: 3, text: "Stock faible: Escalope de poulet", time: "Il y a 1 heure", read: true }
  ]);

  // État de la date sélectionnée
  const [selectedDate, setSelectedDate] = useState('31 Mai 2024');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // État du point de données actif pour le graphique linéaire
  const [hoveredPoint, setHoveredPoint] = useState(6); // Par défaut sur le dernier jour (31 Mai)
  const lineChartData = [
    { day: "25 Mai", orders: 18 },
    { day: "26 Mai", orders: 22 },
    { day: "27 Mai", orders: 16 },
    { day: "28 Mai", orders: 32 },
    { day: "29 Mai", orders: 24 },
    { day: "30 Mai", orders: 30 },
    { day: "31 Mai", orders: 28 },
  ];

  // État de survol du segment de donut
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // État dynamique pour la liste des commandes récentes
  const [orders, setOrders] = useState([
    { id: "#1025", client: "Jean Dupont", amount: "25.000 FCFA", status: "Livrée", date: "31 Mai 2024, 14:30" },
    { id: "#1024", client: "Sophie Martin", amount: "18.500 FCFA", status: "En préparation", date: "31 Mai 2024, 13:45" },
    { id: "#1023", client: "Paul Bernard", amount: "12.000 FCFA", status: "En attente", date: "31 Mai 2024, 12:20" },
    { id: "#1022", client: "Marie Claire", amount: "30.000 FCFA", status: "Livrée", date: "31 Mai 2024, 11:15" },
    { id: "#1021", client: "Lucas Moreau", amount: "15.000 FCFA", status: "Annulée", date: "31 Mai 2024, 10:05" },
  ]);

  // État de la fenêtre modale des détails de commande
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Gérer l'ajout d'un nouveau cuisinier
  const handleAddCook = (e) => {
    e.preventDefault();
    if (!cookUsername || !cookPassword) {
      triggerToast("Veuillez remplir tous les champs !");
      return;
    }
    
    // Animation / simulation de la logique d'ajout de cuisinier
    setCooksCount(prev => prev + 1);
    triggerToast(`Le cuisinier "${cookUsername}" a été ajouté avec succès ! 🎉`);
    setCookUsername('');
    setCookPassword('');
  };

  // Fonction utilitaire pour déclencher le toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fonction utilitaire pour marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Définition des éléments de la barre latérale
  const sidebarItems = [
    { name: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    )},
    { name: 'Commandes', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { name: 'Statistiques', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { name: 'Cuisiniers', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { name: 'Menus', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-800">
      
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700/50">
            <span className="text-xl">✨</span>
            <p className="font-semibold text-sm">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Navigation par barre latérale */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#111625] text-slate-300 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col justify-between shadow-2xl border-r border-slate-800`}>
        
        {/* Partie supérieure de la barre latérale */}
        <div>
          {/* Logo de la marque */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-800/60">
            <img
              src="./Logo.jpeg"
              className="w-20 h-10 object-cover rounded-2xl  shadow-md transition-transform hover:scale-105"
              alt="Digimenu Logo"
            />
            <div>
              <h1 className="font-bold text-white text-lg tracking-wide">Digimenu</h1>
              <p className="text-xs text-slate-500 font-medium">Admin</p>
            </div>
            {/* Bouton de fermeture sur mobile */}
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden ml-auto text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Liens de navigation */}
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]' 
                      : 'hover:bg-slate-800/50 hover:text-white text-slate-400'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Partie inférieure de la barre latérale / Déconnexion */}
        <div className="p-4 border-t border-slate-800/60">
          {/* Carte promotionnelle Digimenu */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800/80 mb-4 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-50/10 rounded-full blur-xl group-hover:bg-indigo-50/20 transition-all duration-500"></div>
            <div className="w-8 h-8 rounded-lg bg-indigo-50/20 flex items-center justify-center text-indigo-400 mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-white text-sm font-bold">Digimenu</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">La gestion de votre restaurant simplifiée</p>
            <div className="w-8 h-1 bg-orange-500 rounded mt-3"></div>
          </div>

          {/* Déconnexion */}
          <button 
            onClick={() => triggerToast("Déconnexion réussie ! À bientôt.")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Panneau de contenu principal */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* En-tête */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Bouton Hamburger pour mobile */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            
            {/* Cloche de notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Badge du nombre de notifications */}
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white animate-pulse">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {/* Panneau déroulant des notifications */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">Notifications</span>
                    <button 
                      onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} 
                      className="text-xs text-indigo-600 hover:underline font-semibold"
                    >
                      Tout marquer lu
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-sm">Aucune notification</div>
                    ) : (
                      notifications.map(noti => (
                        <div 
                          key={noti.id} 
                          onClick={() => markAsRead(noti.id)}
                          className={`px-4 py-3 hover:bg-slate-50 flex flex-col gap-1 cursor-pointer transition ${!noti.read ? 'bg-indigo-50/40' : ''}`}
                        >
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">{noti.text}</p>
                          <span className="text-[10px] text-slate-400">{noti.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Conteneur de contenu du tableau de bord */}
        {activeTab === 'Dashboard' ? (
          <main className="flex-1 p-6 space-y-6">
            
            {/* Ligne d'accueil et du sélecteur de date */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  Bienvenue, Admin Digimenu ! <span className="animate-wiggle">👋</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">Voici un aperçu de votre activité aujourd'hui.</p>
              </div>

              {/* Menu déroulant interactif du sélecteur de date */}
              <div className="relative">
                <button 
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-100 rounded-xl shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{selectedDate}</span>
                  <svg className="w-4 h-4 text-slate-400 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDatePicker && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-40 text-sm">
                    {['31 Mai 2024', '30 Mai 2024', '29 Mai 2024', '28 Mai 2024'].map(date => (
                      <button 
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setShowDatePicker(false);
                          triggerToast(`Vue mise à jour pour le ${date}`);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-slate-50 font-medium ${selectedDate === date ? 'text-indigo-600 bg-indigo-50/40' : 'text-slate-600'}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Grille de mise en page : Ligne de cartes et formulaire d'ajout de cuisinier */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Colonne gauche : Les 3 cartes d'état supérieures (prend 2 colonnes en large) */}
              <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Carte Aujourd'hui */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Aujourd'hui</h3>
                  <div className="mt-4 space-y-1">
                    <p className="text-slate-500 text-xs font-medium">Commandes</p>
                    <p className="text-2xl font-extrabold text-slate-800">28</p>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <p className="text-slate-500 text-xs font-medium">Total d'achat</p>
                    <p className="text-lg font-bold text-purple-700">245.000 FCFA</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                    <span>↑ 12%</span>
                    <span className="text-slate-400 font-normal">par rapport à hier</span>
                  </div>
                </div>

                {/* Carte Cette semaine */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Cette semaine</h3>
                  <div className="mt-4 space-y-1">
                    <p className="text-slate-500 text-xs font-medium">Commandes</p>
                    <p className="text-2xl font-extrabold text-slate-800">156</p>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <p className="text-slate-500 text-xs font-medium">Total d'achat</p>
                    <p className="text-lg font-bold text-emerald-600">1.560.000 FCFA</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                    <span>↑ 18%</span>
                    <span className="text-slate-400 font-normal">par rapport à la semaine dernière</span>
                  </div>
                </div>

                {/* Carte Ce mois */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ce mois</h3>
                  <div className="mt-4 space-y-1">
                    <p className="text-slate-500 text-xs font-medium">Commandes</p>
                    <p className="text-2xl font-extrabold text-slate-800">642</p>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <p className="text-slate-500 text-xs font-medium">Total d'achat</p>
                    <p className="text-lg font-bold text-orange-600">6.240.000 FCFA</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                    <span>↑ 22%</span>
                    <span className="text-slate-400 font-normal">par rapport au mois dernier</span>
                  </div>
                </div>

              </div>

              {/* Colonne droite : Formulaire Ajouter un cuisinier */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      {/* SVG Toque de chef */}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-855 text-sm">Ajouter un cuisinier</h2>
                      <p className="text-[11px] text-slate-400 font-medium">Enregistrez un nouveau cuisinier</p>
                    </div>
                  </div>

                  <form onSubmit={handleAddCook} className="mt-5 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                      <input 
                        type="text" 
                        placeholder="Entrez le username"
                        value={cookUsername}
                        onChange={(e) => setCookUsername(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Entrez le password"
                          value={cookPassword}
                          onChange={(e) => setCookPassword(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition active:scale-[0.98]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Ajouter le cuisinier</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>

            {/* Grille de mise en page : Graphiques de la ligne médiane */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Graphique linéaire : Commandes par période */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-base">Commandes par période</h3>
                  
                  <div className="relative">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition">
                      <span>Par jour</span>
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Graphique linéaire SVG */}
                <div className="h-64 mt-6 relative w-full flex items-end">
                  {/* Lignes de grille d'arrière-plan */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                    <div className="border-b border-slate-200 w-full h-0"></div>
                    <div className="border-b border-slate-200 w-full h-0"></div>
                    <div className="border-b border-slate-200 w-full h-0"></div>
                    <div className="border-b border-slate-200 w-full h-0"></div>
                    <div className="border-b border-slate-200 w-full h-0"></div>
                  </div>

                  <svg viewBox="0 0 700 240" className="w-full h-full overflow-visible z-10">
                    {/* Définition du dégradé de remplissage */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Remplissage de la zone de tracé du graphique */}
                    <path
                      d="M 50 160 C 100 160, 100 135, 150 135 C 200 135, 200 170, 250 170 C 300 170, 300 70, 350 70 C 400 70, 400 120, 450 120 C 500 120, 500 90, 550 90 C 600 90, 600 110, 650 110 L 650 220 L 50 220 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Tracé de la ligne du graphique */}
                    <path
                      d="M 50 160 C 100 160, 100 135, 150 135 C 200 135, 200 170, 250 170 C 300 170, 300 70, 350 70 C 400 70, 400 120, 450 120 C 500 120, 500 90, 550 90 C 600 90, 600 110, 650 110"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Points interactifs sur le graphique */}
                    {[
                      { cx: 50, cy: 160, idx: 0 },
                      { cx: 150, cy: 135, idx: 1 },
                      { cx: 250, cy: 170, idx: 2 },
                      { cx: 350, cy: 70, idx: 3 },
                      { cx: 450, cy: 120, idx: 4 },
                      { cx: 550, cy: 90, idx: 5 },
                      { cx: 650, cy: 110, idx: 6 }
                    ].map((pt) => {
                      const isHovered = hoveredPoint === pt.idx;
                      return (
                        <g key={pt.idx} className="cursor-pointer">
                          <circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={isHovered ? 12 : 7}
                            fill="#6366f1"
                            fillOpacity={isHovered ? 0.2 : 0}
                            className="transition-all duration-200"
                          />
                          <circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={isHovered ? 6 : 4}
                            fill="#ffffff"
                            stroke="#6366f1"
                            strokeWidth="3.5"
                            onMouseEnter={() => setHoveredPoint(pt.idx)}
                            className="transition-all duration-200"
                          />
                        </g>
                      );
                    })}

                    {/* Étiquettes du graphique (Axe X) */}
                    <text x="50" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">25 Mai</text>
                    <text x="150" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">26 Mai</text>
                    <text x="250" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">27 Mai</text>
                    <text x="350" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">28 Mai</text>
                    <text x="450" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">29 Mai</text>
                    <text x="550" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">30 Mai</text>
                    <text x="650" y="240" fill="#94a3b8" fontSize="11.5" fontWeight="600" textAnchor="middle">31 Mai</text>
                  </svg>

                  {/* Info-bulle active positionnée par rapport au point survolé */}
                  {hoveredPoint !== null && (
                    <div 
                      className="absolute bg-slate-900 text-white rounded-xl shadow-xl p-3 border border-slate-700/50 pointer-events-none transition-all duration-300"
                      style={{
                        left: `${[5, 19, 33, 47, 61, 75, 89][hoveredPoint]}%`,
                        bottom: `${[95, 120, 85, 185, 135, 165, 145][hoveredPoint]}px`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div className="text-center">
                        <span className="font-extrabold text-sm block">{lineChartData[hoveredPoint].orders} commandes</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{lineChartData[hoveredPoint].day} 2024</span>
                      </div>
                      {/* Forme de flèche */}
                      <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-r border-b border-slate-700/50"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Graphique en anneau : Répartition des commandes */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Répartition des commandes</h3>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                  {/* Donut SVG */}
                  <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      {/* Segment 1: Livrées (72%) -> Vert. Trait: 72, décalage: 0 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="11"
                        strokeDasharray="238.76"
                        strokeDashoffset="0"
                        onMouseEnter={() => setHoveredSegment('Livrées')}
                        onMouseLeave={() => setHoveredSegment(null)}
                        className={`transition-all duration-300 cursor-pointer ${hoveredSegment === 'Livrées' ? 'stroke-[13]' : ''}`}
                      />
                      {/* Segment 2: En préparation (18%) -> Bleu. Trait: 42.97, décalage: -171.9 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#6366f1"
                        strokeWidth="11"
                        strokeDasharray="42.97 238.76"
                        strokeDashoffset="-171.9"
                        onMouseEnter={() => setHoveredSegment('En préparation')}
                        onMouseLeave={() => setHoveredSegment(null)}
                        className={`transition-all duration-300 cursor-pointer ${hoveredSegment === 'En préparation' ? 'stroke-[13]' : ''}`}
                      />
                      {/* Segment 3: En attente (7%) -> Orange. Trait: 16.71, décalage: -214.88 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="11"
                        strokeDasharray="16.71 238.76"
                        strokeDashoffset="-214.88"
                        onMouseEnter={() => setHoveredSegment('En attente')}
                        onMouseLeave={() => setHoveredSegment(null)}
                        className={`transition-all duration-300 cursor-pointer ${hoveredSegment === 'En attente' ? 'stroke-[13]' : ''}`}
                      />
                      {/* Segment 4: Annulées (3%) -> Rouge. Trait: 7.16, décalage: -231.59 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth="11"
                        strokeDasharray="7.16 238.76"
                        strokeDashoffset="-231.59"
                        onMouseEnter={() => setHoveredSegment('Annulées')}
                        onMouseLeave={() => setHoveredSegment(null)}
                        className={`transition-all duration-300 cursor-pointer ${hoveredSegment === 'Annulées' ? 'stroke-[13]' : ''}`}
                      />
                    </svg>

                    {/* Étiquette centrale du Donut */}
                    <div className="absolute text-center">
                      <span className="text-2xl font-extrabold text-slate-800 block leading-none">
                        {hoveredSegment === 'Livrées' ? '462' :
                         hoveredSegment === 'En préparation' ? '116' :
                         hoveredSegment === 'En attente' ? '45' :
                         hoveredSegment === 'Annulées' ? '19' : '642'}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mt-1 block">
                        {hoveredSegment || 'Total'}
                      </span>
                    </div>
                  </div>

                  {/* Légende du Donut */}
                  <div className="flex-1 space-y-3.5 w-full">
                    {/* Livrées */}
                    <div 
                      className={`flex items-center justify-between text-xs transition duration-200 ${hoveredSegment === 'Livrées' ? 'scale-105' : ''}`}
                      onMouseEnter={() => setHoveredSegment('Livrées')}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                        <span className="text-slate-500 font-medium">Livrées</span>
                      </div>
                      <span className="font-bold text-slate-700">72% <span className="text-slate-400 font-medium">(462)</span></span>
                    </div>

                    {/* En préparation */}
                    <div 
                      className={`flex items-center justify-between text-xs transition duration-200 ${hoveredSegment === 'En préparation' ? 'scale-105' : ''}`}
                      onMouseEnter={() => setHoveredSegment('En préparation')}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
                        <span className="text-slate-500 font-medium">En préparation</span>
                      </div>
                      <span className="font-bold text-slate-700">18% <span className="text-slate-400 font-medium">(116)</span></span>
                    </div>

                    {/* En attente */}
                    <div 
                      className={`flex items-center justify-between text-xs transition duration-200 ${hoveredSegment === 'En attente' ? 'scale-105' : ''}`}
                      onMouseEnter={() => setHoveredSegment('En attente')}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                        <span className="text-slate-500 font-medium">En attente</span>
                      </div>
                      <span className="font-bold text-slate-700">7% <span className="text-slate-400 font-medium">(45)</span></span>
                    </div>

                    {/* Annulées */}
                    <div 
                      className={`flex items-center justify-between text-xs transition duration-200 ${hoveredSegment === 'Annulées' ? 'scale-105' : ''}`}
                      onMouseEnter={() => setHoveredSegment('Annulées')}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                        <span className="text-slate-500 font-medium">Annulées</span>
                      </div>
                      <span className="font-bold text-slate-700">3% <span className="text-slate-400 font-medium">(19)</span></span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Grille de mise en page : Ligne inférieure (Mini cartes et tableau des commandes récentes) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Mini Cartes : Bloc de 4 colonnes empilées (prend 1 colonne en large) */}
              <div className="space-y-4 flex flex-col justify-between">
                
                {/* Total des commandes */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total des commandes</p>
                      <p className="text-base font-extrabold text-slate-800 mt-0.5">642</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Ce mois ↑ 22%
                  </div>
                </div>

                {/* Total d'achat */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total d'achat</p>
                      <p className="text-base font-extrabold text-slate-800 mt-0.5">6.240.000 FCFA</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Ce mois ↑ 22%
                  </div>
                </div>

                {/* Cuisiniers */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cuisiniers</p>
                      <p className="text-base font-extrabold text-slate-800 mt-0.5">{cooksCount}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Actifs ↑ 1 nouveau
                  </div>
                </div>

                {/* Clients */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clients</p>
                      <p className="text-base font-extrabold text-slate-800 mt-0.5">1.256</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Total ↑ 15%
                  </div>
                </div>

              </div>

              {/* Colonne du tableau : Dernières commandes */}
              <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <h3 className="font-bold text-slate-800 text-base">Dernières commandes</h3>
                    <button 
                      onClick={() => {
                        setActiveTab('Commandes');
                        triggerToast("Chargement de l'onglet commandes...");
                      }} 
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                    >
                      Voir toutes
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-semibold text-slate-600">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-2">#</th>
                          <th className="py-3 px-2">Client</th>
                          <th className="py-3 px-2">Montant</th>
                          <th className="py-3 px-2">Statut</th>
                          <th className="py-3 px-2">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {orders.map((order) => (
                          <tr 
                            key={order.id} 
                            onClick={() => setSelectedOrder(order)}
                            className="hover:bg-slate-50/80 cursor-pointer transition group"
                          >
                            <td className="py-3.5 px-2 text-slate-400 group-hover:text-indigo-600 font-bold transition-colors">{order.id}</td>
                            <td className="py-3.5 px-2 text-slate-800 font-bold">{order.client}</td>
                            <td className="py-3.5 px-2 text-slate-700 font-bold">{order.amount}</td>
                            <td className="py-3.5 px-2">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold block w-fit ${
                                order.status === 'Livrée' ? 'bg-emerald-50 text-emerald-600' :
                                order.status === 'En préparation' ? 'bg-indigo-50/70' :
                                order.status === 'En attente' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-2 text-slate-400 text-[11px] font-medium">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>

            {/* Overlay de la fenêtre modale de détails de commande */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 transform transition-all animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">Commande {selectedOrder.id}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedOrder.date}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-400">Client</span>
                      <span className="text-slate-800 font-bold">{selectedOrder.client}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-400">Montant total</span>
                      <span className="text-slate-800 font-extrabold text-base">{selectedOrder.amount}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-400">Statut de la commande</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedOrder.status === 'Livrée' ? 'bg-emerald-50 text-emerald-600' :
                        selectedOrder.status === 'En préparation' ? 'bg-indigo-50/70 text-indigo-600' :
                        selectedOrder.status === 'En attente' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Modifier le statut</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['En préparation', 'Livrée', 'En attente', 'Annulée'].map(status => (
                          <button
                            key={status}
                            onClick={() => {
                              setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o));
                              setSelectedOrder({ ...selectedOrder, status });
                              triggerToast(`Commande ${selectedOrder.id} modifiée en "${status}"`);
                            }}
                            className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
                              selectedOrder.status === status
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        ) : (
          <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="max-w-md space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-2xl">
                ⏳
              </div>
              <h2 className="text-xl font-bold text-slate-800">Section {activeTab} en cours d'intégration</h2>
              <p className="text-slate-500 text-sm">
                Vous avez reproduit fidèlement la maquette du Dashboard. Cette section ({activeTab}) sera bientôt connectée au backend.
              </p>
              <button 
                onClick={() => setActiveTab('Dashboard')}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg transition duration-200"
              >
                Retourner au Dashboard
              </button>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}

export default Admin;
