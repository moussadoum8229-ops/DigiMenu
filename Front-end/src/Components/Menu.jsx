import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';

// Sous-composant premium pour gérer la quantité et les boutons d'ajout/retrait
function CardActions({ price, itemId, name, image, description }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart({ itemId, name, image, description, price: parseFloat(price) }, qty);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromCart(itemId, qty);
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-3">
      {/* Sélecteur de quantité premium */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl p-2 w-full shadow-xs">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-2">Qté:</span>
        <div className="flex items-center space-x-1">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQty(prev => Math.max(1, prev - 1));
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors shadow-xs"
          >
            -
          </button>
          <input 
            type="number" 
            min="1" 
            value={qty} 
            onChange={(e) => {
              const val = Math.max(1, parseInt(e.target.value) || 1);
              setQty(val);
            }} 
            onClick={(e) => e.stopPropagation()}
            className="w-12 text-center bg-transparent border-none outline-hidden font-bold text-gray-800 text-sm focus:ring-0"
          />
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQty(prev => prev + 1);
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors shadow-xs"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex gap-2 justify-between w-full">
        <div className="badge badge-outline self-center shrink-0">{price} XOF</div>
        <div className="flex gap-1">
          <button 
            onClick={handleAdd} 
            className='btn btn-outline btn-success rounded-3xl text-xs py-1 px-3 h-10 min-h-10'
          >
            Ajouter
          </button>
          <button 
            onClick={handleRemove} 
            className='btn btn-error rounded-3xl text-white text-xs py-1 px-3 h-10 min-h-10'
          >
            Retirer
          </button>
        </div>
      </div>
    </div>
  );
}

// Liste initiale par défaut si localStorage est vide
const DEFAULT_ITEMS = [
  { id: "humberger", name: "Humberger", category: "hamburger", price: 3000, image: "./humberger.jpg", description: "Humberger à la viande hachée et au fromage, sauce spéciale." },
  { id: "cheeseburger", name: "Cheeseburger", category: "hamburger", price: 3000, image: "./Cheeseburger.jpg", description: "Cheeseburger à la viande hachée et au fromage, double sauce." },
  { id: "burger_poulet", name: "Burger Poulet", category: "hamburger", price: 3000, image: "./Burger-poulet.jpg", description: "Burger au poulet croustillant et sauce maison." },
  { id: "burger_poisson", name: "Burger Poisson", category: "hamburger", price: 3000, image: "./Berger-poisson.jpg", description: "Burger au poisson et sauce spéciale." },

  { id: "poulet_roti", name: "Poulet Rôti", category: "poulet", price: 4000, image: "./P-4.jpg", description: "Poulet rôti à la sauce spéciale et aux frites." },
  { id: "poulet_panne", name: "Poulet Pané", category: "poulet", price: 4000, image: "./P-1.jpg", description: "Poulet pané croustillant." },
  { id: "poulet_braise", name: "Poulet Braisé", category: "poulet", price: 4000, image: "./P-2.jpg", description: "Poulet braisé aux épices." },
  { id: "poulet_dg", name: "Poulet DG", category: "poulet", price: 4000, image: "./P-3.jpg", description: "Poulet DG à l'aloko." },

  { id: "tacos_boeuf", name: "Tacos Boeuf", category: "tacos", price: 5000, image: "./Tacos.jpg", description: "Tacos Boeuf sauce fromagère." },
  { id: "tacos_poulet", name: "Tacos Mexicain", category: "tacos", price: 5000, image: "./Tacos-poulet.jpg", description: "Tacos Mexicain au poulet." },
  { id: "tacos_poisson", name: "Tacos Poisson", category: "tacos", price: 5000, image: "./Tacos-poisson.jpg", description: "Tacos Poisson croustillant." },
  { id: "tacos_veg", name: "Tacos Végétarien", category: "tacos", price: 5000, image: "./Tacos-V.jpg", description: "Tacos végétarien complet." },

  { id: "steack_boeuf", name: "Steak de Boeuf", category: "viande", price: 6000, image: "./St-1.jpg", description: "Steak de boeuf grillé." },
  { id: "grillade_mouton", name: "Grillade de Mouton", category: "viande", price: 6000, image: "./St-2.jpg", description: "Grillade de mouton savoureuse." },
  { id: "cotelettes_agneau", name: "Côtelettes d'Agneau", category: "viande", price: 6000, image: "./St-3.jpg", description: "Côtelettes d'agneau fraîches." },
  { id: "boulettes_boeuf", name: "Boulettes de Boeuf", category: "viande", price: 6000, image: "./St-4.jpg", description: "Boulettes de boeuf en sauce." },

  { id: "poisson_braise", name: "Poisson Braisé", category: "poisson", price: 7000, image: "./Poisson-braisé.jpg", description: "Poisson braisé entier." },
  { id: "soupe_poisson", name: "Soupe de Poisson", category: "poisson", price: 7000, image: "./Soupe-de-poisson.jpg", description: "Soupe de poisson riche." },
  { id: "boulettes_poisson", name: "Boulettes de Poisson", category: "poisson", price: 7000, image: "./Boullete-de-poisson.jpg", description: "Boulettes de poisson maison." },
  { id: "saumon_grec", name: "Saumon Grec", category: "poisson", price: 7000, image: "./saumon-grec.jpg", description: "Saumon grillé aux herbes." },

  { id: "gateau_chocolat", name: "Gâteau Chocolat", category: "gateau", price: 2000, image: "./Gateau-chocolat.jpg", description: "Gâteau au chocolat intense." },
  { id: "gateau_framboise", name: "Gâteau Framboise", category: "gateau", price: 2000, image: "./gateau-framboise.jpg", description: "Gâteau aux framboises fraîches." },
  { id: "gateau_fraise", name: "Gâteau Fraise", category: "gateau", price: 2000, image: "./Gateau-fraise.jpg", description: "Gâteau fondant à la fraise." },
  { id: "gateau_banane", name: "Gâteau Banane", category: "gateau", price: 2000, image: "./Gateau-banane.jpg", description: "Gâteau moelleux à la banane." },

  { id: "crepe_chocolat", name: "Crêpe au Chocolat", category: "crepe", price: 1500, image: "./Crepe-chocolat.jpg", description: "Crêpe gourmande au chocolat." },
  { id: "crepe_banane", name: "Crêpe à la Banane", category: "crepe", price: 1500, image: "./Crepe-banane.jpg", description: "Crêpe sucrée à la banane." },
  { id: "crepe_fraise", name: "Crêpe Chocolat Fraise", category: "crepe", price: 1500, image: "./Crepe-chocolat fraise.jpg", description: "Crêpe nappée de chocolat et fraises." },

  { id: "glace_chocolat", name: "Glace Chocolat", category: "glaces", price: 1500, image: "./Glace-chocolat.jpg", description: "Glace onctueuse au chocolat." },
  { id: "glace_fraise", name: "Glace Fraise", category: "glaces", price: 1500, image: "./Glace fraise.jpg", description: "Glace rafraîchissante à la fraise." },
  { id: "glace_caramel", name: "Glace Caramel", category: "glaces", price: 1500, image: "./Glace-caramel.jpg", description: "Glace au caramel beurre salé." },
  { id: "glace_banane", name: "Glace Banane", category: "glaces", price: 1500, image: "./Glace-banane.jpg", description: "Glace artisanale à la banane." },

  { id: "coca_cola", name: "Coca Cola", category: "boissons", price: 500, image: "./Coca cola.jpg", description: "Canette fraîche de Coca Cola." },
  { id: "fanta", name: "Fanta", category: "boissons", price: 500, image: "./Fanta.jpg", description: "Canette fraîche de Fanta orange." },
  { id: "sprite", name: "Sprite", category: "boissons", price: 500, image: "./Sprite.jpg", description: "Canette fraîche de Sprite." },
  { id: "double7", name: "Double Seven", category: "boissons", price: 500, image: "./Double7.jpg", description: "Boisson énergisante Double Seven." }
];

