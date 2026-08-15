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

export default function Menu() {
  const { getCartCount } = useCart();
  const [loading, setLoading] = useState(true);
  
  // États pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Prix d'origine
  const [humberger, setHumberger] = useState(3000);
  const [poulet, setPoulet] = useState(4000);
  const [tacos, setTacos] = useState(5000);
  const [viande, setViande] = useState(6000);
  const [poisson, setPoisson] = useState(7000);
  const [crepe, setCrepe] = useState(1500);
  const [gateau, setGateau] = useState(2000);
  const [boisson, setBoisson] = useState(500);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loader">
          <img src="/Digiload.svg" alt="loader" width="200" />
        </div>
      </div>
    );
  }

  // Définition dynamique des catégories du menu
  const menuCategories = [
    {
      id: 'hamburger',
      title: 'Menu Burger',
      keywords: ["humberger", "cheeseburger", "cheeseberger", "humberger au fromage", "humburger au poisson", "viande hachée", "fromage", "sauce especiale"],
      items: [
        {
          id: "humberger",
          name: "Humberger",
          image: "./humberger.jpg",
          description: "humberger a la viande hachée et au fromage , une sauce especiale.",
          price: humberger,
          keywords: ["humberger", "viande hachée et au fromage", "sauce especiale"]
        },
        {
          id: "cheeseberger",
          name: "cheeseberger",
          image: "./Cheeseburger.jpg",
          description: "cheeseburger a la viande hachée et au fromage , une sauce especiale.",
          price: humberger,
          keywords: ["cheeseburger", "cheeseberger", "viande hachée et au fromage", "sauce especiale"]
        },
        {
          id: "humberger_au_fromage",
          name: "humberger au Fromage",
          image: "./Burger-poulet.jpg",
          description: "humberger au fromage une sauce especiale.",
          price: humberger,
          keywords: ["humberger au fromage", "fromage", "sauce especiale"]
        },
        {
          id: "humburger_au_poisson",
          name: "humburger au poisson",
          image: "./Berger-poisson.jpg",
          description: "humberger au poisson une sauce especiale.",
          price: "3000",
          keywords: ["humburger au poisson", "poisson", "sauce especiale"]
        }
      ]
    },
    {
      id: 'poulet',
      title: 'Menu Poulet',
      keywords: ["poulet", "roti", "panné", "braiser", "dg", "aloko", "frites"],
      items: [
        {
          id: "poulet_roti",
          name: "Poulet roti",
          image: "./P-4.jpg",
          description: "Poulet roti a la sauce especiale et au frites.",
          price: poulet,
          keywords: ["poulet roti", "sauce especiale", "frites"]
        },
        {
          id: "poulet_panne",
          name: "Poulet panné",
          image: "./P-1.jpg",
          description: "Poulet panné .",
          price: poulet,
          keywords: ["poulet panné", "panné"]
        },
        {
          id: "poulet_braiser",
          name: "Poulet braiser",
          image: "./P-2.jpg",
          description: "Poulet braiser.",
          price: poulet,
          keywords: ["poulet braiser", "braiser"]
        },
        {
          id: "poulet_dg",
          name: "Poulet DG",
          image: "./P-3.jpg",
          description: "Poulet DG a l'aloko.",
          price: poulet,
          keywords: ["poulet dg", "aloko"]
        }
      ]
    },
    {
      id: 'tacos',
      title: 'Menu Tacos',
      keywords: ["tacos", "boeuf", "mexicain", "poisson", "vegetarien"],
      items: [
        {
          id: "tacos_boeuf",
          name: "Tacos Boeuf",
          image: "./Tacos.jpg",
          description: "Tacos Boeuf.",
          price: tacos,
          keywords: ["tacos boeuf", "boeuf"]
        },
        {
          id: "tacos_mexicain",
          name: "Tacos Mexicain",
          image: "./Tacos-poulet.jpg",
          description: "Tacos Mexicain .",
          price: tacos,
          keywords: ["tacos mexicain", "mexicain"]
        },
        {
          id: "tacos_poisson",
          name: "Tacos Poisson",
          image: "./Tacos-poisson.jpg",
          description: "Tacos Poisson.",
          price: tacos,
          keywords: ["tacos poisson", "poisson"]
        },
        {
          id: "tacos_vegetarien",
          name: "Tacos Vegetarien",
          image: "./Tacos-V.jpg",
          description: "Tacos  vegetarien.",
          price: tacos,
          keywords: ["tacos vegetarien", "vegetarien"]
        }
      ]
    },
    {
      id: 'viande',
      title: 'Menu Viande',
      keywords: ["viande", "steack", "boeuf", "grillade", "mouton", "côtelettes", "agneau", "boullete"],
      items: [
        {
          id: "steack_de_boeuf",
          name: "Steack de boeuf",
          image: "./St-1.jpg",
          description: "Steack de boeuf.",
          price: viande,
          keywords: ["steack de boeuf", "steack"]
        },
        {
          id: "grillade_de_mouton",
          name: "Grillade de mouton",
          image: "./St-2.jpg",
          description: "Grillade de mouton.",
          price: viande,
          keywords: ["grillade de mouton", "grillade"]
        },
        {
          id: "cotelettes_d_agneau",
          name: "Côtelettes d'agneau",
          image: "./St-3.jpg",
          description: "Côtelettes d'agneau.",
          price: viande,
          keywords: ["côtelettes d'agneau", "côtelettes", "agneau"]
        },
        {
          id: "boullete_de_boeuf",
          name: "Boullete de boeuf",
          image: "./St-4.jpg",
          description: "Boullete de boeuf.",
          price: viande,
          keywords: ["boullete de boeuf", "boullete", "boulette"]
        }
      ]
    },
    {
      id: 'poisson',
      title: 'Menu Poisson',
      keywords: ["poisson", "braisé", "soupe", "boullete", "saumon", "grec"],
      items: [
        {
          id: "poisson_braise",
          name: "Poisson braisé",
          image: "./Poisson-braisé.jpg",
          description: "Poisson braisé.",
          price: poisson,
          keywords: ["poisson braisé", "braisé"]
        },
        {
          id: "soupe_de_poisson",
          name: "Soupe de poisson",
          image: "./Soupe-de-poisson.jpg",
          description: "Soupe de poisson.",
          price: poisson,
          keywords: ["soupe de poisson", "soupe"]
        },
        {
          id: "boullete_de_poisson",
          name: "Boullete de poisson",
          image: "./Boullete-de-poisson.jpg",
          description: "Boullete de poisson.",
          price: poisson,
          keywords: ["boullete de poisson", "boullete", "boulette"]
        },
        {
          id: "saumon_grec",
          name: "Saumon grec",
          image: "./saumon-grec.jpg",
          description: "Saumon grec.",
          price: poisson,
          keywords: ["saumon grec", "saumon"]
        }
      ]
    },
    {
      id: 'gateau',
      title: 'Menu Gateau',
      keywords: ["gateau", "chocolat", "framboise", "fraise", "banane"],
      items: [
        {
          id: "gateau_chocolat",
          name: "Gateau chocolat",
          image: "./Gateau-chocolat.jpg",
          description: "Gateau chocolat.",
          price: gateau,
          keywords: ["gateau chocolat", "chocolat"]
        },
        {
          id: "gateau_framboise",
          name: "Gateau Framboise",
          image: "./gateau-framboise.jpg",
          description: "Gateau Framboise.",
          price: gateau,
          keywords: ["gateau framboise", "framboise"]
        },
        {
          id: "gateau_fraise",
          name: "Gateau-fraise",
          image: "./Gateau-fraise.jpg",
          description: "Gateau-fraise.",
          price: gateau,
          keywords: ["gateau-fraise", "fraise"]
        },
        {
          id: "gateau_a_la_banane",
          name: "Gateau a la banane",
          image: "./Gateau-banane.jpg",
          description: "Gateau a la banane.",
          price: gateau,
          keywords: ["gateau a la banane", "banane"]
        }
      ]
    },
    {
      id: 'crepe',
      title: 'Menu Crepes',
      keywords: ["crepe", "crèpe", "chocolat", "banane", "fraise", "saumon", "grec"],
      items: [
        {
          id: "crepe_au_chocolat",
          name: "Crèpe au chocolat",
          image: "./Crepe-chocolat.jpg",
          description: "Crèpe au chocolat.",
          price: crepe,
          keywords: ["crèpe au chocolat", "crepe", "chocolat"]
        },
        {
          id: "crepe_a_la_banane",
          name: "Crèpe à la banane",
          image: "./Crepe-banane.jpg",
          description: "Crèpe à la banane.",
          price: crepe,
          keywords: ["crèpe à la banane", "banane"]
        },
        {
          id: "crepe_au_chocolat_fraise",
          name: "Crèpe au chocolat fraise",
          image: "./Crepe-chocolat fraise.jpg",
          description: "Crèpe au chocolat fraise.",
          price: crepe,
          keywords: ["crèpe au chocolat fraise", "chocolat", "fraise"]
        },
        {
          id: "saumon_grec_crepe",
          name: "Saumon grec",
          image: "./saumon-grec.jpg",
          description: "Saumon grec.",
          price: crepe,
          keywords: ["saumon grec", "saumon"]
        }
      ]
    },
    {
      id: 'glaces',
      title: 'Menu Glaces',
      keywords: ["glace", "glaces", "chocolat", "fraise", "caramel", "banane"],
      items: [
        {
          id: "glace_chocolat",
          name: "Glace chocolat",
          image: "./Glace-chocolat.jpg",
          description: "Glace chocolat.",
          price: crepe,
          keywords: ["glace chocolat", "chocolat"]
        },
        {
          id: "glace_fraise",
          name: "Glace fraise",
          image: "./Glace fraise.jpg",
          description: "Glace fraise.",
          price: crepe,
          keywords: ["glace fraise", "fraise"]
        },
        {
          id: "glace_caramel",
          name: "Glace caramel",
          image: "./Glace-caramel.jpg",
          description: "Glace caramel.",
          price: crepe,
          keywords: ["glace caramel", "caramel"]
        },
        {
          id: "glace_a_la_banane",
          name: "Glace a la banane",
          image: "./Glace-banane.jpg",
          description: "Glace a la banane.",
          price: crepe,
          keywords: ["glace a la banane", "banane"]
        }
      ]
    },
    {
      id: 'Boissons',
      title: 'Menu Boissons',
      keywords: ["boisson", "boissons", "coca", "cola", "fanta", "sprite", "double", "seven"],
      items: [
        {
          id: "coca_cola",
          name: "Coca cola",
          image: "./Coca cola.jpg",
          description: "Coca cola.",
          price: crepe,
          keywords: ["coca cola", "coca", "cola"]
        },
        {
          id: "fanta",
          name: "Fanta",
          image: "./Fanta.jpg",
          description: "Fanta.",
          price: crepe,
          keywords: ["fanta"]
        },
        {
          id: "sprite",
          name: "Sprite",
          image: "./Sprite.jpg",
          description: "Sprite.",
          price: crepe,
          keywords: ["sprite"]
        },
        {
          id: "double_seven",
          name: "Double Seven",
          image: "./Double7.jpg",
          description: "Double Seven Petit - Moyen - Grand",
          price: crepe,
          keywords: ["double seven", "double7"]
        }
      ]
    }
  ];


  // Liste de tous les mots clés pour vérifier globalement si aucun plat n'est trouvé
  const allKeywords = [
    // Burgers
    "humberger", "cheeseburger", "cheeseberger", "humberger au fromage", "humburger au poisson",
    // Poulet
    "poulet roti", "poulet panné", "poulet braiser", "poulet dg", "aloko", "roti", "braisé",
    // Tacos
    "tacos boeuf", "tacos mexicain", "tacos poisson", "tacos vegetarien",
    // Viande
    "steack de boeuf", "grillade de mouton", "côtelettes d'agneau", "boullete de boeuf",
    // Poisson
    "poisson braisé", "soupe de poisson", "boullete de poisson", "saumon grec",
    // Gateau
    "gateau chocolat", "gateau framboise", "gateau-fraise", "gateau a la banane",
    // Crepes
    "crèpe au chocolat", "crèpe à la banane", "crèpe au chocolat fraise",
    // Glaces
    "glace chocolat", "glace fraise", "glace caramel", "glace a la banane",
    // Boissons
    "coca cola", "fanta", "sprite", "double seven"
  ];

  const hasResults = !searchTerm || allKeywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
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
      {hasResults && menuCategories.map((category) => {
        // Vérifie si la catégorie correspond au terme de recherche
        const showCategory = category.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (!showCategory) return null;

        return (
          <div 
            key={category.id} 
            id={category.id} 
            className={category.id === 'hamburger' ? 'ml-15' : 'timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'}
          >
            <div className="mb-8 ml-3 mt-6">
              <div className="flex flex-col">
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                    {category.title}
                  </span>
                </h2>
                <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {category.items.map((item) => {
                // Vérifie si l'item correspond au terme de recherche
                const showItem = item.keywords.some(k => 
                  k.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (!showItem) return null;

                return (
                  <div key={item.id}>
                    <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                      <figure>
                        <img src={item.image} alt={item.name} />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">
                          {item.name}
                          <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{item.description}</p>
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
                );
              })}
            </div>
          </div>
        );
      })}
      
    </div>
  );
}