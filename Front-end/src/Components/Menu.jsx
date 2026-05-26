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
          <img src="/Loader1.svg" alt="loader" width="200" />
        </div>
      </div>
    );
  }

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

      {/* Menu Hamburger */}
      {hasResults && ["humberger", "cheeseburger", "cheeseberger", "humberger au fromage", "humburger au poisson", "viande hachée", "fromage", "sauce especiale"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='hamburger' className="ml-15">
          <div className="mb-8 ml-3 ">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Burger
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Humberger */}
            {["humberger", "viande hachée et au fromage", "sauce especiale"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./humberger.jpg"
                      alt="humberger" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Humberger
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>humberger a la viande hachée et au fromage , une sauce especiale.</p>
                    <CardActions 
                      price={humberger} 
                      itemId="humberger"
                      name="Humberger"
                      image="./humberger.jpg"
                      description="humberger a la viande hachée et au fromage , une sauce especiale."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* cheeseburger */}
            {["cheeseburger", "cheeseberger", "viande hachée et au fromage", "sauce especiale"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Cheeseburger.jpg"
                      alt="cheeseburger" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      cheeseberger
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>cheeseburger a la viande hachée et au fromage , une sauce especiale.</p>
                    <CardActions 
                      price={humberger} 
                      itemId="cheeseberger"
                      name="cheeseberger"
                      image="./Cheeseburger.jpg"
                      description="cheeseburger a la viande hachée et au fromage , une sauce especiale."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* humberger au Fromage */}
            {["humberger au fromage", "fromage", "sauce especiale"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Burger-poulet.jpg"
                      alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      humberger au Fromage
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>humberger au fromage une sauce especiale.</p>
                    <CardActions 
                      price={humberger} 
                      itemId="humberger_au_fromage"
                      name="humberger au Fromage"
                      image="./Burger-poulet.jpg"
                      description="humberger au fromage une sauce especiale."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* humburger au poisson */}
            {["humburger au poisson", "poisson", "sauce especiale"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Berger-poisson.jpg"
                      alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      humburger au poisson
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>humberger au poisson une sauce especiale.</p>
                    <CardActions 
                      price={"3000"} 
                      itemId="humburger_au_poisson"
                      name="humburger au poisson"
                      image="./Berger-poisson.jpg"
                      description="humberger au poisson une sauce especiale."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Poulet */}
      {hasResults && ["poulet", "roti", "panné", "braiser", "dg", "aloko", "frites"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='poulet' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="ml-4 mb-8  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Poulet
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Poulet roti */}
            {["poulet roti", "sauce especiale", "frites"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./P-4.jpg"
                      alt="Poulet roti" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Poulet roti
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Poulet roti a la sauce especiale et au frites.</p>
                    <CardActions 
                      price={poulet} 
                      itemId="poulet_roti"
                      name="Poulet roti"
                      image="./P-4.jpg"
                      description="Poulet roti a la sauce especiale et au frites."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Poulet panné */}
            {["poulet panné", "panné"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./P-1.jpg"
                      alt="Poulet panné" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Poulet panné
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Poulet panné .</p>
                    <CardActions 
                      price={poulet} 
                      itemId="poulet_panne"
                      name="Poulet panné"
                      image="./P-1.jpg"
                      description="Poulet panné ."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Poulet braiser */}
            {["poulet braiser", "braiser"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./P-2.jpg"
                      alt="Poulet braiser" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Poulet braiser
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Poulet braiser.</p>
                    <CardActions 
                      price={poulet} 
                      itemId="poulet_braiser"
                      name="Poulet braiser"
                      image="./P-2.jpg"
                      description="Poulet braiser."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Poulet DG */}
            {["poulet dg", "aloko"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./P-3.jpg"
                      alt="Poulet DG" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Poulet DG
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Poulet DG a l'aloko.</p>
                    <CardActions 
                      price={poulet} 
                      itemId="poulet_dg"
                      name="Poulet DG"
                      image="./P-3.jpg"
                      description="Poulet DG a l'aloko."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Tacos*/}
      {hasResults && ["tacos", "boeuf", "mexicain", "poisson", "vegetarien"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='tacos' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="ml-4 mb-8  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Tacos
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Tacos Boeuf */}
            {["tacos boeuf", "boeuf"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Tacos.jpg"
                      alt="Tacos Boeuf" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Tacos Boeuf
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Tacos Boeuf.</p>
                    <CardActions 
                      price={tacos} 
                      itemId="tacos_boeuf"
                      name="Tacos Boeuf"
                      image="./Tacos.jpg"
                      description="Tacos Boeuf."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Tacos Mexicain */}
            {["tacos mexicain", "mexicain"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Tacos-poulet.jpg"
                      alt="Tacos Poulet" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Tacos Mexicain
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Tacos Mexicain .</p>
                    <CardActions 
                      price={tacos} 
                      itemId="tacos_mexicain"
                      name="Tacos Mexicain"
                      image="./Tacos-poulet.jpg"
                      description="Tacos Mexicain ."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Tacos Poisson */}
            {["tacos poisson", "poisson"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Tacos-poisson.jpg"
                      alt="Tacos Poisson" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Tacos Poisson
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Tacos Poisson.</p>
                    <CardActions 
                      price={tacos} 
                      itemId="tacos_poisson"
                      name="Tacos Poisson"
                      image="./Tacos-poisson.jpg"
                      description="Tacos Poisson."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Tacos Vegetarien */}
            {["tacos vegetarien", "vegetarien"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Tacos-V.jpg"
                      alt="Tacos Vegetarien" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Tacos Vegetarien
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Tacos  vegetarien.</p>
                    <CardActions 
                      price={tacos} 
                      itemId="tacos_vegetarien"
                      name="Tacos Vegetarien"
                      image="./Tacos-V.jpg"
                      description="Tacos  vegetarien."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Viande */}
      {hasResults && ["viande", "steack", "boeuf", "grillade", "mouton", "côtelettes", "agneau", "boullete"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='viande' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="ml-4 mb-8  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Viande
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Steack de boeuf */}
            {["steack de boeuf", "steack"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./St-1.jpg"
                      alt="Steack" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Steack de boeuf
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Steack de boeuf.</p>
                    <CardActions 
                      price={viande} 
                      itemId="steack_de_boeuf"
                      name="Steack de boeuf"
                      image="./St-1.jpg"
                      description="Steack de boeuf."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Grillade de mouton */}
            {["grillade de mouton", "grillade"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./St-2.jpg"
                      alt="Grillade" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Grillade de mouton
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Grillade de mouton.</p>
                    <CardActions 
                      price={viande} 
                      itemId="grillade_de_mouton"
                      name="Grillade de mouton"
                      image="./St-2.jpg"
                      description="Grillade de mouton."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Côtelettes d'agneau */}
            {["côtelettes d'agneau", "côtelettes", "agneau"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./St-3.jpg"
                      alt="Côtelettes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Côtelettes d'agneau
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Côtelettes d'agneau.</p>
                    <CardActions 
                      price={viande} 
                      itemId="cotelettes_d_agneau"
                      name="Côtelettes d'agneau"
                      image="./St-3.jpg"
                      description="Côtelettes d'agneau."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Boullete de boeuf */}
            {["boullete de boeuf", "boullete", "boulette"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./St-4.jpg"
                      alt="Boullete de boeuf" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Boullete de boeuf
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Boullete de boeuf.</p>
                    <CardActions 
                      price={viande} 
                      itemId="boullete_de_boeuf"
                      name="Boullete de boeuf"
                      image="./St-4.jpg"
                      description="Boullete de boeuf."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Poisson*/}
      {hasResults && ["poisson", "braisé", "soupe", "boullete", "saumon", "grec"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='poisson' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="ml-4 mb-8  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Poisson
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Poisson braisé */}
            {["poisson braisé", "braisé"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Poisson-braisé.jpg"
                      alt="Poisson braisé" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Poisson braisé
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Poisson braisé.</p>
                    <CardActions 
                      price={poisson} 
                      itemId="poisson_braise"
                      name="Poisson braisé"
                      image="./Poisson-braisé.jpg"
                      description="Poisson braisé."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Soupe de poisson */}
            {["soupe de poisson", "soupe"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Soupe-de-poisson.jpg"
                      alt="Soupe de poisson" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Soupe de poisson
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Soupe de poisson.</p>
                    <CardActions 
                      price={poisson} 
                      itemId="soupe_de_poisson"
                      name="Soupe de poisson"
                      image="./Soupe-de-poisson.jpg"
                      description="Soupe de poisson."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Boullete de poisson */}
            {["boullete de poisson", "boullete", "boulette"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Boullete-de-poisson.jpg"
                      alt="Boullete de poisson" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Boullete de poisson
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Boullete de poisson.</p>
                    <CardActions 
                      price={poisson} 
                      itemId="boullete_de_poisson"
                      name="Boullete de poisson"
                      image="./Boullete-de-poisson.jpg"
                      description="Boullete de poisson."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Saumon grec */}
            {["saumon grec", "saumon"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./saumon-grec.jpg"
                      alt="saumon grec" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Saumon grec
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Saumon grec.</p>
                    <CardActions 
                      price={poisson} 
                      itemId="saumon_grec"
                      name="Saumon grec"
                      image="./saumon-grec.jpg"
                      description="Saumon grec."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Gateau*/}
      {hasResults && ["gateau", "chocolat", "framboise", "fraise", "banane"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='gateau' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="ml-4 mb-8  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Gateau
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Gateau chocolat */}
            {["gateau chocolat", "chocolat"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Gateau-chocolat.jpg"
                      alt="Poisson braisé" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Gateau chocolat
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Gateau chocolat.</p>
                    <CardActions 
                      price={gateau} 
                      itemId="gateau_chocolat"
                      name="Gateau chocolat"
                      image="./Gateau-chocolat.jpg"
                      description="Gateau chocolat."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Gateau Framboise */}
            {["gateau framboise", "framboise"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./gateau-framboise.jpg"
                      alt="Soupe de poisson" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Gateau Framboise
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Gateau Framboise.</p>
                    <CardActions 
                      price={gateau} 
                      itemId="gateau_framboise"
                      name="Gateau Framboise"
                      image="./gateau-framboise.jpg"
                      description="Gateau Framboise."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Gateau-fraise */}
            {["gateau-fraise", "fraise"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Gateau-fraise.jpg"
                      alt="Boullete de poisson" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Gateau-fraise
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Gateau-fraise.</p>
                    <CardActions 
                      price={gateau} 
                      itemId="gateau_fraise"
                      name="Gateau-fraise"
                      image="./Gateau-fraise.jpg"
                      description="Gateau-fraise."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Gateau a la banane */}
            {["gateau a la banane", "banane"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Gateau-banane.jpg"
                      alt="Gateau-banane" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Gateau a la banane
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Gateau a la banane.</p>
                    <CardActions 
                      price={gateau} 
                      itemId="gateau_a_la_banane"
                      name="Gateau a la banane"
                      image="./Gateau-banane.jpg"
                      description="Gateau a la banane."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Crepes*/}
      {hasResults && ["crepe", "crèpe", "chocolat", "banane", "fraise", "saumon", "grec"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='crepe' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className=" mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Crepes
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Crèpe au chocolat */}
            {["crèpe au chocolat", "crepe", "chocolat"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Crepe-chocolat.jpg"
                      alt="Crepe-chocolat" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Crèpe au chocolat
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Crèpe au chocolat.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="crepe_au_chocolat"
                      name="Crèpe au chocolat"
                      image="./Crepe-chocolat.jpg"
                      description="Crèpe au chocolat."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Crèpe à la banane */}
            {["crèpe à la banane", "banane"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Crepe-banane.jpg"
                      alt="Crepe-banane" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Crèpe à la banane
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Crèpe à la banane.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="crepe_a_la_banane"
                      name="Crèpe à la banane"
                      image="./Crepe-banane.jpg"
                      description="Crèpe à la banane."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Crèpe au chocolat fraise */}
            {["crèpe au chocolat fraise", "chocolat", "fraise"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Crepe-chocolat fraise.jpg"
                      alt="Crepe-chocolat fraise" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Crèpe au chocolat fraise
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Crèpe au chocolat fraise.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="crepe_au_chocolat_fraise"
                      name="Crèpe au chocolat fraise"
                      image="./Crepe-chocolat fraise.jpg"
                      description="Crèpe au chocolat fraise."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Saumon grec (crèpes) */}
            {["saumon grec", "saumon"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./saumon-grec.jpg"
                      alt="saumon grec" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Saumon grec
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Saumon grec.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="saumon_grec_crepe"
                      name="Saumon grec"
                      image="./saumon-grec.jpg"
                      description="Saumon grec."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Glace*/}
      {hasResults && ["glace", "glaces", "chocolat", "fraise", "caramel", "banane"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='glaces' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Glaces
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Glace chocolat */}
            {["glace chocolat", "chocolat"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Glace-chocolat.jpg"
                      alt="Glace chocolat" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Glace chocolat
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Glace chocolat.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="glace_chocolat"
                      name="Glace chocolat"
                      image="./Glace-chocolat.jpg"
                      description="Glace chocolat."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Glace fraise */}
            {["glace fraise", "fraise"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Glace fraise.jpg"
                      alt="Glace fraise" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Glace fraise
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Glace fraise.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="glace_fraise"
                      name="Glace fraise"
                      image="./Glace fraise.jpg"
                      description="Glace fraise."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Glace caramel */}
            {["glace caramel", "caramel"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Glace-caramel.jpg"
                      alt="Glace caramel" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Glace caramel
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Glace caramel.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="glace_caramel"
                      name="Glace caramel"
                      image="./Glace-caramel.jpg"
                      description="Glace caramel."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Glace a la banane */}
            {["glace a la banane", "banane"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Glace-banane.jpg"
                      alt="Glace a la banane" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Glace a la banane
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Glace a la banane.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="glace_a_la_banane"
                      name="Glace a la banane"
                      image="./Glace-banane.jpg"
                      description="Glace a la banane."
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Boisson*/}
      {hasResults && ["boisson", "boissons", "coca", "cola", "fanta", "sprite", "double", "seven"].some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <div id='Boissons' className='timeline-view ml-15 animate-blurred-fade-in animate-range-[entry_10%_contain_30%]'>
          <div className="  mt-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-baseline gap-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Menu Boissons
                </span>
              </h2>
              <div className="h-1.5 w-16 bg-orange-500 rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <div className=' grid grid-cols-4 gap-4'>
            {/* Coca cola */}
            {["coca cola", "coca", "cola"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Coca cola.jpg"
                      alt="Coca cola" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Coca cola
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Coca cola.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="coca_cola"
                      name="Coca cola"
                      image="./Coca cola.jpg"
                      description="Coca cola."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Fanta */}
            {["fanta"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Fanta.jpg"
                      alt="Fanta" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Fanta
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Fanta.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="fanta"
                      name="Fanta"
                      image="./Fanta.jpg"
                      description="Fanta."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Sprite */}
            {["sprite"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Sprite.jpg"
                      alt="Sprite" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Sprite
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Sprite.</p>
                    <CardActions 
                      price={crepe} 
                      itemId="sprite"
                      name="Sprite"
                      image="./Sprite.jpg"
                      description="Sprite."
                    />
                    </div>
                </div>
              </div>
            )}

            {/* Double Seven */}
            {["double seven", "double7"].some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <div>
                <div className="card bg-base-100 w-80 h-110 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                  <figure>
                    <img
                      src="./Double7.jpg"
                      alt="Double Seven" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Double Seven
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Double Seven Petit - Moyen - Grand</p>
                    <CardActions 
                      price={crepe} 
                      itemId="double_seven"
                      name="Double Seven"
                      image="./Double7.jpg"
                      description="Double Seven Petit - Moyen - Grand"
                    />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}