export default function Menu() {
  const { getCartCount } = useCart();
  const [loading, setLoading] = useState(true);
  
  // États pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  // 1. Gestion du loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Charger les plats depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('digimenu_items');
    if (saved) {
      try {
        setMenuItems(JSON.parse(saved));
      } catch (e) {
        setMenuItems(DEFAULT_ITEMS);
      }
    } else {
      setMenuItems(DEFAULT_ITEMS);
      localStorage.setItem('digimenu_items', JSON.stringify(DEFAULT_ITEMS));
    }
  }, []);

  // Écran de chargement (après déclaration de TOUS les hooks)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loader">
          <img src="/Digiload.svg" alt="loader" width="200" />
        </div>
      </div>
    );
  }

  // ==========================================
  // CONFIGURATION DES CATÉGORIES DE BASE
  // ==========================================
  const CATEGORY_META = {
    hamburger: { title: 'Menu Burger', keywords: ["humberger", "cheeseburger", "burger"] },
    poulet: { title: 'Menu Poulet', keywords: ["poulet", "roti", "pané", "braisé", "dg", "aloko"] },
    tacos: { title: 'Menu Tacos', keywords: ["tacos", "boeuf", "mexicain", "poisson", "vegetarien"] },
    viande: { title: 'Menu Viande', keywords: ["viande", "steack", "steak", "boeuf", "grillade", "mouton", "cotelettes", "agneau", "boulette"] },
    poisson: { title: 'Menu Poisson', keywords: ["poisson", "braisé", "soupe", "boulette", "saumon", "grec"] },
    gateau: { title: 'Menu Gâteau', keywords: ["gateau", "chocolat", "framboise", "fraise", "banane"] },
    crepe: { title: 'Menu Crêpes', keywords: ["crepe", "crèpe", "chocolat", "banane", "fraise"] },
    glaces: { title: 'Menu Glaces', keywords: ["glace", "glaces", "chocolat", "fraise", "caramel", "banane"] },
    boissons: { title: 'Menu Boissons', keywords: ["boisson", "boissons", "coca", "fanta", "sprite", "double", "seven"] }
  };

  // Construction dynamique des catégories basées sur menuItems
  const categoryKeys = Object.keys(CATEGORY_META);
  const menuCategories = categoryKeys.map(catKey => {
    const meta = CATEGORY_META[catKey];
    const itemsInCat = menuItems.filter(item => item.category === catKey);
    
    return {
      id: catKey,
      title: meta.title,
      keywords: [...meta.keywords, ...itemsInCat.map(i => i.name.toLowerCase())],
      items: itemsInCat.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
        price: item.price,
        keywords: [item.name.toLowerCase(), ...(item.description ? item.description.toLowerCase().split(' ') : [])]
      }))
    };
  }).filter(cat => cat.items.length > 0); // On n'affiche que les catégories qui ont au moins 1 plat disponible
  // Mots-clés calculés dynamiquement sur la base des plats existants
  const allKeywords = menuItems.map(item => item.name.toLowerCase());
  const hasResults = !searchTerm || allKeywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase().trim()));

  return (
    <div className="min-h-screen bg-gray-50 font-[Open_Sans]">
      {/* En-tête Sticky avec effet Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {showSearch ? (
              // Barre de recherche interactive dans le header
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-lg mx-auto">
                <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un plat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-hidden text-sm text-gray-700 w-full pl-3 focus:ring-0"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchTerm('');
                  }}
                  className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              // Affichage normal
              <>
                {/* Bouton Retour à l'accueil */}
                <div className="flex items-center">
                  <Link to="/" className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 group">
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Link>
                </div>

                {/* Titre / Logo du Menu */}
                <div className="shrink-0 flex items-center">
                  <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400 tracking-wider">
                    Notre Menu
                  </h1>
                </div>

                {/* Icônes d'actions (Recherche / Panier) */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button 
                    onClick={() => setShowSearch(true)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 text-gray-700 hover:text-black"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <Link to="/commande">
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 text-gray-700 hover:text-black relative">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {/* Badge du panier */}
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md">
                        {getCartCount()}
                      </span>
                    </button>
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>
      </header>

      {/* Contenu principal de la page Menu */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {searchTerm ? (
          <div className="mb-6 flex items-center justify-between bg-orange-50 border border-orange-100 rounded-2xl px-6 py-4">
            <p className="text-orange-800 text-sm font-medium">
              Résultats de recherche pour : <span className="font-bold">"{searchTerm}"</span>
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-orange-500 hover:text-orange-800 text-xs font-bold underline"
            >
              Effacer
            </button>
          </div>
        ) : (
          <div className="text-center ">
            <p className="text-gray-500 text-lg">Les contenu du menu apparaîtront ici...</p>
          </div>
        )}
      </main>

      {!hasResults && (
        <div className="text-center py-20 max-w-7xl mx-auto px-4">
          <div className="text-gray-300 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-1">Aucun plat ne correspond à votre recherche</h3>
          <p className="text-gray-500 text-sm">Essayez avec d'autres mots-clés.</p>
        </div>
      )}

      {/* Rendu dynamique des sections du Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {hasResults && menuCategories.map((category) => {
          // Vérifie si la catégorie correspond au terme de recherche
          const showCategory = category.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchTerm.toLowerCase().trim())
          );

          if (!showCategory) return null;

          return (
            <section 
              key={category.id} 
              id={category.id} 
              className="scroll-mt-24 animate-fade-in"
            >
              {/* Titre de la catégorie avec indicateur stylisé */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                      {category.title}
                    </span>
                  </h2>
                  <div className="h-1.5 w-14 sm:w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
                </div>
              </div>
              
              {/* Grille responsive : 1 col sur mobile, 2 sur tablette, 3 sur écran moyen, 4 sur desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
                {category.items.map((item) => {
                  // Vérifie si l'item correspond au terme de recherche
                  const showItem = item.keywords.some(k => 
                    k.toLowerCase().includes(searchTerm.toLowerCase().trim())
                  );

                  if (!showItem) return null;

                  return (
                    <div key={item.id} className="flex justify-center">
                      <div className="card bg-base-100 w-full max-w-sm sm:max-w-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 rounded-3xl overflow-hidden border border-gray-100 flex flex-col justify-between">
                        {/* Image responsive */}
                        <figure className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80";
                            }}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </figure>
                        
                        {/* Contenu et actions */}
                        <div className="card-body p-4 sm:p-5 flex flex-col justify-between flex-1">
                          <div>
                            <h2 className="card-title text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
                              {item.name}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="mt-3 pt-2 border-t border-gray-50">
                            <CardActions 
                              price={item.price} 
                              itemId={item.id}
                              name={item.name}
                              image={item.image}
                              description={item.description}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      
    </div>
  );
}